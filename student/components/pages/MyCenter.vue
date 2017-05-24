<template>
  <div class="mycenter-wrapper">
    <div class = "mycenter-container">
          <h1 class="title">个人中心</h1>

          <!-- <div v-if="mycenterState!==0">
            <mt-cell title="签到活动名称" :value="mycenter.name" ></mt-cell>
            <mt-cell title="签到分组" :value="mycenter.groupName" ></mt-cell>
            <mt-cell title="签到开始时间" :value="mycenter.startTime" ></mt-cell>
          </div>

          <mt-button v-if="mycenterState===1" :disabled="mmycenterState!==0" @click="domycenter" size="large" type="primary">{{['立即签到','已签到','签到超时'][mmycenterState]}}</mt-button>

          <h3 v-if="mycenterState!==1" class="tip">{{message}}</h3> -->

    </div>
  </div>
</template>

<script>





</script>

<style>

.mycenter-wrapper{
  position: relative;
  height: 100%;
  width: 100%;
}
.mycenter-container{
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
