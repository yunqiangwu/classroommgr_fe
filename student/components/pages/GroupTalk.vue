<template>
  <div class="talk-wrapper">
    <div class = "talk-container">
          <h1 class="title">聊天</h1>

          <!-- <div v-if="talkState!==0">
            <mt-cell title="签到活动名称" :value="talk.name" ></mt-cell>
            <mt-cell title="签到分组" :value="talk.groupName" ></mt-cell>
            <mt-cell title="签到开始时间" :value="talk.startTime" ></mt-cell>
          </div>

          <mt-button v-if="talkState===1" :disabled="mtalkState!==0" @click="dotalk" size="large" type="primary">{{['立即签到','已签到','签到超时'][mtalkState]}}</mt-button>

          <h3 v-if="talkState!==1" class="tip">{{message}}</h3> -->

    </div>
  </div>
</template>

<script>





</script>

<style>

.talk-wrapper{
  position: relative;
  height: 100%;
  width: 100%;
}
.talk-container{
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
