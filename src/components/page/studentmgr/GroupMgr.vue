<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i>学生</el-breadcrumb-item>
                <el-breadcrumb-item>分组管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-button-group class="btngroup">
          <el-button  icon="plus" type="primary" @click="handleAdd()">新增分组</el-button>
          <el-badge :value="changedDatas.length" class="item">
            <el-button  icon="upload" type="success" @click="handleSave()">保存修改</el-button>
          </el-badge>
          <!-- <el-button  icon="delete"  type="danger">批量删除</el-button> -->
        </el-button-group>
        <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="id" label="分组编号" sortable :formatter="formatterId">
            </el-table-column>
            <el-table-column prop="name" label="分组名称" sortable >
              <template scope="scope">
                  <span  v-if="editRowIndex != scope.$index ">{{scope.row.name}}</span>
                  <el-input
                    v-else
                    v-model="editingData.name"
                    @keyup.enter.native="handleInputConfirm(scope.$index, scope.row)"
                  >
                  </el-input>
              </template>
            </el-table-column>
            <el-table-column prop="studentIds" label="学生数量"  :formatter="formatter" >
            </el-table-column>
            <!-- <el-table-column  label="头像">
                <template scope="scope">
                    <img class="user-icon" :src="scope.row.logo">
                </template>
            </el-table-column> -->
            <el-table-column label="操作" width="240">
                <template scope="scope">
                    <el-button size="small" v-if="editRowIndex != scope.$index "
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" v-else
                            @click="handleCancleEdit(scope.$index, scope.row)">取消</el-button>
                    <el-button size="small"  v-if="editRowIndex == scope.$index "
                            @click="handleInputConfirm(scope.$index, scope.row)">确定</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
    </div>
</template>

<script>

    import _ from 'underscore';

    export default {

        data() {
            return {
                tableData: [],
                cur_page: 1,
                pageSize: 9,
                total:1000,
                editRowIndex:-1,
                changedDatas:[],
                editingData:{
                  name:'',
                  id:''
                }
            }
        },
        created(){
            this.getData();
        },
        methods: {
            handleCurrentChange(val){
                this.cur_page = val;
                this.getData();
            },
            getData(){
                let self = this;
                return this.$axios.post(this.AppStaticParams.mainUrl+'/group',{
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
            formatter(row, column) {
              if(!row.studentIds){
                return 0;
              }else{
                return row.studentIds.split(',').length;
              }
            },
            formatterId(row, column) {
              return row.id||'新分组';
            },
            handleEdit(index, row) {
                this.$message('编辑第'+(index+1)+'行');
                this.editingData.name = row.name;
                this.editingData.id = row.id;
                this.editRowIndex = index;
            },
            handleCancleEdit(index, row) {
                if(row.id!==0&&row.id){
                  this.editRowIndex =-1;
                }else{
                  if(this.changedDatas.indexOf(row)==-1){
                    this.handleDelete(index, row);
                  }else{
                    this.editRowIndex =-1;
                  }
                }
            },
            handleInputConfirm(index, row){
              if(!this.editingData.name||this.editingData.name.trim()==""){
                this.$message.error('分组名称不能为空');
                return;
              }
              row.name= this.editingData.name ;
              if(row.id!==0&&row.id){
                row.__status ='update';
              }else{
                row.__status ='add';
              }
              if(this.changedDatas.indexOf(row)==-1){
                this.changedDatas.push(row);
              }
              this.editRowIndex =-1;
              return true;
            },
            handleDelete(index, row) {
              if(row.id!==0&&row.id){
                row.__status = 'delete';
                if(this.changedDatas.indexOf(row)==-1){
                  this.changedDatas.push(row);
                }
              }else{
                this.changedDatas= _.without(this.changedDatas,row);
              }
              this.tableData = _.without(this.tableData,row);
              this.editRowIndex =-1;
            },
            handleAdd(){
              if(this.editRowIndex ==-1){
                var newObj = {name:'',mgrid:1};
                this.tableData.push(newObj);
                var index  = this.tableData.indexOf(newObj);
                this.handleEdit(index, newObj) ;
              }
            },
            handleSave(){
              var self = this;
              if(self.editRowIndex !=-1){
                self.$message.error('请先完成编辑操作');
                return;
              }
              if(self.changedDatas.length<=0){
                self.$message.info('当前数据没有修改，不需要保存');
                return;
              }

              self.$axios.post(self.AppStaticParams.mainUrl+'/group/submit',self.changedDatas)
                .then((res) => {
                    if(res.data.success){
                      self.$message.info('成功更新 '+res.data.list.length+' 条数据');
                    }else{
                      console.log(res.data);
                    }
                    self.getData();
                    self.changedDatas = [];

                })
                .catch((err) => {
                  self.$message.error('保存出错');
                  console.log(err);
                });



            }
        }
    }
</script>

<style>
  .user-icon{
    width: 20px;
  }
.btngroup{
  float: right;
  margin-bottom: 10px;
}
</style>
