import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import * as types from './types'
// import * as types from './types';
import AppStaticParams from '../../static/AppStaticParams.json';

Vue.use(Vuex);


export default new Vuex.Store({

    // You can use it as state property
    state: {
        username: localStorage.getItem('ms_username'),
        isAuthenticated: localStorage.getItem('authenticated')?true:false,
    },

    // You can use it as a state getter function (probably the best solution)
    getters: {
        isAuthenticated(state) {
            return state.isAuthenticated
        },
        currentUserName(state) {
            return state.username;
        }
    },

    // Mutation for when you use it as state property
    mutations: {
        saveUsername(state, payload) {
            state.username = payload;
        },
        isAuthenticated(state, payload) {
            state.isAuthenticated = payload
        }
    },

    actions: {

        [types.LOGIN] ({
            commit
        }, username) {
            commit('isAuthenticated', true);
            commit('saveUsername', username); // 提交到mutations中处理
            localStorage.setItem('ms_username',username);
            localStorage.setItem('authenticated',''+true);
        },

        [types.LOGOUT]({
            commit
        },isNotLogoutOnServer) {

          if(isNotLogoutOnServer){
            commit('isAuthenticated', false);
            commit('saveUsername', ''); // 提交到mutations中处理
            localStorage.removeItem('ms_username');
            localStorage.removeItem('authenticated');
            return ;
          }
            axios({
                url: AppStaticParams.logoutUrl || "/logout",
                method: 'post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then((res) => {
                commit('isAuthenticated', false);
                commit('saveUsername', ''); // 提交到mutations中处理
                localStorage.removeItem('ms_username');
                localStorage.removeItem('authenticated');
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
