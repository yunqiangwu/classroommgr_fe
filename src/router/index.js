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
                  path: '/question',
                  component: resolve => require(['../components/page/question/Question.vue'], resolve)

                },
                {
                  path: '/signinrecord',
                  component: resolve => require(['../components/page/signin/SigninRecord.vue'], resolve)

                },
                {
                    path: '/readme',
                    alias: '/',
                    component: resolve => require(['../components/page/Index.vue'], resolve)
                },
                {
                  path: '/signinsetting',
                  component: resolve => require(['../components/page/signin/SigninSetting.vue'], resolve),
                },
                {
                  path: '/startsignin',
                  component: resolve => require(['../components/page/Readme.vue'], resolve),
                },
                {
                    path: '/studentmgr',
                    component: resolve => require(['../components/page/studentmgr/StudentMgr.vue'], resolve)
                },
                {
                    path: '/groupmgr',
                    component: resolve => require(['../components/page/studentmgr/GroupMgr.vue'], resolve)
                },
                {
                    path: '/studentgroup',
                    component: resolve => require(['../components/page/studentmgr/StudentGroup.vue'], resolve)
                },
                // studentgroup
                // {
                //     path: '/vuetable',
                //     component: resolve => require(['../components/page/VueTable.vue'], resolve)     // vue-datasource组件
                // },
                {
                    path: '/baseform',
                    component: resolve => require(['../components/page/BaseForm.vue'], resolve)
                },
                {
                    path: '/vueeditor',
                    component: resolve => require(['../components/page/VueEditor.vue'], resolve)    // Vue-Quill-Editor组件
                },
                {
                    path: '/markdown',
                    component: resolve => require(['../components/page/Markdown.vue'], resolve)     // Vue-Quill-Editor组件
                },
                {
                    path: '/upload',
                    component: resolve => require(['../components/page/Upload.vue'], resolve)       // Vue-Core-Image-Upload组件
                },
                {
                    path: '/basecharts',
                    component: resolve => require(['../components/page/BaseCharts.vue'], resolve)   // vue-echarts-v3组件
                },
                {
                    path: '/mixcharts',
                    component: resolve => require(['../components/page/MixCharts.vue'], resolve)    // vue-echarts-v3组件
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
    ]
})
