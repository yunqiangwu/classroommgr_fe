<template>
<div class="register-wrap">
    <div class="ms-title">课堂管理系统| 注册</div>
    <div class="ms-register">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="账号" prop="username">
                <el-input v-model="ruleForm.username" placeholder="账号"></el-input>
            </el-form-item>
            <el-form-item label="姓名" prop="realname">
                <el-input v-model="ruleForm.realname" placeholder="真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input type="password" placeholder="请输入密码" v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="repassword">
                <el-input type="repassword" placeholder="确认密码" v-model="ruleForm.repassword" @keyup.enter.native="submitForm('ruleForm')"></el-input>
            </el-form-item>
            <div class="register-btn">
                <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            </div>
            <div class="login-btn">
                <a class="btn" href="#login">我有账号，立即登录</a>
            </div>
            <p style="text-align:center;margin-top:4px;font-size:12px;color:#ff0000;line-height:30px;">{{tipMsg}}</p>
        </el-form>
    </div>
</div>
</template>

<script>
export default {
    created: function() {
        console.log(this.$router.currentRoute);
    },
    data: function() {
        return {
            tipMsg: '',
            ruleForm: {
                username: '',
                password: '',
                repassword: '',
                realname: ''
            },
            rules: {
                username: [{
                    required: true,
                    message: '请输入用户名',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '请输入密码',
                    trigger: 'blur'
                }],
                realname: [{
                    required: true,
                    message: '请输入真实姓名',
                    trigger: 'blur'
                }, ],
                repassword: [{
                    required: true,
                    message: '请确认密码',
                    trigger: 'blur'
                }, ]
            }
        }
    },
    methods: {
        submitForm(formName) {
            const self = this;
            var userinfo = {
                'username': self.ruleForm.username,
                'password': self.ruleForm.password
            };
            self.$refs['ruleForm'].validate((valid) => {
                if (valid) {
                    self.$axios({
                        url: self.AppStaticParams.mainUrl + "/register",
                        method: 'post',
                        data: userinfo,
                    }).then((res) => {
                        res = res.data;
                        if (res.success) {
                            self.$store.dispatch('register', res.userInfo);
                            // localStorage.setItem('ms_username',userinfo.username);
                            if (self.$router.currentRoute.query && self.$router.currentRoute.query.redirect) {
                                self.$router.push(self.$router.currentRoute.query.redirect);
                            } else {
                                self.$router.push('/');
                            }

                            // console.log("Response: "+JSON.stringify(res));
                        } else {
                            self.$message(res.message || '验证失败');
                            self.tipMsg = res.message || '验证失败';
                        }
                    }).catch((err) => {
                        console.log("Error: " + err);
                    });

                    // self.AppStaticParams.registerUrl
                    // self.$axios.post(self.AppStaticParams.registerUrl|| "/register",userinfo).then((res) => {
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
.register-wrap {
    background-size: cover;
    background-image: url(/static/img/bg.b80cfa0.jpg);
    /* background: #324157; */
}

.register-wrap {
    position: relative;
    width: 100%;
    height: 100%;
}

.ms-title {
    position: absolute;
    top: 50%;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;
    text-shadow: rgba(0, 0, 0, 0.5) 2px 4px 4px, rgba(0, 0, 0, 0.7) 1px 1px 2px;
}

.ms-register {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 360px;
    height: 280px;
    margin: -150px 0 0 -190px;
    padding: 40px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.5) 2px 4px 4px, rgba(0, 0, 0, 0.7) 1px 1px 2px;
    /*background: #fff;*/
    background: rgba(255, 255, 255, 0.99);
}

.register-btn {
    text-align: center;
}

.register-btn button {
    width: 100%;
    height: 36px;
}

.login-btn {
    margin-top: 20px;
    font-size: 10px;
    text-align: center;
}
</style>
