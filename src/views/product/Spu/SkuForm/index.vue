<template>
  <div>
    <el-form ref="form" label-width="80px">
      <el-form-item label="SPU名称">{{spu.spuName }}</el-form-item>
      <el-form-item label="SKU名称">
        <el-input placeholder="SKU名称" v-model="skuInfo.skuName"></el-input>
      </el-form-item>
      <el-form-item label="价格(元)">
        <el-input placeholder="价格(元)" type="number" v-model="skuInfo.price" ></el-input>
      </el-form-item>
      <el-form-item label="重量(千克)">
        <el-input placeholder="重量(千克)" v-model="skuInfo.weight"></el-input>
      </el-form-item>
      <el-form-item label="规格描述">
        <el-input type="textarea" placeholder="规格描述" rows=4 v-model="skuInfo.skuDesc"></el-input>
      </el-form-item>
      <el-form-item label="平台属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="attr.attrName" v-for="(attr,index) in attrInfoList" :key="attr.id">
            <el-select placeholder="请选择" v-model="attr.attrIdAndValue">
              <el-option :label="attrValue.valueName" :value="`${attr.id}:${attrValue.id}`" v-for="(attrValue,index) in attr.attrValueList" :key="attrValue.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性">
        <el-form :inline="true" ref="form" label-width="80px">
          <el-form-item :label="saleAttr.saleAttrName" v-for="(saleAttr,index) in spuSaleAttrList" :key="saleAttr.id">
            <el-select placeholder="请选择" v-model="saleAttr.attrIdAndValueId">
              <el-option :label="saleAttrValue.saleAttrValueName" 
              :value="`${saleAttrValue.id}:${saleAttr.id}`" 
              v-for="(saleAttrValue,index) in saleAttr.spuSaleAttrValueList"
               :key="saleAttrValue.id">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片列表">
        <el-table style="width: 100%" border :data="spuImageList" 
          @selection-change="handleSelectionChange">
          <el-table-column type="selection" prop="prop" label="label" width="80">
          </el-table-column>
          <el-table-column prop="prop" label="图片" width="width">
            <template slot-scope="{row,$index}">
              <img :src="row.imgUrl" alt="" style="width: 100px; height: 100px;">
            </template>
          </el-table-column>
          <el-table-column prop="imgName" label="名称" width="width">
          </el-table-column>
          <el-table-column prop="prop" label="操作" width="width">
            <template slot-scope="{row,$index}">
              <el-button type="primary" v-if="row.isDefault==0" @click="changeDefault(row)">设置默认</el-button>
              <el-button v-else>默认</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  name: "SkuForm",
  data() {
    return {
      // 存储图片的信息
      spuImageList:[],
      // 存储销售属性
      spuSaleAttrList:[],
      // 存储平台属性的数据
      attrInfoList:[],
      // 收集SKU数据的字段
      skuInfo:{
        // 第一类收集的数据是父组件给的
        category3Id: 0,
        spuId: 0,
        tmId: 0,
        // 第二类是通过数据双向绑定 v-model收集的
        skuName: "",
         price: 0,
         weight: "",
         skuDesc: "",

        //  第三类是需要自己书写代码自己收集
        // 设置默认图片
        skuDefaultImg: "",
        // 收集图片的字段
        skuImageList: [
          // {
          //   id: 0,
          //   imgName: "string",
          //   imgUrl: "string",
          //   isDefault: "string",
          //   skuId: 0,
          //   spuImgId: 0
          // }
        ],
        // 平台属性
        skuAttrValueList: [
          // {
          //   attrId: 0,
          //   valueId: 0,
          // }
        ],
        // 销售属性
        skuSaleAttrValueList: [
          // {
          //   id: 0,
          //   saleAttrId: 0,
          //   saleAttrName: "string",
          //   saleAttrValueId: 0,
          //   saleAttrValueName: "string",
          //   skuId: 0,
          //   spuId: 0
          // }
        ],
        },
        spu:{},
        // 收集图片的字段  但是需要注意 目前缺少isDefault 将来提交的时候需要整理参数
        imageList:[]       
    }
  },
  methods: {
    // 获取SKU的数据
    async getData(category1Id,category2Id,spu) {
      // 收集父组件给予的数据
      this.spu=spu
      this.skuInfo.category3Id=spu.category3Id
      this.skuInfo.spuId=spu.id
      this.skuInfo.tmId=spu.tmId
      // 获取图片的数据
     let res= await this.$API.sku.reqSpuImageList(spu.id)
    //  console.log(res);
    if(res.code==200){
     let list=res.data
     list.forEach(item=>{
      // 0代表设置默认 1 代表默认
      item.isDefault= 0
     })
     this.spuImageList=list
    }
    // 获取销售属性的数据
    let res1= await this.$API.sku.reqSpuSaleAttrList(spu.id)
    // console.log(res1);
    if(res1.code==200){
      this.spuSaleAttrList=res1.data
    }
    // 获取平台属性的数据
    let res2= await  this.$API.sku.reqAttrInfoList(category1Id,category2Id,spu.category3Id)
    // console.log(res2);
    if(res2.code==200){
    this.attrInfoList=res2.data
    }
  },
  // tabel表格复选框按钮的事件
  handleSelectionChange(params){
    // 获取到用户选中的信息数据 当前缺少isDefault字段
    this.imageList=params
  },
  // 排他的操作
  changeDefault(row){
    this.spuImageList.forEach(item=>{
      item.isDefault=0
    })
    row.isDefault=1
    // 收集一下默认图片的地址
    this.skuInfo.skuDefaultImg=row.imgUrl
  },
  // 取消按钮的回调
  cancel(){
    // 触发自定义事件 让父组件切换场景为0
    this.$emit('changeSence',0)
    // 清除数据
    Object.assign(this._data,this.$options.data())
  },
  // 保存按钮的回调
 async save(){
  //  整理参数 平台属性
  const {attrInfoList,skuInfo,spuSaleAttrList,imageList} =this
  // 把收集到的数据都整理一下
  // 新建一个数组
  let arr=[]
  attrInfoList.forEach(item=>{
    // console.log(item);
    // 如果有这个字段 那么就代表用户进行了选择
    if(item.attrIdAndValue){
      // console.log(1);
      const [attrId,valueId]= item.attrIdAndValue.split(':')
      // 携带给服务器的参数应该是个对象
      let obj={attrId,valueId}
      arr.push(obj)
      // console.log(arr);
    }
  }) 
  // 将整理好的参数赋值给skuinfo.skuAttrValueList
  skuInfo.skuAttrValueList=arr

  // 整理销售属性
 skuInfo.skuSaleAttrValueList= this.spuSaleAttrList.reduce((prev,item)=>{
    if(item.attrIdAndValueId){
      const [saleAttrId,saleAttrValueId] =item.attrIdAndValueId.split(':')
      prev.push({saleAttrId,saleAttrValueId})
    }
    return prev
  },[])
  // console.log(skuInfo.skuSaleAttrValueList);
  
  // 整理图片的数据
  skuInfo.skuImageList = imageList.map(item=>{
    return{
      imgName:item.imgName,
      imgUrl:item.imgUrl,
      isDefault:item.isDefault,
      spuImgId:item.id
    }
  })
  // console.log(skuInfo.skuImageList);
// console.log(skuInfo);
let res= await this.$API.sku.reqAttrSku(skuInfo)
console.log(res);
if(res.code==200){
  this.$message({type:'success',message:'添加SKU成功'})
  this.$emit('changeSence',0)

}
//  let res= await this.$API.sku.reqAttrSku(skuInfo)
//  console.log(res);
  }
  
  
}
}
</script>

<style></style>