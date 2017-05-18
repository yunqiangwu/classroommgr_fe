<template>
<div class="login-wrapper">
    <h1 class="title">登录</h1>
    <mt-field label="学号" placeholder="请输入学号" v-model="username"></mt-field>
    <mt-field label="密码" placeholder="请输入密码" type="password" v-model="password"></mt-field>
    <!-- <mt-actionsheet cancel-text="'取消'" :actions="actions" v-if="sheetVisible">
    </mt-actionsheet> -->
    <mt-button type="primary" size="large">sb</mt-button>
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
            username:'',
            password:'',
            sheetVisible: false,
            actions: [{
                name: '展示 Toast',
                method: this.showToast
            }, {
                name: '展示 Message Box',
                method: this.showMsgbox
            }]
        };
    },

    methods: {
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
  .login-wrapper{
    margin-top:50%;
  }
  .title{
    text-align: center;
  }

</style>
