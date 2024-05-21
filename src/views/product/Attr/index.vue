<template>
  <div>
    <el-card style="margin: 20px 0px; ">
      <categorySelect @getCategoryId="getCategoryId" :show="!isShowTabel"/>
    </el-card>
    <el-card>
      <div v-show="isShowTabel">
        <el-button type="primary" icon="el-icon-plus" @click="addAttr" :disabled="!category3Id">添加属性</el-button>
        <!-- 表格展示平台属性 -->
        <el-table :data="attrList" border style="width: 100%">
          <el-table-column align="center" type="index" label="序号" width="80px">
          </el-table-column>
          <el-table-column prop="attrName" label="属性名称" width="150px">
          </el-table-column>
          <el-table-column prop="prop" label="属性值列表" width="width">
            <template slot-scope="{row,$index}">
              <div>
                <el-tag type="success" v-for="(attrValue,index) in row.attrValueList" :key="attrValue.id"
                  style="margin: 0px 10px;">{{ attrValue.valueName }}</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="150px">
            <template slot-scope="{row,$index}">
              <div>
                <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateAttr(row)"></el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>

              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div v-show="!isShowTabel">
        <!-- 添加属性 或者修改属性的结构 -->
        <el-form :inline="true" ref="form" :model="attrInfo" label-width="80px">
          <el-form-item label="属性名">
            <el-input placeholder="请输入属性名" v-model="attrInfo.attrName"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-plus" @click="addAttrValue"
          :disabled="!attrInfo.attrName">添加属性值</el-button>
        <el-button @click="isShowTabel=true">取消</el-button>
        <el-table border :data="attrInfo.attrValueList" style="width: 100% ; margin: 20px 0px">
          <el-table-column align="center" type="index" label="序号" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="属性值名称" width="width">
            <template slot-scope="{row,$index}">
              <div>
                <!-- 这里的结构需要用到span与input的来回切换 -->
                <el-input v-model="row.valueName" v-if="row.flag" @blur="toLook(row)" :ref="$index"
                  @keyup.native.enter="toLook(row)" placeholder="请输入属性值名称" size="mini"></el-input>
                <span v-else @click="toEdit(row,$index)" style="display: block">{{ row.valueName }}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <div>
                <!-- 气泡确认框 -->
                <el-popconfirm :title="`确认删除${row.valueName}?`" @onConfirm="deleteAttrValue($index)">
                   <el-button type="danger" icon="el-icon-delete" size="mini"  slot="reference"></el-button>
                </el-popconfirm>
              </div>
            </template>
          </el-table-column>
        </el-table>
        <el-button type="primary" @click="addOrUpdateAttr" :disabled="attrInfo.attrValueList.length<1">保存</el-button>
        <el-button @click="isShowTabel = true">取消</el-button>


      </div>
    </el-card>

  </div>
</template>

<script>
// 按需引入lodash中的深拷贝
import { reqAddOrUpdateAttr } from '@/api/product/attr';
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'Attr',
  data() {
    return {
      category1Id:'',
      category2Id:'',
      category3Id:'',
      // 接收服务器属性 的字段
      attrList:[],
      // 这个属性控制着tabel表格的显示与隐藏
      isShowTabel:true,
      // 收集新增属性 修改属性使用的
      attrInfo:{
        // 属性名
        attrName:'',
        // 属性值 因为属性值有多个 因此用数组
        // 每一个属性值都是一个对象 都需要attrId valueName
        attrValueList:[
          
        ],
        categoryId:0,
        categoryLevel:3
      },
     

    }
  },
  methods:{
    // 自定义事件 的回调
    getCategoryId({categoryId,level}){
     if(level==1){
        this.category1Id=categoryId
        this.category2Id=""
        this.category3Id=""
     }else if(level==2){
      this.category2Id=categoryId
      this.category3Id=""

     }else{
      this.category3Id=categoryId
      // 代表三级分类的id有了 发请求获取品牌的属性
     this. getAttrList()
     }
    },
    // 获取平台属性的数据
   async getAttrList(){
    // 解构数据
    const {category1Id,category2Id,category3Id}=this
   let res =await this.$API.attr.reqAttrList(category1Id,category2Id,category3Id)
  //  console.log(res);
  if(res.code==200){
    this.attrList= res.data
  }
    },
    // 添加属性值的回调
    addAttrValue(){
    //  向属性值 的数组里面添加元素
    this.attrInfo.attrValueList.push({
      // attrid是你当前相应属性的Id 目前而已还没有添加属性的操作 还没有相应的属性Id
      // 目前带去的是undefined
      // valuename是响应属性值的名称
      // 对于修改某一个属性的时候 可以在已有属性的基础上新增新的属性值
      attrId:this.attrInfo.id,
      valueName:'',
      // 控制span与input的来回切换与隐藏
      // 给每一个数据添加flag 可以控制每个属性的显示与隐藏
      flag:true
    })
    this.$nextTick(()=>{
      this.$refs[this.attrInfo.attrValueList.length-1].focus()
    })
    },
    // 添加属性按钮的回调
    addAttr(){
     this.isShowTabel=false
    //  清除数据
    this.attrInfo={
        // 属性名
        attrName:'',
        // 属性值 因为属性值有多个 因此用数组
        // 每一个属性值都是一个对象 都需要attrId valueName
        attrValueList:[
          
        ],
        // 收集三级分类的id
        categoryId:this.category3Id,
        categoryLevel:3
      }
    },
    // 修改某一个属性
    updateAttr(row){
     this.isShowTabel=false
    //  将选中的属性赋值给attrinfo
    this.attrInfo=cloneDeep(row)
    this.attrInfo.attrValueList.forEach(item=>{
      // 第一个参数是对象 第二个参数是添加属性的属性名 第三个参数是新的属性值
      this.$set(item,"flag",false)
      
    })
    },
    // 失去焦点事件 切换为查看模式 展示span
    toLook(row){
      if(row.valueName.trim()==''){
        this.$message('请你输入一个非空属性值')
        return
      }
     let isRepate= this.attrInfo.attrValueList.some(item=>{
        // 需要将row在数组里面进行判断时去除
        // row属性最新增加的属性值  是数组的最后一项元素
        // 
        if(row!==item){
          return row.valueName==item.valueName
        }
      })
      if(isRepate){
        return
      }
      
      row.flag=false
    },
    // 点击span的回调 变为编辑模式
    toEdit(row,index){
      row.flag=true
      // 获取input节点
    //  点击span的时候切换编辑模式 对于浏览器而言 页面的重绘和重排是需要时间的
    // 因此不可能一点击就立马获得span $nextTick
    this.$nextTick(()=>{
      // 获取相应的表单元素进行聚焦
      this.$refs[index].focus()
    })
    },
    // 气泡确认框确定按钮的回调
    deleteAttrValue(index){
      // 当前操作不需要发请求
      this.attrInfo.attrValueList.splice(index,1)
    },
    // 保存按钮 或者修改属性
   async addOrUpdateAttr(){
    // 整理参数 如果用户添加了很多属性值 且属性值为空的 不应该提交给服务器
    this.attrInfo.attrValueList=this.attrInfo.attrValueList.filter(item=>{
      if(item.valueName!==''){
          // 删除掉flag属性
          delete item.flag
          return true
      }
    })
      try {
        await this.$API.attr.reqAddOrUpdateAttr(this.attrInfo)
        this.$message({type:'success',message:'保存成功'})
        // 保存成功以后需要再次获取
        this.getAttrList()
        this.isShowTabel=true
      } catch (error) {
        this.$message({message:'保存失败了'})
      }
    }
  }
}
</script>

<style>

</style>