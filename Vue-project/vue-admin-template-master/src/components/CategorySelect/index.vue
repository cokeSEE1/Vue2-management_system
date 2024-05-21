<template>
 <div>
     <el-form :inline="true"  class="demo-form-inline" :model="cForm">
 
  <el-form-item label="一级分类">
    <el-select :disabled="show" placeholder="请选择" value="" v-model="cForm.category1Id" @change="handler1">
      <el-option v-for="(c1,index) in list1" :key="c1.id" :label="c1.name" :value="c1.id"></el-option>
    </el-select>
  </el-form-item>
  <el-form-item label="二级分类">
    <el-select :disabled="show" placeholder="请选择" value="" v-model="cForm.category2Id" @change="handler2">
      <el-option v-for="(c2,index) in list2" :key="c2.id" :label="c2.name" :value="c2.id"></el-option>
    </el-select>
  </el-form-item>
   <el-form-item label="三级分类">
    <el-select :disabled="show" placeholder="请选择" value="" v-model="cForm.category3Id" @change="handler3">
      <el-option :label="c3.name" :value="c3.id" v-for="(c3,index) in list3" :key="c3.id"></el-option>
    </el-select>
  </el-form-item>
</el-form>
 </div>
</template>

<script>
export default {
     name:'categorySelect',
     props:['show'],
     data() {
      return {
        list1:[],
        list2:[],
        list3:[],
        // 收集相应的一级二级三级 did
        cForm:{
          category1Id:'',
          category2Id:'',
          category3Id:''
        }

     }
   },
   mounted(){
      this.getCategory1List()
     },
     methods:{
     async getCategory1List(){
      // console.log(this.$API);
      let res= await this.$API.attr.reqCategory1List()
      // console.log(res);
      if(res.code==200){
         this.list1=res.data
      }
      },
      // 一级分类select事件的回调 当一级分类的option发生变化的时候获取相应的内容
     async handler1(){
      this.list2=[]
      this.list3=[]
      this.cForm.category2Id=""
      this.cForm.category3Id=""
        // 解构出一级分类的id
        const {category1Id} =this.cForm
        // console.log(category1Id);
        this.$emit('getCategoryId',{categoryId:category1Id,level:1})
      let res=  await this.$API.attr.reqCategory2List(category1Id)
      // console.log(res);
      if(res.code==200){
        this.list2=res.data
      }
      },
     async handler2(){
      this.list3=[]
      this.cForm.category3Id=""
        // 解构数据
        const {category2Id} =this.cForm
        // console.log(category2Id);
        this.$emit('getCategoryId',{categoryId:category2Id,level:2})

       let res= await this.$API.attr.reqCategory3List(category2Id)
      //  console.log(res);
      if(res.code==200){
          this.list3= res.data
      }
      },
      handler3(){
        // 解构数据
        const {category3Id} =this.cForm
        this.$emit('getCategoryId',{categoryId:category3Id,level:3})
      }
     }
}
</script>

<style>

</style>