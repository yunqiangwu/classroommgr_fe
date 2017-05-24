<template>
<div class="login-wrapper">
  <div class = "container">
    <h1 class="title">登录</h1>
    <el-form :model="form" :rules="rules" ref="formName" label-width="0px" class="demo-ruleForm">
      <el-form-item prop="username">
        <mt-field label="学号" placeholder="请输入学号" v-model="form.username"></mt-field>
      </el-form-item>
      <el-form-item prop="password">
        <mt-field label="密码" placeholder="请输入密码" type="password" v-model="form.password"></mt-field>
      </el-form-item>
      <p style="text-align:center;margin-top:4px;font-size:12px;color:#ff0000;line-height:30px;">{{tipMsg}}</p>
      <mt-button type="primary" @click="handlelogin" size="large">马上登录</mt-button>
    </el-form>
  </div>
</div>
</template>
<script>
import {
    Toast,
    MessageBox
} from 'mint-ui';
export default {
    name: 'app',
    data() {
      return {
          tipMsg: '',
          form: {
              username: '201340922108',
              password: '123456'
          },
          rules: {
              username: [
                  { required: true, message: '请输入学号', trigger: 'blur' }
              ],
              password: [
                  { required: true, message: '请输入密码', trigger: 'blur' }
              ]
          }
      }

    },

    methods: {

        handlelogin() {
          const self = this;
          var userinfo = {
            'username':self.form.username,
            'password':self.form.password
          };
          self.$refs['formName'].validate((valid) => {
              if (valid) {
                self.$axios({
                  url: self.AppStaticParams.mainUrl + "/login",
                  method: 'post',
                  data: userinfo,
                }).then((res) => {
                  res = res.data;
                  if(res.success){
                    self.$store.dispatch('login',res.userInfo);
                    // localStorage.setItem('ms_username',userinfo.username);
                    if(self.$router.currentRoute.query&&self.$router.currentRoute.query.redirect){
                      self.$router.push(self.$router.currentRoute.query.redirect);
                    }else{
                      self.$router.push('/');
                    }
                  }else {
                    self.$message(res.message||'验证失败');
                    self.tipMsg = res.message||'验证失败';
                  }
                  // 登录失败
                }).catch((err) => {
                    console.log("Error: "+err);
                });
                return true;
              } else {
                  console.log('error submit!!');
                  return false;
              }
          });
        },
        showToast() {
            Toast('这是一个 Toast');
        },

        showMsgbox() {
            MessageBox('提示', '这是一个 Message Box');
        }
    }
};
</script>

<style>
  html,body{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  .login-wrapper{
    position: relative;
    height: 100%;
    width: 100%;
  }
  .container{
    position: relative;
    top: 50%;
    margin: -5em 2em 4em 2em ;
    transform: translateY(-50%);
  }
  .title{
    text-align: center;
  }
  .el-form-item__error{
    color:red;
  }

</style>
