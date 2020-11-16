<template>
  <div class="login">
    <el-container>

      <!-- header -->
      <el-header class="login_header">
        <div class="container">
          <img :src="logoImg" alt="餐展柜" class="logoImg">
          <span class="name" style="margin-left:30px">管家系统</span>
        </div>
      </el-header>

      <!-- main -->
      <el-main class="login_main">
        <div class="container">
          <div class="form">
            <div class="title" style="display:flex;justify-content:center">
              <span class="company" @click= "changejt()"  v-if="!isForget" :class="{active_color:active}">集团管理</span>
              <span class="store" @click= "changemd()"  v-if="!isForget" :class="{active_color:!active}">门店管理</span>
              <span  v-if="isForget"> 密码修改</span>
            </div>

            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-input v-model="ruleForm.shopId" placeholder="请输入商户号" ></el-input>
              <el-input v-model="ruleForm.phone" placeholder="请输入用户名"></el-input>
              <el-input v-model="ruleForm.password" placeholder="请输入密码"  type="password"></el-input>
              <el-button type="primary" v-if="!isForget" @click="login('ruleForm')">登录</el-button>
              <el-button type="primary" v-if="isForget"  @click="resetPwd('ruleForm')">密码更改</el-button>
            </el-form>
            <div class="forget">
              <span @click="changeForget"  style="cursor:pointer">{{btn_value}}</span>
            </div>

          </div>
        </div>
      </el-main>
      <!-- footer -->
      <el-footer class="login_footer">
          <div class="copyright">
              <span>Copyright @ 2019 All Rights Reserved</span>
          </div>
      </el-footer>

  </el-container>
  </div>
</template>


<script>
import { _login } from '@/api/login'

export default {
  data() {
    return {
      btn_value:"忘记密码?",
      isForget:false,
      active:true,
      logining:false,
      logoImg:require('../../assets/images/logo.png'),
      ruleForm: {
        /* shopId: '98782414',
        username:'13758010848',
        password: '07081625', */
        shopId:'f3deb',
        phone:'18810701234',
        password:'admin',
        type:1, // 1集团，2门店
      },
      rules: {
        shopId: [
          { required: true, message: '请输入商铺名', trigger: 'blur' },
        ],
        phone: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur'}
        ],
      }
    }
  },
  methods:{
    // 更改标题显示
    changeForget(){
      this.isForget = !this.isForget
      if(this.isForget)
          this.btn_value= "已有账号返回登录"
      else
          this.btn_value = "忘记密码？"
    },
    // 获取登录类型
    changejt(){
      this.ruleForm.type = 1
      this.active = true
    },
    changemd(){
      this.ruleForm.type = 2
      this.active = false
    },
    // 登录
    login(formName){
      let current = {path:'./brand',name:'brand',label:'品牌管理'}
      this.$refs[formName].validate((valid) => {
        if(valid){
          if(this.ruleForm.type ==1){
            _login(this.ruleForm).then(res=>{
              if(res.data.status == 200){
                res = res.data
                localStorage.clear()
                this.$store.commit('setToken',res.authorization)
                this.$store.commit('setCurMenu',current)
                this.$store.commit('setUsername',res.data.applicant) 
                this.$router.push('./brand')
              }else{
                this.$message({type:'error',message:res.data.desc})
              }
            }).catch(err=>{
              throw err
            }) 
          }else{
            this.$message({type:"error",message:"暂未"})
          }
        }
      }); 
    },
      
    // 修改密码
    resetPwd(formName){
      console.log("reset")
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/common.scss';
.login{
  height: 100%;
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
      /* 头部 */
  .login_header{
    height: 60px;
    width: 100%;

    .container{
      height: 52px;
      line-height: 52px;
      
      .logoImg{
        height: 52px;
      }
      
      .name{
        vertical-align: top;
        line-height: 52px;
        display: inline-block;
        font-size: 28px;
      }
    }
  }

  // main
  .login_main{
    padding:0;
    display: flex;
    flex:1;
    overflow:hidden;
    background: url("../../assets/images/bg1.jpg") top no-repeat;
    background-size: cover;
    // 登录部分
    .container{
      float: right;
      position: absolute;
      top:50%;
      right:15%;
      transform: translateY(-50%);
      .form{
        background-color: #fff;
        height: 450px;
        width: 400px;
        border-radius: 16px;
        padding: 30px;
        text-align: center;

        .title{
          span{
            cursor: pointer;
            text-align: center;
            display:inline-block;
            width: 165px;
            margin:30px 0 30px;
          }

          .active_color{
            color:#ff930d
          }

          .company{
            border-right:1px solid #ccc;
            cursor: pointer;
          }

          .store{
            cursor: pointer;
          }
        }
        div.el-form-item{
          text-align: center;
        }
        .el-input{
          margin-bottom:30px;
          width: 340px;
        }
        .el-button{
          width: 340px;
          height: 40px;
          margin-bottom: 30px;
        }

        .forget{
          text-align: right;
        }
      }
    }
  }
  /* 尾部 */
  .login_footer{
    height: 60px;
    .copyright{
      color: #818693;
      width: 100%;
      height: 100%;
      text-align: center;
      line-height: 60px;
    }
  }
}
</style>

