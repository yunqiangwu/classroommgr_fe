

<template>
<div class="table">
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-menu"></i>学生</el-breadcrumb-item>
            <el-breadcrumb-item>学生分组</el-breadcrumb-item>
        </el-breadcrumb>
    </div>


     <el-transfer v-model="currentTransValue" :filterable="true" :titles="['所有学生', '分组学生']" :button-texts="['从分组移除','添加到分组']" :data="currentTransferData"></el-transfer>

     <el-button-group class="btngroup2">

       <el-select v-model="currentEditGroupId" @change="handerChangeGroup"  placeholder="请选择编辑的分组">
       <el-option
         v-for="item in studentGroupList"
         :key="item.id"
         :label="item.name"
         :value="item.id">
       </el-option>
     </el-select>

         <!-- <el-button icon="plus" type="primary" @click="handleAdd()">新增学生</el-button> -->
         <el-badge :is-dot="isUnsave" class="item">
             <el-button icon="upload" type="success" @click="handleSave()">保存修改</el-button>
         </el-badge>
         <!-- <el-button  icon="delete"  type="danger">批量删除</el-button> -->
     </el-button-group>

</div>
</template>

<script>
import _ from 'underscore';


function findItemByid(arr, id) {
    return arr.find(item => item.id == id);
}


export default {
    data() {


        return {
          currentEditGroupId:'',
          studentGroupList:[],
          studentList:[],
            groupChangedDatas: [],
            studentChangedDatas:[],
            currentTransferData: [],
            currentTransValue: []

        }
    },
    computed:{
      isUnsave: function () {
        return (this.currentEditGroupId && this.currentTransValue.join(',') != (findItemByid(this.studentGroupList,this.currentEditGroupId).studentIds||''));
      }
    },
    created() {
      var self = this;
      this.$axios.post('/api/group',{rows:1000}).then(function (res) {
        // if(res.data.success){
          if(res.data.list.length<=0){
            self.$router.push('/studentmgr');
            return;
          }
          self.studentGroupList = res.data.list;
          self.currentEditGroupId=self.studentGroupList[0].id;
          self.getData();
          // }else{
        //   self.$message.error(res);
        //   console.log(res);
        // }
      }).catch(err=>console.log(err));
    },
    methods: {

        getData() {
            let self = this;
            this.$axios.post('/api/users', {
                rows: 333,
                mgrid: 1
            }).then((res) => {
                self.studentList = res.data.list;
                var data = [];
                self.studentList.forEach((student, index) => {
                  data.push({
                    label: student.realname,
                    key: student.id,
                    // pinyin: pinyin[index]
                  });
                });
                self.currentTransferData = data;

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
            data.groupIds = data.groupIds ? data.groupIds.split(',') : [];


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
                        self.tableData[self.editRowIndex].groupIds = self.editingData.groupIds.join(',');
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
                    groupIds: []
                };
                this.editingData = newObj;
                this.dialogFormVisible = true;
            }
        },
        handerChangeGroup(){
          var self = this;
          if(self.currentEditGroupId==-1){
            return;
          }
          var strStrudentIds =  findItemByid(self.studentGroupList,self.currentEditGroupId).studentIds||'';
          if(strStrudentIds){
            self.currentTransValue = strStrudentIds.split(',').map(item=>+item);
          }else{
            self.currentTransValue=[];
          }

        },
        handleSave() {
            var self = this;

            if (!self.isUnsave) {
                self.$message.info('当前数据没有修改，不需要保存');
                return;
            }
            var data =  findItemByid(self.studentGroupList,self.currentEditGroupId);
            data.studentIds = self.currentTransValue.join(',');
            self.$axios.post(self.AppStaticParams.mainUrl + '/group/save', data)
                .then((res) => {
                    if (res.data.success) {
                        self.$message.info(res.data.msg);
                    } else {
                        console.log(res.data);
                    }
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

.btngroup2 {
    /*float: right;*/
    margin-top: 10px;
}
</style>
