import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import * as types from './types'
// import * as types from './types';

Vue.use(Vuex);


export default new Vuex.Store({

    // You can use it as state property
    state: {
        userInfo:{},
    },

    // You can use it as a state getter function (probably the best solution)
    getters: {
        isAuthenticated(state) {
            return !!state.userInfo.username;
        },
        currentUserName(state) {
            return state.userInfo&&state.userInfo.username;
        }
    },

    // Mutation for when you use it as state property
    mutations: {
        saveUserInfo(state, payload) {
            state.userInfo = payload;
        }
    },

    actions: {

        [types.LOGIN] ({
            commit
        }, userInfo) {
            commit('saveUserInfo', userInfo); // 提交到mutations中处理
        },

        [types.LOGOUT]({
            commit
        },isNotLogoutOnServer) {

          if(isNotLogoutOnServer){
            commit('saveUserInfo', {}); // 提交到mutations中处理
            return ;
          }
            return axios({
                url: AppStaticParams.mainUrl + "/logout",
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((res) => {
                commit('saveUsername', res.data.userInfo); // 提交到mutations中处理
                return res.message;
            }).catch((err) => {
                console.log("Error: " + err);
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
