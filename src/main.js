import Vue from 'vue';
import App from './App';
import store from './store'
import AppStaticParams from '../static/AppStaticParams.json';
// import { mapGetters, mapActions } from 'vuex';
import router from './router';
import axios from './http';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import 'element-ui/lib/theme-default/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
import './mock/index.js';

Vue.use(ElementUI);

Vue.prototype.$axios = axios;
Vue.prototype.AppStaticParams = AppStaticParams;

router.beforeEach((to, from, next) => {
  if(!/\/login/.test(to.path) &&  !store.getters.isAuthenticated){
    // console.log(this.isAuthenticated);
    // if(this.$store.)
    next({
      path:'/login',
      query: {redirect: to.fullPath}
    });
    return;
  }
  next();
})
new Vue({
    // created (){
    //   if(!/\/login/.test(this.$router.currentRoute.path) &&  !this.isAuthenticated){
    //     // console.log(this.isAuthenticated);
    //     // if(this.$store.)
    //     this.$router.push('/login');
    //
    //   }
    //   // console.log(this.isAuthenticated);
    //   // console.log(this.$router);
    // },

    computed: {
      isAuthenticated: function () {
        return this.$store.getters.isAuthenticated;
      }
    },
    store,
    router,
    render: h => h(App)
}).$mount('#app');




window.stomp = require('stompjs');
window.sockjs = require('sockjs-client');
