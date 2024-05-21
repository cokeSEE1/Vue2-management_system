<template>
  <div>
    <el-card style="margin: 20px 0px">
      <categorySelect @getCategoryId="getCategoryId" :show="sence!=0" />
    </el-card>
    <!-- 底部将来是有三部分进行切换 -->
    <el-card>
      <div v-show="sence==0">
        <!-- 展示Spu列表的结构 -->
        <el-button type="primary" icon="el-icon-plus" :disabled="!category3Id" @click="addSpu">添加SPU</el-button>
        <el-table style="width: 100%" border :data="records">
          <el-table-column type="index" label="序号" width="80" align="center">
          </el-table-column>
          <el-table-column prop="spuName" label="SPU名称" width="width">
          </el-table-column>
          <el-table-column prop="description" label="SPU描述" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <div>
                <!-- 这里的按钮将来用hintbutton替换 -->
                <hint-button type="success" icon="el-icon-plus" size="mini" title="添加sku"
                  @click="addSku(row)"></hint-button>
                <hint-button type="warning" icon="el-icon-edit" size="mini" title="修改spu"
                  @click="updateSpu(row)"></hint-button>
                <hint-button type="info" icon="el-icon-info" size="mini" title="查看当前spu的所有实例"
                 @click="handler(row)"></hint-button>
                <el-popconfirm title="这是一段内容确定删除吗？" @onConfirm="deleteSpu(row)">
                  <hint-button type="danger" icon="el-icon-delete" size="mini" title="删除spu"
                    slot="reference"></hint-button>
                </el-popconfirm>

              </div>
            </template>
          </el-table-column>
        </el-table>
        <!-- @size-change="handleSizeChange"
            @current-change="handleCurrentChange" -->
        <el-pagination style="text-align: center;" :current-page="page" :page-sizes="[3, 5, 10]" :page-size="limit"
          layout=" prev, pager, next, jumper,->,sizes,total" :total="total" @current-change="getSpuList"
          @size-change="handleSizeChange">
        </el-pagination>
      </div>
      <SpuForm v-show="sence==1" @changeSence="changeSence" ref="spu" />
      <SkuForm v-show="sence==2" @changeSence="changeSences" ref="sku" />
    </el-card>
    <el-dialog :title="`${spu.spuName}的SKU的列表`" 
    :before-close="close" :visible.sync="dialogTableVisible" >
      <!-- tabel展示SKU列表 -->
      <el-table :data="skuList" style="width: 100%" border v-loading="loading">
          <el-table-column prop="skuName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="price" label="价格" width="width">
          </el-table-column>
          <el-table-column prop="weight" label="重量" width="width">
          </el-table-column>
          <el-table-column  label="默认图片" width="width">
            <template slot-scope="{row,$index}">
              <img :src="row.skuDefaultImg" alt="" style="widows: 100px; height: 100px;">
            </template>
          </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import SkuForm from './SkuForm/index.vue'
import SpuForm from './SpuForm/index.vue'
export default {
  name: 'Spu',
  data() {
    return {
      category1Id: '',
      category2Id: '',
      category3Id: '',
      show: true,
      // 分页器当前第几页
      page: 1,
      // 分页器每一页展示的数据个数
      limit: 3,
      // SPU列表返回的数据
      records: [],
      // 分页器一共需要展示数据的条数
      total: 0,
      // 0标识展示SPU列表数据
      // 1标识 添加SPU修改SPU
      // 2 添加SKU
      sence:0,
      // 控制对话框的显示与隐藏
      dialogTableVisible:false,
      spu:{},
      // 存储的是SKU列表的数据
      skuList:[],
      loading:true
    }
  },
  methods: {
    // 三级联动的自定义事件 可以把子组件相应的id传给父组件
    getCategoryId({ categoryId, level }) {
      //  categoryId 可以获取一级二级三级的id level 区分是几级id
      if (level == 1) {
        this.category1Id = categoryId
        // 清除二级三级的id
        this.category2Id = ''
        this.category3Id = ''
      } else if (level == 2) {
        this.category2Id = categoryId
        this.category3Id = ''
      } else {
        this.category3Id = categoryId
        // 获取Spu列表数据的方法
        this.getSpuList()
      }
    },
    // 获取Spu列表数据的方法 limit page 三级分类id
    async getSpuList(pages=1) {
      this.page=pages
      const { page, limit, category3Id } = this
      let res = await this.$API.spu.reqSpuList(page, limit, category3Id)
      if (res.code == 200) {
        this.records = res.data.records
        this.total = res.data.total
      }
    },
    // 点击分页器的第几页 按你的回调
    // handleCurrentChange(page){
    //   this.page=page
    //   this.getSpuList()
    // }
    // 当分页器的某一页的数据条数发生变化的回调
    handleSizeChange(limit){
   this.limit=limit
   this.getSpuList()
   
    },
    // 添加SPU按钮的回调
    addSpu(){
      this.sence=1
      // 通知子组件SPU发请求 发两个品牌 SPU属性
      this.$refs.spu.addSpuDate(this.category3Id)
    },
    // 修改某一个Spu
    updateSpu(row){
      this.sence=1
      // 获取spuform子组件
      this.$refs.spu.initSpuData(row)
    },
    // 自定义事件的回调 SPUform的回调
    changeSence({sence,flag}){
      // 切换场景   flag这个是为了区分是修改还是添加
      this.sence=sence
      // 子组件同事父组件切换场景的时候 需要再次获取SPU的列表数据进行展示
      if(flag=='修改'){
        this.getSpuList(this.page)
      }else{
        this.getSpuList()
      }
      
    },
    // 删除SPU按钮的回调
    async deleteSpu(row){
    let res= await this.$API.spu.reqDeleteSpu(row.id)
    if(res.code==200){
      this.$message({type:'success',message:'删除成功'})
      // 当前页码的SPU大于0的时候 停留在当前页 如果SPU个数小于1 回到上一页
      this.getSpuList(this.records.length>1?this.page:(this.page-1))
    }
    },
    // 添加SKU按你的回调
    addSku(row){
      this.sence=2
      // 父组件调用子组件的方法 让子组件发请求  发三个请求
      this.$refs.sku.getData(this.category1Id,this.category2Id,row)

    },
    // skuform通知父组件修改场景
    changeSences(sence){
      this.sence=sence
      
    },
    // 查看SKU按钮的回调
   async handler(spu){
      // 当点击这个按钮的时候对话框可见
     this.dialogTableVisible=true
    //  保存SPU的信息
    this.spu=spu
    // 获取SKU列表是数据进行展示
   let res= await this.$API.sku.reqSkuList(spu.id)
  //  console.log(res);
  if(res.code==200){
    this.skuList=res.data
    // 让loading隐藏
    this.loading=false
  }
    },
    // 关闭对话框的回调
    close(done){
      this.loading=true
      // 清除sku列表的数据
      this.skuList=[]
      done()
    }
  },
  components:{
    SkuForm,
    SpuForm
  }

}
</script>

<style></style>