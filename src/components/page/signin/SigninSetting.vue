<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item><i class="el-icon-date"></i> 签到</el-breadcrumb-item>
            <el-breadcrumb-item>签到设置</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <el-form v-show="signinState!=1" ref="form" :model="form" label-width="80px">
        <el-row>
            <el-col :span="12">

                <el-form-item label="选择分组">
                    <el-select v-model="currentSelectGroupId" @change="handerChangeGroup" placeholder="请选择分组">
                        <el-option v-for="item in studentGroupList" :key="item.id" :label="item.name" :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>

            </el-col>
            <el-col :span="12">

                <el-form-item label="活动名称">
                    <el-input type="text" v-model="form.name"></el-input>
                </el-form-item>

            </el-col>
        </el-row>


        <el-row>
            <el-col :span="12">
                <el-form-item label="签到时长">
                    <el-time-select v-model="form.timeSpan" :clearable="false" :picker-options="{
                  start: '00:00',
                  step: '00:01',
                  end: '18:30'
                }" placeholder="选择时长">
                    </el-time-select>
                </el-form-item>
            </el-col>
            <el-col :span="12">
            </el-col>
        </el-row>
    </el-form>
    <div ref="controlDiv">

        <el-row>

            <el-col :span="12" style="text-align:center;">
                <el-row>
                    <el-col :span="6">
                        <span>{{message}}</span>
                        <zk-time-down style="display:inline-block" ref="timer" @time-process="(v)=>this.timeProgress=v" @time-end="finishSignin()" :timeSpan='form.timeSpan | convertSeconds'></zk-time-down>
                    </el-col>

                    <el-col :span="18">
                        <span>时间：</span>
                        <el-progress :width="50" type="circle" :percentage="timeProgress"></el-progress>
                        <span>&nbsp;&nbsp;&nbsp;签到：</span>
                        <el-progress :width="50" type="circle" :percentage="signinProgress"></el-progress>
                    </el-col>
                </el-row>


            </el-col>
            <el-col :span="12">
                <transition-group name="el-zoom-in-center">
                    <el-button key="startSignin" icon="start" size="large" v-show="signinState == 0" type="primary" @click="startSignin()">开启签到</el-button>
                    <el-button key="cancleSignin" icon="start" size="large" v-show="signinState == 1" type="success" @click="cancleSignin()">取消签到</el-button>
                    <el-button key="reSignin" icon="start" size="large" v-show="signinState == 3" type="success" @click="reSignin()">从新开始</el-button>
                    <el-button key="reSignin" icon="start" size="large" v-show="signinState == 3" type="success" @click="syncSignin()">保存签到记录</el-button>
                    <el-button key="forcefinsh" icon="start" size="large" v-show="signinState == 1" type="warning" @click="forceFinshSignin">提前结束签到</el-button>
                    <div style="display:inline-block;" key="isshow2wm" v-show="signinState == 1">
                        <span>&nbsp;&nbsp;二维码：</span>
                        <el-switch :width="80" v-model="isShow2wm" on-text="显示" off-text="不显示" on-color="#13ce66" off-color="#ff4949">
                        </el-switch>
                    </div>
                </transition-group>
            </el-col>
        </el-row>
    </div>
    <transition name="el-zoom-in-center">
        <vue-q-art ref="erwm" v-show="isShow2wm" class="erwm" :config="qConfig" :downloadButton="false"></vue-q-art>
    </transition>
    <signin-student-list @click-student="signin" :student-list="currentStudents" :signin-states="form.result" class="m-student-list" ref="studentList">
    </signin-student-list>
</div>
</template>
<script>
import * as types from 'src/store/types';
import zkTimeDown from './Timer.vue';
import SigninStudentList from './SigninStudentList.vue';
import VueQArt from 'vue-qart'
export default {

    components: {
        zkTimeDown,
        SigninStudentList,
        VueQArt
    },
    created() {
        var self = this;
        this.$store.dispatch(types.FETCH_STUDENT_GROUPS).then(sgs => {
            self.studentGroupList = sgs;
            if (sgs.length > 0) {
                self.currentSelectGroupId = sgs[0].id;
            }
        });

    },
    data: function() {
        var self = this;
        return {
            socketEvents: {
                '/topic/getSigninMsg': function(frame) {
                    var username = frame.headers.username;
                    if (!username) {
                        return;
                    }
                    var uid = self.currentStudents.find(function(item) {
                        return item.username === username
                    })['id'];

                    if (self.signinState == 1) {
                        self.$stomp.send(`/user/${username}/receiveSiginMsg`, {
                            signinState: self.signinState,
                            mSigninState: self.form.result['' + uid]
                        }, JSON.stringify(self.form));
                    } else {
                        self.$stomp.send(`/user/${username}/noSigin`, {
                            signinState: self.signinState
                        });
                    }
                },
                '/topic/doSignin': function(frame) {
                    if (self.signinState != 1) {
                        return;
                    }
                    var username = frame.headers.username;
                    var uid = self.currentStudents.find(function(item) {
                        return item.username === username
                    })['id'];
                    if (!uid) {
                        return;
                    }
                    self.$store.dispatch(types.SIGNIN, uid).then(function() {
                        self.$stomp.send(`/user/${username}/finishSigninMsg`, {
                            signinState: self.signinState,
                            mSigninState: 1
                        }, JSON.stringify(self.form));
                    });
                }
            },

            qConfig: {
                value: this.AppStaticParams.studentUrl,
                imagePath: '/static/img/img2.jpg',
                filter: 'color',
                size: 400,
            },
            form: {
                id: '',
                name: '',
                groupName: '',
                timeSpan: '00:59',
                result: {}, // 0 暂未签到   1 已经签到  2 未到  3 请假
                noSignNum: 0,
                signNum: 0,
                totalNum: 0,
            },
            studentGroupList: [],
            currentSelectGroupId: '',
            currentStudents: [],
            message: '倒计时:',
            signinState: 0, // 0 未开始签到   1 正在进行签到  2 签到结束
            isShow2wm: false,
            timeProgress: 0,
        }
    },

    filters: {
        convertSeconds(timeSpanStr) {
            let [h, m] = timeSpanStr.split(':');
            return (parseInt(h) * 60 + parseInt(m)) * 60;
        },
    },
    watch: {
        signinProgress(value) {
            if (value === 100) {
                var self = this;
                this.$nextTick(() => {
                    self.$refs.timer.finsh();
                });
            }
        },
        signinState(value) {
            var self = this;
            if (value !== 1) {
                self.isShow2wm = false;
            }
            this.$nextTick(() => {
                var formEl = self.$refs.controlDiv;
                var studentDiv = self.$refs.studentList.$el;
                studentDiv.style.top = (formEl.offsetTop + formEl.offsetHeight) + 'px';
                self.$refs.erwm.$el.style.top = (formEl.offsetTop + formEl.offsetHeight) + 'px';
            });
        },
        isShow2wm(v) {
            var self = this;
            this.$nextTick(() => {
                var studentDiv = self.$refs.studentList.$el;
                if (v) {
                    studentDiv.style.left = (studentDiv.offsetHeight + 8) + 'px';
                    self.$refs.erwm.$el.style.width = (studentDiv.offsetHeight - 20) + 'px';
                    self.qConfig.size = studentDiv.offsetHeight - 10;
                } else {
                    studentDiv.style.left = "10px";
                }

            });
        }
    },
    computed: {
        signinProgress() {
            return Math.round(100 * (this.form.signNum / (this.form.totalNum || 1)));

        }
    },
    methods: {
        signin(userid) {
            this.$store.dispatch('signin', userid);
        },

        // 开始签到
        startSignin() {
            var self = this;
            if (!this.currentSelectGroupId) {
                this.$message.error('请选择签到分组！');
                return;
            }


            this.signinState = -1;
            self.loading('连接中...');
            var groupName = self.studentGroupList.find(item => item.id === this.currentSelectGroupId).name;
            self.form.groupName = groupName;

            self.currentStudents.forEach(function(item) {
                self.$set(self.form.result, '' + item.id, 0);
            });
            self.form.totalNum = self.currentStudents.length;
            self.$store.dispatch(types.START_SIGNIN, self.form).then((signRecord) => {
                self.form = signRecord;
                self.$message.success('启动签到！');
                self.$refs.timer.start();
                self.signinState = 1;
                self.qConfig.value = this.AppStaticParams.studentUrl + "/signin?signinid=" + signRecord.startTime.getTime();
                self.$stomp.send('/topic/beginSigninMsg', {
                    signinState: self.signinState
                }, JSON.stringify(signRecord));
                self.isShow2wm = true;
                self.loaded();
            });

        },

        cancleSignin() {
            this.$message.success('取消签到！');
            this.$refs.timer.reset();
            this.signinState = 0;
        },

        reSignin() {
            var self = this;
            this.signinState = -1;
            self.$store.dispatch(types.RESET_SIGNIN).then((resetSignin) => {
                self.form = resetSignin;
                self.$refs.timer.reset();
                self.signinState = 0;
            });
        },

        forceFinshSignin() {
            this.$refs.timer.finsh();

        },
        finishSignin() {
            var self = this;
            self.loading('连接中...');
            self.signinState = -1;
            self.$store.dispatch(types.FINISH_SIGNIN).then((saveedRecord) => {
                self.form = saveedRecord;
                self.signinState = 3;
                self.$message.success('签到活动结束！');
                self.loaded();
                this.$stomp.send('/topic/stopSigninMsg', {
                    signinState: self.signinState
                }, JSON.stringify(saveedRecord));
            });
        },
        handerChangeGroup() {
            console.log(this.studentGroupList, this.currentSelectGroupId);
            let self = this;

            var studentIds = self.studentGroupList.find(item => item.id === this.currentSelectGroupId).studentIds;

            this.$store.dispatch(types.FETCH_STUDENT_BY_IDS, studentIds).then(students => {
                self.currentStudents = students;
            });

        },
        syncSignin() {
            var self = this;
            self.loading('连接中...');
            self.signinState = -1;
            this.$store.dispatch(types.SAVE_SIGNIN).then(() => {
                self.signinState = 3;
                self.loaded();
            });
        }
    }
}
</script>

<style>
.erwm {
    position: absolute;
    margin-top: 10px;
    box-shadow: rgba(0, 0, 0, 0.3) 3px 5px 12px 2px;
    /*right: 13px;*/
    width: 200px;
    top: 234px;
    left: 10px;
    background: gray;
    bottom: 20px;
}

.erwm>div {
    width: 100%;
    height: 100%;
}

.erwm>div>canvas {
    width: 100%;
}

.m-student-list {
    right: 13px;
    left: 10px;
    bottom: 20px;
    top: 234px;
    transition: all .2s ease-in-out;
    position: absolute;
}
</style>
