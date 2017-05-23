<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item v-for="(item, index) in items" index="item.link" :key="index">
      <router-link :to="item.link">
      <h3>{{ item.title }}</h3>
      </router-link>
    </el-carousel-item>
  </el-carousel>
</template>

<script>
export default{
  data(){
    return {
      items:[
        {
          title:'签到',
          link: 'signinsetting'
        },
        {
          title:'管理学生',
          link: 'studentmgr'
        },
        {
          title:'学生分组',
          link: 'studentgroup'
        },
        {
          title:'签到记录',
          link: 'signinrecord'
        }
      ]
    }
  }
}
</script>

<style>
  .el-carousel__item h3 {
    text-align: center;
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
