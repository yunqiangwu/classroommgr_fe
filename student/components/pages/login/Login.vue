<template>
<div class="login-wrapper">
  <div class = "container">
    <h1 class="title">登录</h1>
    <el-form :model="form" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">

    <mt-field label="学号" placeholder="请输入学号" v-model="username"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <!-- <mt-actionsheet cancel-text="'取消'" :actions="actions" v-if="sheetVisible">
    </mt-actionsheet> -->
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

          form:{

          },
            username:'',
            password:'',

            rules:{}

        };

    },

    methods: {

        handlelogin() {
            this.showToast();
            this.$store.dispatch('login',{username:'abcd'});
            this.$router.push('/');
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

</style>
