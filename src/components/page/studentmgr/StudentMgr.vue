<template>
<div class="table">
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-menu"></i>学生</el-breadcrumb-item>
            <el-breadcrumb-item>学生管理</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-button-group class="btngroup">
        <el-button icon="plus" type="primary" @click="handleAdd()">新增学生</el-button>
        <el-badge :value="changedDatas.length" class="item">
            <el-button icon="upload" type="success" @click="handleSave()">保存修改</el-button>
        </el-badge>
        <!-- <el-button  icon="delete"  type="danger">批量删除</el-button> -->
    </el-button-group>
    <el-table :data="tableData" border style="width: 100%">
        <el-table-column label="头像" width="100">
            <template scope="scope">
                  <img class="user-icon" :src="scope.row.logo">
              </template>
        </el-table-column>
        <el-table-column prop="username" label="账号" sortable width="175">
        </el-table-column>
        <el-table-column prop="realname" label="姓名" width="125">
        </el-table-column>
        <el-table-column prop="qq" label="QQ" width="180">
        </el-table-column>
        <el-table-column label="所属分组">

            <template scope="scope">
                  <el-tag type="primary" :type="item.type" :key="item.id" v-for="item in getGroupListById(scope.row.id)" >{{item.name}}</el-tag>
                    <!-- <img class="user-icon" :src="scope.row.logo"> -->
            </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
            <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
        </el-table-column>
    </el-table>




    <el-dialog size="large" title="编辑学生信息" :visible.sync="dialogFormVisible">
        <el-form ref="editForm" :model="editingData" :rules="rules" label-width="80px">
          <el-row>
            <el-col :span="11">
              <el-form-item label="学号" prop="username">
                  <el-input v-model="editingData.username"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="姓名" prop="realname">
                  <el-input v-model="editingData.realname"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="邮箱" prop="email">
                  <el-input v-model="editingData.email"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2"></el-col>
            <el-col :span="11">
              <el-form-item label="电话" prop="tel">
                  <el-input v-model="editingData.tel"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="11">
              <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="editingData.password"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="line" :span="2"></el-col>
            <el-col :span="11">
              <el-form-item :label="(editingData.enabled==0?'禁用':'启用')" prop="enabled">
                  <el-switch
                    v-model="editingData.enabled"
                    on-color="#13ce66"
                    off-color="#ff4949"
                    on-value="1"
                    off-value="0">
                  </el-switch>
              </el-form-item>
            </el-col>
          </el-row>

            <!-- <el-form-item label="分组">
                <el-select v-model="editingData.groupIds" placeholder="请选择学生分组" multiple>
                    <el-option label="教育技术1班" value="1"></el-option>
                    <el-option label="教育技术2班" value="2"></el-option>
                </el-select>
            </el-form-item> -->
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handleCancleEdit">取 消</el-button>
            <el-button type="primary" @click="handleFromConfirm()">确 定</el-button>
        </div>
    </el-dialog>






    <div class="pagination">
        <el-pagination :page-size="pageSize" @current-change="handleCurrentChange" layout="prev, pager, next" :total="total">
        </el-pagination>
    </div>
</div>
</template>

<script>
import _ from 'underscore';
import {Random} from 'mockjs';

function findItemByid(arr, id) {
    return arr.find(item => item.id == id);
}


export default {
    data() {
        var self = this;
        var checkUsername = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('账号不能为空'));
            }
            if ((value + '').length != 12 || !/\d+/.test(value)) {
                return callback(new Error('请输入12全数字'));
            }
            // if(self.editRowIndex == -1){
            //    this.$axios.post('/api/group',{rows:1000}).then(function (res){
            //
            //    }
            //
            //    return callback();
            // }else{
            //
            //
            //
            // }
            //
            callback();
        };
        return {
          studentGroupList:[],
            tableData: [],
            cur_page: 1,
            pageSize: 9,
            total: 1000,
            editRowIndex: -1,
            changedDatas: [],
            editingData: {
                username: '',
                // id: '' ,
                // groupIds: []
            },
            dialogFormVisible: false,
            rules: {
                username: [
                    // { required: true, message: '请输入账号', trigger: 'blur' },
                    // { min: 12, max: 12, message: '长度为 12 个字符', trigger: 'blur' },
                    {
                        validator: checkUsername,
                        trigger: 'blur'
                    }
                ],
                // region: [
                //   { required: true, message: '请选择活动区域', trigger: 'change' }
                // ],
                // date1: [
                //   { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
                // ],
                // date2: [
                //   { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
                // ],
                // type: [
                //   { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
                // ],
                // resource: [
                //   { required: true, message: '请选择活动资源', trigger: 'change' }
                // ],
                // desc: [
                //   { required: true, message: '请填写活动形式', trigger: 'blur' }
                // ]
            }
        }
    },
    created() {
      var self = this;
      this.$axios.post('/api/group',{rows:1000}).then(function (res) {
        // if(res.data.success){
        res.data.list.forEach(item=>item.type=self.getRandomType());
          self.studentGroupList = res.data.list;
          self.getData();
        // }else{
        //   self.$message.error(res);
        //   console.log(res);
        // }
      }).catch(err=>console.log(err));
    },
    methods: {
        getRandomType(){
          return ['primary','success','warning'][Math.floor(Math.random()*3)];
        },
        getGroupListById(id){
          return this.studentGroupList.filter(function (item) {
            if(!item.studentIds){
              return false;
            }
            return item.studentIds.split(',').indexOf(id+'')>=0;
          });
        },
        handleCurrentChange(val) {
            this.cur_page = val;
            this.getData();
        },
        getData() {
            let self = this;
            this.$axios.post(this.AppStaticParams.mainUrl + '/api/users', {
                page: self.cur_page,
                rows: self.pageSize,
                mgrid: 1
            }).then((res) => {
                self.tableData = res.data.list;
                self.total = res.data.total;
                // self.
            })
        },
        formatter(row, column) {
            return row.address;
        },
        filterTag(value, row) {
            return row.tag === value;
        },
        handleEdit(index, row) {
            // this.$message('编辑第'+(index+1)+'行');
            var data = _.extend({}, row);
            // data.groupIds = data.groupIds ? data.groupIds.split(',') : [];

            data.enabled = data.enabled+'';
            // console.log(this.editingData);
            this.dialogFormVisible = true;
            this.editingData = data;

            this.editRowIndex = index;
        },
        handleCancleEdit() {
            this.editRowIndex = -1;
            this.dialogFormVisible = false;
        },
        // findIndexById
        handleFromConfirm() {
            var self = this;

            this.$refs['editForm'].validate((valid) => {
                if (valid) {
                    if (self.editRowIndex !== -1) {
                        if (!self.editingData.__status) {
                            self.editingData.__status = "update";
                            self.changedDatas.push(self.editingData);
                        }
                        console.log(self.editRowIndex, self.editingData);
                        _.extend(self.tableData[self.editRowIndex], _.clone(self.editingData));
                        // self.tableData[self.editRowIndex].groupIds = self.editingData.groupIds.join(',');
                        // self.changedDatas.push(self.editingData);
                    } else {
                        self.editingData.__status = 'add';
                        self.tableData.push(self.editingData);
                        self.changedDatas.push(self.editingData);
                    }
                    this.editRowIndex = -1;
                    self.dialogFormVisible = false;
                    return true;
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });

            // if(!this.editingData.name||this.editingData.name.trim()==""){
            //   this.$message.error('分组名称不能为空');
            //   return;
            // }
            // row.name= this.editingData.name ;
            // if(row.id!==0&&row.id){
            //   row.__status ='update';
            // }else{
            //   row.__status ='add';
            // }
            // if(this.changedDatas.indexOf(row)==-1){
            //   this.changedDatas.push(row);
            // }

        },
        handleDelete(index, row) {
            if (row.id !== 0 && row.id) {
                row.__status = 'delete';
                if (this.changedDatas.indexOf(row) == -1) {
                    this.changedDatas.push(row);
                }
            } else {
                this.changedDatas = _.without(this.changedDatas, row);
            }
            this.tableData = _.without(this.tableData, row);
            this.editRowIndex = -1;
        },
        handleAdd() {
            if (this.editRowIndex == -1) {
                var newObj = {
                    mgrid:1,
                    // groupIds: []
                };
                this.editingData = newObj;
                this.dialogFormVisible = true;
            }
        },
        handleSave() {
            var self = this;

            if (self.changedDatas.length <= 0) {
                self.$message.info('当前数据没有修改，不需要保存');
                return;
            }

            self.$axios.post(self.AppStaticParams.mainUrl + '/api/users/submit', self.changedDatas)
                .then((res) => {
                    if (res.data.success) {
                        self.$message.info('成功更新 ' + res.data.list.length + ' 条数据');
                    } else {
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
.user-icon {
    width: 20px;
}

.btngroup {
    float: right;
    margin-bottom: 10px;
}
</style>
