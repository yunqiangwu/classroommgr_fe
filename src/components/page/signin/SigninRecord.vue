<template>
<div class="table">
  <div class="crumbs">
      <el-breadcrumb separator="/">
          <el-breadcrumb-item><i class="el-icon-menu"></i>报表</el-breadcrumb-item>
          <el-breadcrumb-item>签到记录</el-breadcrumb-item>
      </el-breadcrumb>
  </div>





  <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="startTime" label="签到时间" sortable :formatter="formatterDate">
      </el-table-column>
      <el-table-column prop="name" label="签到活动名称">
      </el-table-column>
      <el-table-column prop="groupName" label="签到分组">
      </el-table-column>
      <el-table-column prop="totalNum" label="签到人数"  >
      </el-table-column>
      <el-table-column prop="signNum" label="已到人数"  >
      </el-table-column>
      <!-- <el-table-column  label="头像">
          <template scope="scope">
              <img class="user-icon" :src="scope.row.logo">
          </template>
      </el-table-column> -->
      <el-table-column label="操作" width="140">
          <template scope="scope">
              <el-button size="small"
                      @click="handleDetail(scope.$index, scope.row)">查看详情</el-button>
          </template>
      </el-table-column>
  </el-table>


    <div class="pagination">
        <el-pagination
                :page-size="pageSize"
                @current-change ="handleCurrentChange"
                layout="prev, pager, next"
                :total="total">
        </el-pagination>
    </div>

      <transition name="el-zoom-in-center">
            <signin-student-list  v-if="students.length>0" @click-student="handlerClickStudent" :student-list="students" :signin-states="signinResult" class="student-list" ref="studentList">
            </signin-student-list>
      </transition>




</div>
</template>
<script>
import moment  from 'moment';
import SigninStudentList from './SigninStudentList.vue';
import * as types from 'src/store/types';


  export default {
    components: {
        SigninStudentList,
    },
    data(){

      return {
        tableData:[],
        cur_page: 1,
        pageSize: 6,
        total:1000,
        students:[],
        signinResult:{},
      }
    },

    created(){
        this.getData();
    },

    methods:{
      handlerClickStudent(){

      },
      handleDetail(index, row){
        this.signinResult = JSON.parse(row.result);
        this.$store.dispatch(types.FETCH_STUDENT_BY_IDS, Object.keys(this.signinResult)).then(students => {
            // debugger;
            this.students = students;
        });

      },
      handleCurrentChange(val){
          this.cur_page = val;
          this.getData();
      },
      getData(){
          let self = this;
          return this.$axios.post(this.AppStaticParams.mainUrl+'/signinrecord',{
            page:self.cur_page,
            rows:self.pageSize,
            // mgrid:1
          }).then((res) => {
              // res.data.list.forEach(function (item) {
              //   item.studentIds = item.studentIds?item.studentIds.split(','):[];
              // });
              self.tableData = res.data.list;
              self.total = res.data.total;
              // self.
          })
      },
      formatterDate(row, column) {
        return moment(new Date(row.startTime)).format('MM-DD HH:mm');;
      },
    }



  }


</script>

<style>

</style>
