<template>
<div class="signin-wrapper">
  <div class = "signin-container">
        <h1 class="title">签到</h1>

        <!-- <mt-cell v-for="(k,v) in signin" :title="k" :value="v" key="k"></mt-cell> -->
        <div v-if="signinState!==0">
          <mt-cell title="签到活动名称" :value="signin.name" ></mt-cell>
          <mt-cell title="签到分组" :value="signin.groupName" ></mt-cell>
          <mt-cell title="签到开始时间" :value="signin.startTime" ></mt-cell>
        </div>

        <mt-button v-if="signinState===1" :disabled="mSigninState!==0" @click="doSignin" size="large" type="primary">{{['立即签到','已签到','签到超时'][mSigninState]}}</mt-button>

        <h3 v-if="signinState!==1" class="tip">{{message}}</h3>
    <!-- <mt-actionsheet cancel-text="'取消'" :actions="actions" v-if="sheetVisible">
    </mt-actionsheet> -->
  </div>
</div>
</template>

<script>
var i =2;
export default {



  data(){
    var self = this;
    var username = this.$store.getters.currentUserName;
    return {
      message:'正则加载签到信息！',
      signinState: 0,  // 0 未开始签到   1 正在进行签到  2 签到结束
      mSigninState: 0,  // 0 暂未签到  1 已签到  2 没有签到
      username,
      signin:{
      },
      socketEvents:{
        [`/user/${username}/receiveSiginMsg`] :function (frame) {
          self.signin = JSON.parse(frame.body);
          self.signinState = +frame.headers.signinState;
          self.mSigninState = +frame.headers.mSigninState;
          if(self.mSigninState==1){
            // self.startSignin();
            self.message = '点击按钮开始签到！';
          }

        },
        [`/user/${username}/noSigin`] :function (frame) {
          self.signin = {};
          self.signinState = +frame.headers.signinState;
          self.mSigninState = 0;
          self.noSignin();
          self.message = '当前没有签到活动！';
          // console.log(frame);
        },
        '/topic/beginSigninMsg':function(frame){
          self.signin = JSON.parse(frame.body);
          self.signinState = +frame.headers.signinState;
          self.mSigninState = 0;
          // self.startSignin();
          self.message = '点击按钮开始签到！';
        },
        '/topic/stopSigninMsg':function(frame){
          if(self.mSigninState==1){
            return;
          }
          self.signin = JSON.parse(frame.body);
          self.signinState = +frame.headers.signinState;
          self.mSigninState = 2;
          // self.stopSignin();
          self.message = '签到活动结束';
        },
        [`/user/${username}/finishSigninMsg`]:function(frame){
          self.signin = JSON.parse(frame.body);
          self.signinState = +frame.headers.signinState;
          self.mSigninState = +frame.headers.mSigninState;
          self.message = '签到成功';
        }
      },
    };
  },

  methods:{
    noSignin(){
      var self = this;
      self.message = '当前没有签到活动！';
    },
    startSignin(){
      var self = this;
      self.message = '点击按钮开始签到！';
    },
    stopSignin(){
      var self = this;
      self.message = '签到活动结束';
    },
    doSignin(){
      this.$stomp.send('/topic/doSignin',{username:this.username});
    }
  },
  created(){
    // console.log(i++);
    // if(this.$router.params.signinid){
        // this.$stomp.send('/topic/message',{uid:this.username},'asdfasdf');
    // }else{
       this.$stomp.send('/topic/getSigninMsg',{username:this.username});
    // }


  },
  beforeDestroy(){
    console.log(-(i++));
  }


}


</script>

<style>
  html,body{
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
  }
  .signin-wrapper{
    position: relative;
    height: 100%;
    width: 100%;
  }
  .signin-container{
    position: relative;
    top: 50%;
    /*margin: -5em 2em 4em 2em ;*/
    transform: translateY(-50%);
  }
  .title{
    text-align: center;
  }
  .tip{
    text-align: center;
    color: red;
  }


</style>
