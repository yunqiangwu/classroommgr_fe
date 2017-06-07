import Vue from 'vue';
import Router from 'vue-router';


Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            redirect: '/index'
        },
        {
            path: '/index',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            children:[
              {
                  path: '/signin',
                  alias: '/',
                  component: resolve => require(['../components/pages/Signin.vue'], resolve),
              },
              {
                  path: '/grouptalk',
                  component: resolve => require(['../components/pages/talk/GroupTalk.vue'], resolve),
              },
              {
                  path: '/mycenter',
                  component: resolve => require(['../components/pages/MyCenter.vue'], resolve),
              },
              
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/pages/login/Login.vue'], resolve)
        },
    ]
})
