<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <el-menu-item index="signinsetting">
                <i class="el-icon-setting"></i>签到
            </el-menu-item>
            <el-menu-item index="question">
                <i class="el-icon-setting"></i>答题讨论
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>学生信息维护</template>
                <el-menu-item index="studentmgr">学生管理</el-menu-item>
                <el-menu-item index="groupmgr">分组管理</el-menu-item>
                <el-menu-item index="studentgroup">学生分组</el-menu-item>
                <!-- <el-menu-item index="vuetable">Vue表格组件</el-menu-item> -->
            </el-submenu>
            <!-- <el-submenu index="3">
                <template slot="title"><i class="el-icon-date"></i>表单</template>
                <el-menu-item index="baseform">基本表单</el-menu-item>
                <el-menu-item index="vueeditor">编辑器</el-menu-item>
                <el-menu-item index="markdown">markdown</el-menu-item>
                <el-menu-item index="upload">文件上传</el-menu-item>
            </el-submenu> -->

            <!-- <el-submenu index="3">
                <template slot="title"><i class="el-icon-date"></i>题库维护</template>
                <el-menu-item index="baseform">题目分类管理</el-menu-item>
                <el-menu-item index="vueeditor">题目管理</el-menu-item>
                <el-menu-item index="markdown">题目分类</el-menu-item>
            </el-submenu> -->

            <el-submenu index="3">
                <template slot="title"><i class="el-icon-star-on"></i>报表</template>
                <el-menu-item index="signinrecord">签到记录</el-menu-item>
                <!-- <el-menu-item index="basecharts">学生表现</el-menu-item> -->
                                <el-menu-item index="mixcharts">混合图表</el-menu-item>
                <!-- <el-menu-item index="mixcharts">混合图表</el-menu-item> -->
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        computed:{
            onRoutes(){
                return this.$route.path.replace('/','');
            }
        }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
