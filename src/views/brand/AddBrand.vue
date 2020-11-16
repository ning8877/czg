<template>
  <div class="addBrand">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        
      <el-form-item label="品牌名:" prop="brandName">
        <el-input size="small" v-model="ruleForm.brandName" placeholder="请输入品牌名称"></el-input>
      </el-form-item>

      <el-form-item label="所属业态:" prop="category">
        <el-select size="small" v-model="ruleForm.category" placeholder="请选择所属业态">
          <el-option v-for="item in options" :key="item" :label="item" :value="item">
          </el-option>
      </el-select>
      </el-form-item>

      <el-form-item label="联系人:" prop="contact">
        <el-input size="small" v-model="ruleForm.contact" placeholder="请输入联系人"></el-input>
      </el-form-item>

      <el-form-item label="联系电话:" prop="contactPhone">
        <el-input size="small" v-model="ruleForm.contactPhone" placeholder="请输入联系方式"></el-input>
      </el-form-item>

      <el-form-item label="品牌Logo:" prop="logo">
        <el-upload accept="image/*" ref="upload" :limit="1" :auto-upload=false action="#"
          list-type="picture-card" :on-preview="handlePictureCardPreview" :on-change="handleChange">
          <i class="el-icon-plus"></i>
        </el-upload>

        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>

    </el-form>

    <div class="btn">
        <el-button type="plain"  size="small" @click="cancel">取消</el-button>
        <el-button type="primary" size="small" @click="upload('ruleForm')">保存</el-button>
    </div>

  </div>
</template>

<script>
import {_fileUpload,_addBrand} from '@/api/brand'
export default {
  data() {
    return {
      file:null,
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      options:['甜点饮品','小吃快餐','中餐','粥/粉/面','火锅','西餐','烧烤','麻辣烫','生鲜蔬菜'],
      ruleForm:{
        brandName : '',
        category : '',
        contact : '',
        contactPhone:'',
        logo:'',
      },
      rules: {
        brandName: [
          { required: true, message: '请输入品牌名称', trigger: 'blur' },
        ],
        category: [
          { required: true, message: '请选择所属业态', trigger: 'change' },
        ],
        contact: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
        ],
        contactPhone: [
          { required: true, message: '请输入联系方式', trigger: 'blur' },
          {min:11,max:11, message: '请输入正确的手机号', trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    cancel(){
      this.$router.back()
    },
    handleChange(file, fileList) {
      this.file = fileList[0].raw
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    upload(formName){
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let fd = new FormData()
          fd.append("fileName",this.file)
          _fileUpload(fd).then(res=>{
            res = res.data
            if(res.status == 200){
              this.ruleForm.logo = res.data
              _addBrand(this.ruleForm).then(res=>{
                res = res.data
                if(res.code ==200){
                  this.$message({type:'success',message:"添加成功"})
                  this.$router.back();
                }
              }).catch(err=>{
                throw(err)
              })                       
            }else{
              this.$message({type:'error',message:"图片上传失败"})
            }
          }).catch(err=>{
              throw(err)
          })
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common.scss';
.addBrand{
  background-color: #fff;
  width: 100%;
  min-width: 750px;
  padding: 15px;

  .el-form{
    width: 80%;
    min-width: 550px;
    padding-left:60px;
    margin-bottom: 20px;
    .el-input{
      width: 250px;
    }
  }
  .btn{
    display: flex;
    justify-content: center;
    padding-top:15px;
    border-top: 1px solid #f3f3f3;
  }
}
</style>