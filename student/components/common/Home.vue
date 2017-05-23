<template>
<div class="wrapper">
    <!-- <v-head></v-head> -->
    <div class="content" >
      <mt-tab-container v-model="active">
        <mt-tab-container-item id="tab-container1">
          <mt-cell v-for="n in 30" key="n" title="tab-container 1">{{n}}</mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container2">
          <mt-cell v-for="n in 5" key="n" title="tab-container 2">{{n}}</mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container3">
          <mt-cell v-for="n in 7" key="n" title="tab-container 3">{{n}}</mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container4">
          <mt-cell v-for="n in 2" key="n" title="tab-container 4">{{n}}</mt-cell>
        </mt-tab-container-item>
      </mt-tab-container>
      <mt-tabbar v-model="selected">
        <mt-tab-item title="在线签到" id ="1" @click.native.prevent="active = 'tab-container1'">
          <img slot="icon" src="../../assets/100x100.png">
          在线签到
        </mt-tab-item>
        <mt-tab-item title="分组讨论" id="2"  @click.native.prevent="active = 'tab-container2'">
          <img slot="icon" src="../../assets/100x100.png">
          分组讨论
        </mt-tab-item>
        <mt-tab-item title="抢答题目" id="3"  @click.native.prevent="active = 'tab-container3'">
          <img slot="icon" src="../../assets/100x100.png">
          抢答题目
        </mt-tab-item>
        <mt-tab-item title="个人中心" id="4" @click.native.prevent="active = 'tab-container4'">
          <img slot="icon" src="../../assets/100x100.png">
          个人中心
        </mt-tab-item>
      </mt-tabbar>
    </div>
</div>
</template>

<script>
// import vHead from './Header.vue';
export default {
    data() {
        return {
          selected:"1",
          active :"tab-container1"
        }
    },
    components: {
        // vHead,
    },
    methods: {
    }
}
</script>

<style>
  .wrapper,.content,.mint-tab-container{
    height: 100%;
  }
  .mint-tab-container{
    height: calc(100% - 60px);
  }
  .mint-tab-container{
    overflow-y: auto;
  }
</style>
