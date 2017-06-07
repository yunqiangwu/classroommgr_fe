<template>
<div class="wrapper">
    <!-- <v-head></v-head> -->
    <div class="content" >
      <div class='my-tab-container'>
        <transition name="move" mode="out-in">
            <router-view class="home-view"></router-view>
        </transition>
      </div>
      <mt-tabbar v-model="selected" @click.native="goRouter">
        <mt-tab-item title="在线签到" id ="signin" >
          <img slot="icon" src="../../assets/100x100.png">
          在线签到
        </mt-tab-item>
        <mt-tab-item title="分组讨论" id="grouptalk"  >
          <img slot="icon" src="../../assets/100x100.png">
          分组讨论
        </mt-tab-item>
        <!-- <mt-tab-item title="抢答题目" id="question"   >
          <img slot="icon" src="../../assets/100x100.png">
          抢答题目
        </mt-tab-item> -->
        <mt-tab-item title="个人中心" id="mycenter"  >
          <img slot="icon" src="../../assets/100x100.png">
          个人中心
        </mt-tab-item>
      </mt-tabbar>
    </div>
</div>
</template>

<script>
// import vHead from './Header.vue';
import Signin from '../pages/Signin.vue';
export default {

    data() {
        return {
          selected:"signin",
        }
    },
    components: {
        // vHead,
    },
    methods: {
      goRouter(){
        this.$router.push({path:this.selected});
        // switch(navItem){
        //   case '1':this.$router.push({path:'index'});break;
        //   case '2':this.$router.push({path:'rank'});break;
        //   case '3':this.$router.push({path:'plist'});break;
        //   case '4':this.$router.push({path:'singer'});break;
        //   case '5':this.$router.push({path:'ringtone'});break;
        // }
      }
    }
}
</script>

<style>
  .wrapper,.content,.my-tab-container{
    height: 100%;
  }
  .my-tab-container{
    height: calc(100% - 53px);
  }
  .my-tab-container{
    overflow-y: auto;
  }
  .home-view{
    margin-top: -21px;
  }
</style>
