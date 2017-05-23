

<template >
  <div class="student-list">

      <transition-group name="el-zoom-in-center">
          <el-card v-for="(o, index) in studentList"  :key="o.id" :body-style=" {  padding: '0px'}"
          :class='stateClass(o.id)'
           >
              <img :src="o.logo" class="image" @click="handleClick(o.id)" >
              <div style="padding: 14px;">
                  <span>{{o.realname}}</span>
              </div>
          </el-card>
      </transition-group>
      <div style="clear:both;"></div>

  </div>
</template>

<script>
export default {
  methods:{
    handleClick(userid){
      // this.$store.dispatch('signin',userid);
      this.$emit('click-student',userid);
    },

// :class='  {stateSignined:o.signinState==1}'

    stateClass (userid){
      return "state"+ ["-not-sign","-signed","-no-sign"][this.signinStates[''+userid]||0] ;
    }
  },
  // computed:{
  //   signinState(id){
  //
  //   }
  // },
  // watch:{
  //   signinStates(v){
  //     console.log(v);
  //   }
  // },
  props : {
      studentList : {
          type : Array
      },

      signinStates: {
          type : Object
      },

  },
}
</script>

<style>
.student-list{
  margin-top: 10px;
  box-shadow: rgba(0, 0, 0, 0.3) 3px 5px 12px 2px;
  overflow: auto;
  border-radius: 4px;
  padding: 4px;

}


.student-list .el-card {
    float: left;
    height: 80px;
    width: 80px;
    margin-left: 10px;
    margin-bottom: 8px;
    text-align: center;
      position: relative;
}
.el-card img {
    transform: translateY(8px);
    border-radius: 50%;
    width: 40px;
    height: 40px;
}

.el-card.state-not-sign{

}

.el-card.state-signed{
  background: green;
  color:#fff;
}


.el-card.state-no-sign{
  background: red;
    color:#fff;
}

.el-card.state-no-sign:after,.el-card.state-signed:after{
  display: block;
  width: 40px;
  position: absolute;
  top: 0;
  right: 0;
  height: 20px;
  color: orange;
  line-height: 20px;
  font-size: 12px;
  background: #504f54;
  border-radius: 0px 0px 0px 8px;
}
.el-card.state-no-sign:after{
    content: "\672A\5230";
}
.el-card.state-signed:after{
    content: "已到";
}

</style>
