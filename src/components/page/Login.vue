<template>
    <div class="login-wrap">
        <div class="ms-title">课堂管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password" @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <p style="text-align:center;margin-top:4px;font-size:12px;color:#ff0000;line-height:30px;">{{tipMsg}}</p>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
      created: function () {
        console.log(this.$router.currentRoute);
      },
        data: function(){
            return {
                tipMsg: '',
                ruleForm: {
                    username: 'test1',
                    password: '12345678'
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                const self = this;
                var userinfo = {
                  'username':self.ruleForm.username,
                  'password':self.ruleForm.password
                };
                self.$refs[formName].validate((valid) => {
                    if (valid) {
                      self.$axios({
                        url: self.AppStaticParams.loginUrl|| "/login",
                        method: 'post',
                        data: userinfo,
                      }).then((res) => {
                        res = res.data;
                        if(res.success){
                          self.$store.dispatch('login',userinfo.username);
                          // localStorage.setItem('ms_username',userinfo.username);

                          if(self.$router.currentRoute.query&&self.$router.currentRoute.query.redirect){
                            self.$router.push(self.$router.currentRoute.query.redirect);
                          }else{
                            self.$router.push('/');
                          }

                          // console.log("Response: "+JSON.stringify(res));
                        }else {
                          self.$message(res.message||'验证失败');
                          self.tipMsg = res.message||'验证失败';
                        }
                      }).catch((err) => {
                          console.log("Error: "+err);
                      });

// self.AppStaticParams.loginUrl
                      // self.$axios.post(self.AppStaticParams.loginUrl|| "/login",userinfo).then((res) => {
                      //     localStorage.setItem('ms_username',res);
                      //     self.$router.push('/readme');
                      //     console.log("Response: "+res);
                      // }).catch((err) => {
                      //     console.log("Error: "+err);
                      // });

                      return true;

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap{
        position: relative;
        width:100%;
        height:100%;
    }
    .ms-title{
        position: absolute;
        top:50%;
        width:100%;
        margin-top: -230px;
        text-align: center;
        font-size:30px;
        color: #fff;
        text-shadow: rgba(0, 0, 0, 0.5) 2px 4px 4px,rgba(0, 0, 0, 0.7) 1px 1px 2px ;

    }
    .ms-login{
        position: absolute;
        left:50%;
        top:50%;
        width:300px;
        height:160px;
        margin:-150px 0 0 -190px;
        padding:40px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.5) 2px 4px 4px,rgba(0, 0, 0, 0.7) 1px 1px 2px ;
        /*background: #fff;*/
        background: rgba(255, 255, 255, 0.99) ;
    }
    .login-btn{
        text-align: center;
    }
    .login-btn button{
        width:100%;
        height:36px;
    }
</style>
