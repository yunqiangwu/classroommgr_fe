<template>
  <div class="question-wrapper">
    <div class = "question-container">
          <h1 class="title">答题</h1>

          <!-- <div v-if="questionState!==0">
            <mt-cell title="签到活动名称" :value="question.name" ></mt-cell>
            <mt-cell title="签到分组" :value="question.groupName" ></mt-cell>
            <mt-cell title="签到开始时间" :value="question.startTime" ></mt-cell>
          </div>

          <mt-button v-if="questionState===1" :disabled="mquestionState!==0" @click="doquestion" size="large" type="primary">{{['立即签到','已签到','签到超时'][mquestionState]}}</mt-button>

          <h3 v-if="questionState!==1" class="tip">{{message}}</h3> -->

    </div>
  </div>
</template>

<script>





</script>

<style>

.question-wrapper{
  position: relative;
  height: 100%;
  width: 100%;
}
.question-container{
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
