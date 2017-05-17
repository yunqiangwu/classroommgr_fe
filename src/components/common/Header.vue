<template>
    <div class="header">
        <div class="logo"><span class="img"></span>教师端控制台</div>
        <div class="fulls-screen-btn-wrapper" ><el-button @click="toggleFullScreen">切换全屏</el-button></div>
        <div class="user-info">
            <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user-logo" src="../../../static/img/img.jpg">
                    {{username}}
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                name: this.$store.getters.currentUserName,
            }
        },
        computed:{
            username(){
                let username = localStorage.getItem('ms_username');
                return username ? username : this.name;
            }
        },
        methods:{
            toggleFullScreen(){
              this.$emit('full-screen-toggle');
            },
            handleCommand(command) {
                let self = this;
                if(command == 'loginout'){
                  self.$store.dispatch('logout').then(function(res) {
                    self.$message( res||'注销成功');
                    self.$router.push('/login');
                  });
                    // localStorage.removeItem('ms_username')

                }
            }
        }
    }
</script>
<style scoped>
    .header {
        position: relative;
        box-sizing: border-box;
        width: 100%;
        height: 70px;
        font-size: 22px;
        line-height: 70px;
        color: #fff;
    }
    .header .logo{
        position: relative;
        float: left;
        width:250px;
        text-align: center;
    }
    .header .logo .img{
      display: inline-block;
      position: absolute;
      width: 40px;
      height: 40px;
      top:50%;
      transform: translateY(-50%);
      border-radius: 10%;
      left:10px ;
      background-image: url(../../../static/img/icon.jpg);
      background-size: contain;
      background-repeat: no-repeat;
    }





    .user-info {
        float: right;
        padding-right: 50px;
        font-size: 16px;
        color: #fff;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 50px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        position: absolute;
        left:0;
        top:15px;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .el-dropdown-menu__item{
        text-align: center;
    }

    .fulls-screen-btn-wrapper{
      position: absolute;
      right: 200px;
      top: 3px;
      opacity: 0.7;
      z-index: 99;
    }



        @media screen and (max-width: 800px) {
          .fulls-screen-btn-wrapper{
            top:5px;
            transform: none;
            right: 4px;
            left: auto;
          }
        }
</style>
