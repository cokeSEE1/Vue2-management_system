<template>
    <div>
        <el-form ref="form" label-width="80px" :model="spu">
            <el-form-item label="SPU名称">
                <el-input placeholder="SPU名称" v-model="spu.spuName"></el-input>
            </el-form-item>
            <el-form-item label="品牌">
                <el-select placeholder="请选择品牌" v-model="spu.tmId">
                    <el-option :value="tm.id" :label="tm.tmName" v-for="(tm,index) in tradeMarkList" :key="tm.id">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="SPU描述">
                <el-input placeholder="SPU描述" type="textarea" rows="4" v-model="spu.description"></el-input>
            </el-form-item>
            <el-form-item label="SPU图片">
                <!-- action是图片上传的地址 list-type文件列表的类型  on-preview 文件阅览的时候会触发 
                on-remove 当文件删除的时候会触发  file-list-->
                <el-upload action="/dev-api/admin/product/fileUpload" list-type="picture-card"
                    :on-preview="handlePictureCardPreview" :on-success="handlerSuccess" :on-remove="handleRemove" :file-list="spuImageList">
                    <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item label="销售属性">
                <el-select :placeholder="`还有${unSelectAttr.length}未选择`" v-model="attrIdAndAttrName">
                    <el-option :value="`${unselect.id}:${unselect.name}`" :label="unselect.name" v-for="(unselect,index) in unSelectAttr" :key="unselect.id">
                    </el-option>
                </el-select>
                <el-button type="primary" icon="el-icon-plus" :disabled="!attrIdAndAttrName" @click="addSaleAttr">添加销售属性</el-button>
            </el-form-item>
            <!-- 展示的是SPU自己的销售属性 -->
            <el-table style="width: 100%" border :data="spu.spuSaleAttrList">
                <el-table-column type="index" label="序号" width="80" align="center">
                </el-table-column>
                <el-table-column prop="saleAttrName" label="属性名" width="width">
                </el-table-column>
                <el-table-column prop="prop" label="属性值名称列表" width="width">
                    <template slot-scope="{row,$index}">
                        <!-- 用于展示已有属性值的列表 -->
                        <el-tag :key="tag.id" v-for="(tag,index) in row.spuSaleAttrValueList" closable 
                        @close="row.spuSaleAttrValueList.splice(index,1)" :disable-transitions="false">
                            {{ tag.saleAttrValueName }}
                        </el-tag>
                        <!-- input与button相互切换 -->
                        <el-input class="input-new-tag" v-if="row.inputVisible" v-model="row.inputValue" ref="saveTagInput"
                            size="small" @blur="handlerInputConfirm(row)">
                        </el-input>
                        <el-button v-else class="button-new-tag" size="small" @click="addSaleAttrValue(row)">添加</el-button>

                    </template>
                </el-table-column>
                <el-table-column prop="prop" label="操作" width="width">
                    <template slot-scope="{row,$index}">
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="spu.spuSaleAttrList.splice($index,1)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-form-item label="">
                <el-button type="primary" @click="addOrUpdateSpu">保存</el-button>
                <el-button @click="cancle" >取消</el-button>

            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "SpuForm",
    data() {
        return {
            dialogImageUrl: '',
            dialogVisible: false,
            // 存储SPU信息属性 初始化的时候是个空对象
            spu: {
                // 三级列表的id
                category3Id: 0,
                // 描述
                description: "",
                id: 0, 
                // SPU的名称
                spuName: "",
                // 品牌id
                tmId: '',
                // 收集SPU图片的信息
                spuImageList: [
                    // {
                    //     id: 0,
                    //     imgName: "string",
                    //     imgUrl: "string",
                    //     spuId: 0
                    // }
                ],
                // 销售属性与属性值的收集
                spuSaleAttrList: [
                    // {
                    //     baseSaleAttrId: 0,
                    //     id: 0,
                    //     saleAttrName: "string",
                    //     spuId: 0,
                    //     spuSaleAttrValueList: [
                    //         {
                    //             baseSaleAttrId: 0,
                    //             id: 0,
                    //             isChecked: "string",
                    //             saleAttrName: "string",
                    //             saleAttrValueName: "string",
                    //             spuId: 0
                    //         }
                    //     ]
                    // }
                ],
            },
            // 存储品牌的信息
            tradeMarkList: [],
            // 存储图片的信息
            spuImageList: [],
            // 存储平台销售熟属性的信息
            saleAttrList: [],
            // 收集未选择的销售属性id
            attrIdAndAttrName:''
        }
    },
    methods: {
        // 照片墙删除某一个图片的时候会触发
        handleRemove(file, fileList) {
            // 收集照片墙图片数据
            this.spuImageList=fileList
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        //   初始化SPU数据
        async initSpuData(spu) {
            //    获取SPU信息的数据
            let res = await this.$API.spu.reqSpu(spu.id)
            if (res.code == 200) {
                this.spu = res.data
            }
            //  获取品牌信息
            let tradeMarkRes = await this.$API.spu.reqTradeMarkList()
            if (tradeMarkRes.code == 200) {
                this.tradeMarkList = tradeMarkRes.data
            }
            // 获取图片的数据
            let spuImageRes = await this.$API.spu.reqSpuImageList(spu.id)
            if (spuImageRes.code == 200) {
                // 由于照片墙显示的图片数据需要数组 数组里的元素需要name与url字段
                // 需要把服务器返回的数据进行修改
                let  listAttr = spuImageRes.data
                listAttr.forEach(item => {
                    item.name=item.imgName
                    item.url=item.imgUrl
                });
                // console.log(spuImageRes.data);
                this.spuImageList=listAttr
                // 获取平台全部的销售属性
                let saleRes = await this.$API.spu.reqBaseSaleAttrList()
                if (saleRes.code == 200) {
                    this.saleAttrList = saleRes.data
                }
            }
        },
        // 照片墙图片上传成功的回调
        handlerSuccess(response,file,fileList){
           this.spuImageList=fileList
        },
        // 添加新的销售属性
        addSaleAttr(){
            // 把收集到的销售属性进行分割
           const [baseSaleAttrId,saleAttrName] = this.attrIdAndAttrName.split(':')
        //    console.log(baseSaleAttrId,saleAttrName);
           let newSaleAttr ={baseSaleAttrId,saleAttrName,spuSaleAttrValueList:[]}
        //    添加新的销售属性
        this.spu.spuSaleAttrList.push(newSaleAttr)
        // 清空数组
        this.attrIdAndAttrName=''
        },
        // 添加按钮的回调
        addSaleAttrValue(row){
        //  点击后需要由button变为input 通过当前属性的
        this.$set(row,'inputVisible',true)
        // 通过响应式数据inputValue字段 收集新增的销售属性
        this.$set(row,'inputValue','')
        },
        // el-input失去焦点的事件
        handlerInputConfirm(row){
            // 修改数据 变为button
            row.inputVisible=false
            // 解构出销售属性需要的字段
            const {baseSaleAttrId,inputValue} =row
            // 新增的销售属性值不能为空
            if(inputValue.trim()==''){
                this.$message('属性值不能为空')
                return;
            }
            // 属性值不能重复
           let res= row.spuSaleAttrValueList.every(item=>
             item.saleAttrValueName!=inputValue
            )
           if(!res)return
            // console.log(res);
            let newSaleAttrValue={baseSaleAttrId, saleAttrValueName:inputValue}
            // 新增数组
            row.spuSaleAttrValueList.push(newSaleAttrValue)
            
        },
        // 保存按钮的回调
       async addOrUpdateSpu(){
            // 整理参数 照片墙的数据 携带的参数对于图片需要携带imageName 与imageUrl字段
          this.spu.spuImageList =  this.spuImageList.map(item=>{
                return{
                    imageName:item.name,
                    imageUrl:(item.response&&item.response.data)||item.url
                }
            })
           let res= await this.$API.spu.reqAddOrUpdateSpu(this.spu)
           if(res.code==200){
            this.$message({type:'success',message:'保存成功'})
            // /通知父组件回到场景0
            this.$emit('changeSence',{sence:0,flag:this.spu.id?'修改':'添加'})

           }
         // 清数据 ES6中新增的方法 可以合并对象
            // this._data可以操作data当重点的响应式数据
            // this.$options可以获取配置对象 配置对象的data函数 返回的是空的对象
            Object.assign(this._data,this.$options.data())
            
        },
        // 点击添加SPU按钮发请求的时候 发请求的函数
       async addSpuDate(category3Id){
        // 添加SPU的时候收集三级分类的id
             this.spu.category3Id=category3Id
             //  获取品牌信息
             let tradeMarkRes = await this.$API.spu.reqTradeMarkList()
            if (tradeMarkRes.code == 200) {
                this.tradeMarkList = tradeMarkRes.data
            }
                // 获取平台全部的销售属性
                let saleRes = await this.$API.spu.reqBaseSaleAttrList()
                if (saleRes.code == 200) {
                    this.saleAttrList = saleRes.data
                }
        },
        // 取消按钮
        cancle(){
            // 通知父亲切换场景
           this. $emit('changeSence', {sence:0})
            // 清数据 ES6中新增的方法 可以合并对象
            // this._data可以操作data当重点的响应式数据
            // this.$options可以获取配置对象 配置对象的data函数 返回的是空的对象
            Object.assign(this._data,this.$options.data())
        }
        
        

    },
    mounted() {

    },
    computed:{
        // 计算出还未选择的计算属性
        unSelectAttr(){
            // 整个平台的销售属性一共三个 颜色 尺寸 版本 saleAttrList
            // 当前SPU拥有的属于自己的SPU属性 spuSaleAttrList  颜色
          let res=  this.saleAttrList.filter(item=>{
                 return this.spu.spuSaleAttrList.every(item1=>{
                     return item.name!= item1.saleAttrName
                 })
            })
            return res
        }
    }

}
</script>

<style>
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
</style>