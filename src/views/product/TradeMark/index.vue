<template>
  <div>
    <!-- 按钮 -->
    <el-button type="primary" icon="el-icon-plus" style="margin: 10px;" @click="showDialoge">添加</el-button>
    <!-- 表格组件 -->
    <!-- width 对于列的宽度 -->
    <!-- alien 标题的对其方式 -->
    <el-table style="width: 100%" border :data="list">
      <el-table-column prop="prop" label="序号" width="80px" align="center" type="index">
      </el-table-column>
      <el-table-column prop="tmName" label="品牌名称" width="width">
      </el-table-column>
      <el-table-column prop="logoUrl" label="品牌LOGO" width="width">
        <template slot-scope="{row,$index}">
          <img :src="row.logoUrl" alt="" width="120px" height="90px">
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作" width="width">
        <template slot-scope="{row,$index}">
          <el-button type="warning" icon="el-icon-edit" size="mini" @click="updateTradeMark(row)">修改</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteTradeMark(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分液器 -->
    <!-- 当前第几页 数据总体奥数 每一页的展示数量 连续页码数 -->
    <el-pagination style="margin-top: 20px; text-align: center;" :current-page="page" :page-sizes="[3, 5, 10]"
      :page-size="limit" layout=" prev, pager, next, jumper,->,total, sizes" @current-change="getPageList"
      @size-change="handlerSizeChange" :total="total">
    </el-pagination>
    <!-- 对话框 -->
    <!-- visible.sync 控制对话框显示与隐藏 -->
    <el-dialog :title="tmForm.id?'修改品牌':'添加品牌'" :visible.sync="dialogFormVisible">
      <!-- form表单 ：model属性 把表单的数据收集到了哪个对象身上 将来表单验证 也需要这个属性 -->
      <el-form style='width: 80%;' :model="tmForm" :rules="rules" ref="ruleForm">
        <el-form-item label="品牌名称" label-width="100px" prop="tmName">
          <el-input autocomplete="off" v-model="tmForm.tmName"></el-input>
        </el-form-item>
        <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
           <!-- 这里收集信息不可以用v-model 因为不是表单元素 -->
          <el-upload class="avatar-uploader" 
          action="/dev-api/admin/product/fileUpload"
            :show-file-list="false" 
            :on-success="handleAvatarSuccess" 
            :before-upload="beforeAvatarUpload"
            >
            <img v-if="tmForm.logoUrl" :src="tmForm.logoUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addOrUpdatetradeMark">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { logout } from '@/api/user';

export default {
  name: 'tradeMark',
  data() {
    return {
      // 当前参数是第几页
      page: 1,
      // 当前页数展示页数的条数
      limit: 3,
      total: 0,
      list: [],
      dialogFormVisible:false,
      // 上传图片使用的属性
     
      // 收集品牌的信息 对象身上的属性不可以瞎写 
      tmForm:{
        tmName:'',
        logoUrl:''
      },
      // 表单验证的规则
      rules:{
        tmName: [
            { required: true, message: '请输入品牌名称', trigger: 'blur' },
            { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'change' }
          ],
           logoUrl: [
            { required: true, message: '请选择品牌的图片' }
          ],
      }

    }
  },
  mounted(){
    // 获取列表数据 的函数
    this.getPageList()
  },
  methods:{
    // 获取列表数据 的函数
   async getPageList(pager=1){
    this.page=pager
      const{page,limit}=this
   let res= await this.$API.trademark.reqTardeMark(page,limit)
  //  console.log(res);
   if(res.code==200){
    // console.log(res.data.total);
    this.total=res.data.total
    this.list=res.data.records
   }
    },
    handlerSizeChange(limit){
      this.limit=limit
      this.getPageList()
    },
    // 点击添加品牌的按钮
    showDialoge(){
     this.dialogFormVisible = true
    // 清理数据
    this.tmForm={
      tmName:'',
      logoUrl:''
    }
    },
   
    // 修改某一个品牌
    updateTradeMark(row){
     this.dialogFormVisible=true
    //  将已有的品牌信息 复制给tmForm
     this.tmForm={...row}
    },
    // 上传图片相关的回调
    // 图片上传成功的回调
    handleAvatarSuccess(res, file) {
        this.tmForm.logoUrl=res.data
        // res是上传成功后返回给前端的数据
        // file 是上传成功后服务器给前端返回的数据
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // 添加品牌或者修改品牌
       addOrUpdatetradeMark(){
       this.$refs.ruleForm.validate(async(success)=>{
        //  如果全部字段符合条件
        if(success){
          this.dialogFormVisible=false
        // 发请求 有可能是添加品牌 也可能是修改品牌
      let res=  await this.$API.trademark.reqAddOrUpdateTradeMark(this.tmForm)
       console.log(res);
      if(res.code==200){
        // 弹出信息
        // alert(1)
        this.$message({
          type: 'success',
          message: this.tmForm.id?'修改品牌成功':'添加品牌成功',
        })
        // 如果是添加品牌 停留在第一页 如果是修改品牌停留在当前页
        this.getPageList(this.tmForm.id?this.page:1)
      }
        }else{
          console.log('error submit!!');
            return false;
        }
       })
      },
      deleteTradeMark(row){
        this.$confirm(`你确定删除${row.tmName}?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          // 当用户点击确定按钮的时候会触发
          // console.log(1);
        let res= await this.$API.trademark.reqDeleteTradeMark(row.id)
       if(res.code==200){
        this.$message({
            type: 'success',
            message: '删除成功!'
          });
          // 再次获取品牌列表的数据
          this.getPageList(this.list.length>1?this.page:this.page-1)
       }
         
        }).catch(() => {
          // 当用户点击取消按钮的时候会出触发
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      }
    }
  }

</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>