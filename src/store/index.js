import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import * as types from './types';
import moment from 'moment';
import _ from 'underscore';
// import * as types from './types';
var AppStaticParams = window.AppStaticParams;

Vue.use(Vuex);


function filterStudentByIds(arr, ids) {
    if (!ids) {
        return arr;
    }
    if (typeof ids == 'string') {
        ids = ids.split(',');
    }

    return arr.filter(function(item) {
        return ids.indexOf(item.id + '') >= 0;
    });


}

export default new Vuex.Store({

    // You can use it as state property
    state: {
        userInfo: {},
        studentGroups: [],
        students: [],
        signRecords: [],

        currentSignRecord: {
            id: '',
            name: '',
            timeSpan: '00:01',
            result: {},
            groupName:'',
            signNum: 0,
            totalNum: 0,
        }
    },

    // You can use it as a state getter function (probably the best solution)
    getters: {
        isAuthenticated(state) {
            return !!state.userInfo.username;
        },
        currentUserName(state) {
            return state.userInfo && state.userInfo.username;
        },
        studentGroups(state) {
            return state.studentGroups;
        }
    },

    // Mutation for when you use it as state property
    mutations: {
        saveUserInfo(state, payload) {
            state.userInfo = payload;
        },
        saveStudentGroups(state, payload) {
            state.studentGroups = payload;
        },
        saveStudents(state, payload) {
            state.students = payload;
        },
        addSigninRecord(state, payload) {
            if(!payload.id){
              return;
            }
            var index = state.signRecords.findIndex(function (item) {
              return item.id ===payload.id;
            });
            if(index == -1){
              state.signRecords.push(payload);
            }else{
              state.signRecords[index] = payload;
            }
            // currentSignRecord
        },
        saveCurrentSignRecord(state, payload) {
            state.currentSignRecord = payload;
        },
        signin(state, payload) {

            if(state.currentSignRecord.result[payload] === 0 || state.currentSignRecord.result[payload] === 2){
              Vue.set(state.currentSignRecord.result, payload, 1);
              // Vue.set(state.students.find(function(item) {
              //     return item.id + '' == payload + '';
              // }), 'signinState', 1);
              state.currentSignRecord.signNum ++;

            }

        }


    },

    actions: {

        [types.FETCH_STUDENT_GROUPS]({
            commit,
            state
        }) {
            if (state.userInfo.username && state.studentGroups.length === 0) {
                return axios.post(AppStaticParams.mainUrl + '/group', {
                    rows: 1000
                }).then(function(res) {
                    commit('saveStudentGroups', res.data.list || []);
                    return res.data.list || [];
                }).catch(err => {
                    return Promise.reject(err);
                });
            } else {
                return state.studentGroups;
            }
        },

        [types.FETCH_STUDENT_BY_IDS]({
            commit,
            state
        }, studentIds) {

            if (state.userInfo.username && state.students.length === 0) {
                return axios.post(AppStaticParams.mainUrl + '/users', {
                    rows: 1000
                }).then(function(res) {
                    commit('saveStudents', res.data.list || []);
                    return filterStudentByIds(res.data.list || [], studentIds);
                }).catch(err => {
                    return Promise.reject(err);
                });
            } else {
                return filterStudentByIds(state.students || [], studentIds);
            }

        },

        [types.LOGIN]({
            commit
        }, userInfo) {
            commit('saveUserInfo', userInfo); // 提交到mutations中处理
        },

        [types.LOGOUT]({
            commit
        }, isNotLogoutOnServer) {

            if (isNotLogoutOnServer) {
                return commit('saveUserInfo', {}); // 提交到mutations中处理
            }
            return axios({
                url: AppStaticParams.mainUrl + "/logout",
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((res) => {
                return commit('saveUserInfo', {}); // 提交到mutations中处理
            }).catch((err) => {
                console.log("Error: " + err);
                return Promise.reject(err);
            });

        },

        [types.START_SIGNIN]({
            commit,
            state
        }, signRecord) {

            if (!signRecord.name) {
                signRecord.name = "签到 - " + moment().format("YYYY-MM-DD HH:mm:ss");
            }
            // if (!signRecord.id) {
            //     signRecord.id = new Date().getTime();
            // }
            signRecord.startTime = new Date();
            filterStudentByIds(state.students || []).forEach((item) => {
                delete item.signinState;
            });


            commit('saveCurrentSignRecord', signRecord);
            return signRecord;

        },

        [types.RESET_SIGNIN]({
            commit,
            state
        }) {
            commit('saveCurrentSignRecord', {
                id: '',
                name: '',
                timeSpan: '00:01',
                result: {},
                groupName:'',
                startTime:new Date(),
                signNum: 0,
                totalNum: 0,
            });
            return state.currentSignRecord;
        },

        [types.FINISH_SIGNIN]({
            commit,
            state
        }) {
            _.forEach( state.currentSignRecord.result,function (value,key,item) {
              if(value===0){
                item[key]=2;
              }
            });
            return state.currentSignRecord;
        },

        [types.SIGNIN]({
            commit,
            state
        }, userid) {
            if (Object.keys(state.currentSignRecord.result).length <= 1) {
                return;
              }
            commit('signin', userid + '');
        },

        [types.SAVE_SIGNIN]({
            commit,
            state
        }){
          if(!state.currentSignRecord.id){
            state.currentSignRecord.id = state.currentSignRecord.startTime.getTime();
            state.currentSignRecord.__status = "add";
          }else{
            state.currentSignRecord.__status = "update";
          }

          var submitData = JSON.parse(JSON.stringify(state.currentSignRecord));
          submitData.result = JSON.stringify(submitData.result);
          return axios.post( AppStaticParams.mainUrl + "/signinrecord/submit",[submitData])
          .then((res) => {
            if (res.data.success) {
                Vue.prototype.$message.info( res.data.message );
            } else {
                console.log(res.data);
            }
            delete state.currentSignRecord.__status;
            return commit('addSigninRecord', state.currentSignRecord);
          }).catch((err) => {
              console.log("Error: " + err);
              return Promise.reject(err);
          });

        }

        // // Perform VueAuthenticate login using Vuex actions
        // login (context, payload) {
        //
        //
        //
        //   context.commit('isAuthenticated', {
        //     isAuthenticated: vueAuth.isAuthenticated()
        //   })
        //
        //   // vueAuth.login(payload.user, payload.requestOptions).then((response) => {
        //   //
        //   // })
        //
        // }
    }
})
