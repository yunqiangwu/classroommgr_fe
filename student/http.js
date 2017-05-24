/**
 * Created by superman on 17/2/16.
 * http配置
 */

import axios from 'axios'
import store from './store'
import * as types from './store/types'
import router from './router'
let qs = require('qs');
import _ from 'underscore';
// axios 配置
axios.defaults.timeout = 5000;
axios.defaults.withCredentials = true;
// axios.defaults.baseURL = 'https://api.github.com';
// axios.defaults.baseURL = AppStaticParams.mainUrl;
// const parseCookie = cookies => {
//     let cookie = ''
//     Object.keys(cookies).forEach(item => {
//         cookie+= item + '=' + cookies[item] + '; '
//     })
//     return cookie
// }


// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.Authorization = `token ${store.state.token}`;
        }

        if (config.method == 'post') {
            if(_.isArray(config.data)){
              config.data = JSON.stringify(config.data);
              config.headers['Content-Type'] = 'application/json;charset=utf-8';
            }else{
              config.data = qs.stringify(config.data);
              config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            }
        }
        // console.log(config);

        // const cookie = parseCookie(window.document.cookie);
        // if(window.document.cookie){
        //   config.headers.cookie = window.document.cookie;
        // }
        return config;
    },
    err => {
        return Promise.reject(err);
    });

// http response 拦截器
axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // 401 清除token信息并跳转到登录页面
                    // store.commit(types.LOGOUT);
                    store.dispatch(types.LOGOUT, true).then(function() {
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath
                            }
                        });
                    }, function(err) {
                        console.log(err);
                        router.replace({
                            path: '/login',
                            query: {
                                redirect: router.currentRoute.fullPath,
                                err: err + ""
                            }
                        });
                    });


            }
        }
        // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
        return Promise.reject(error.response)
    });

export default axios;
