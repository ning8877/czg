<template>
  <div class="addStoreM">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      
      <el-form-item label="店长姓名:" prop="storeManagerName">
        <el-input size="small" v-model="ruleForm.storeManagerName" placeholder="请输入店长姓名"></el-input>
      </el-form-item>

      <el-form-item label="联系方式:" prop="storeManagerPhone">
        <el-input size="small" v-model="ruleForm.storeManagerPhone" placeholder="请输入联系方式"></el-input>
      </el-form-item>
            
      <el-form-item label="负责门店:"  prop="stores">
        <el-checkbox-group v-model="ruleForm.stores">
          <el-checkbox v-for="item in allOptions" :key="item.value" :label="item.value" 
            :disabled="item.disabled">{{item.label}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>

    <div class="btn">
      <el-button  size="small" type="plain" @click="cancel">取消</el-button>
      <el-button size="small" type="primary" @click="saveForm('ruleForm')">保存</el-button>
    </div>
</div>
</template>

<script>
import {_getStoreByProvince, _searchById,_update} from '@/api/storeM'

export default {
  data() {
    return {
      allOptions:[],
      ruleForm:{
        storeManagerId :this.$route.query.id,
        storeManagerName :'',
        storeManagerPhone :'',
        stores:[],
        storeIds:[]
      },
      rules: {
        storeManagerName: [
          { required: true, message: '请输入店长名称', trigger: 'blur' },
        ],
        storeManagerPhone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {min:11,max:11, message: '请输入正确的手机号', trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    // 获取店长信息
    searchById(id){
      _searchById(id).then(res=>{
        if(res && res.data && res.data.code == 200){
          res= res.data
          this.ruleForm.storeManagerName= res.data.storeManagerName
          this.ruleForm.storeManagerPhone= res.data.storeManagerPhone
          if(res.data.stores){
            res.data.stores.forEach(item=>{
               this.ruleForm.stores.push(item.storeId)
            })
          }
        }
      })
    },
    // 保存
    saveForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.ruleForm.storeIds = this.ruleForm.stores
          _update(this.ruleForm).then(res=>{
            if(res && res.data)
              res = res.data
              if(res.code === 200){
                this.$message({type:'success',message:"更新成功"})
                this.$router.back();
              }else{
                this.$message({type:'error',message:res.message})
              }
          }).catch(err=>{
            throw(err)
          })
        }
      });
    },
    cancel() {
      this.$router.back();
    },
    // 获取店铺列表
    getStoreIds(){
      _getStoreByProvince().then(res=>{
        if( res && res.data.code == 200 && res.data.data){
          res = res.data
          res.data.forEach(item=>{
            let disabled = true
            if(item.storeManagerId==null || item.storeManagerId==this.ruleForm.storeManagerId){
              disabled = false
            }
            this.allOptions.push({value:item.storeId,label:item.storeName,disabled:disabled})
          })
        }
      }).catch(err=>{
          throw(err)
      })
    },
  },
  created(){
    this.getStoreIds()
    this.searchById(this.$route.query.id)
  },
  mounted(){
    console.log(this.ruleForm.stores)
  }
}
</script>

<style lang="scss">
@import '@/assets/scss/common.scss';

</style>
<style lang="scss" scoped>
.addStoreM{
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
    .el-input--suffix{
      .el-input__inner{
        padding-right:65px;
      }
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