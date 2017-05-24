import Vue from 'vue';
import App from './App';
import store from './store'
// import AppStaticParams from '../static/AppStaticParams';
// import { mapGetters, mapActions } from 'vuex';
import router from './router';
import axios from './http';
import ElementUI from 'element-ui';
import Vuex from 'vuex';
import 'element-ui/lib/theme-default/index.css'; // 默认主题
// import '../static/css/theme-green/index.css';       // 浅绿色主题
import "babel-polyfill";
// import './mock/index.js';
import Stomp from 'stompjs';
import Sockjs from 'sockjs-client';
let  Loading  = ElementUI.Loading;

var AppStaticParams = window.AppStaticParams;
// window.stomp = require('stompjs');
// window.sockjs = require('sockjs-client');

Vue.use(ElementUI);

Vue.prototype.$axios = axios;
Vue.prototype.AppStaticParams = AppStaticParams;

Vue.prototype.isIPhone = () => {
  return window.navigator.userAgent.indexOf('iPhone') > -1
};
Vue.prototype.isAndroid = () => {
  return window.navigator.userAgent.indexOf('Android') > -1
};

Vue.prototype.loading = text => {
  Vue.prototype._currentLoading = Loading.service({
    text, spinnerType: 'snake'
  })
};
Vue.prototype.loaded = _ => {
  Vue.nextTick(_ => Vue.prototype._currentLoading&&Vue.prototype._currentLoading.close())
};
// Vue.prototype.$messageBox = MintUI.MessageBox;

// Vue.prototype.$message = (message, time = message.length / 4 * 1000) => {
//   return MintUI.Toast({
//     message: message,
//     position: 'bottom',
//     duration: time
//   })
// }

router.beforeEach((to, from, next) => {

  if(/\/login/.test(to.path)){
    next();
    return;
  }

  if(!/\/login/.test(to.path) &&  !store.getters.isAuthenticated){
    next({
      path:'/login',
      query: {redirect: to.fullPath}
    });
    return;
  }

  Vue.prototype.loading('连接中...')
  if (!Vue.prototype.$stomp) {
    const $stomp = Stomp.over( new Sockjs(AppStaticParams.mainUrl + '/ws'));
    $stomp.connect({},function(e){
      console.log(e);
      next();
    },function(e){
      alert("与服务器断开连接，请重新登录！");
      console.log(e);
      store.dispatch('logout',true).then(function(res) {
        next('/login');
      });
    });
    Vue.prototype.$stomp = $stomp;
    window.$stomp = $stomp;
  } else {
    next()
  }
})
router.afterEach(() => {
  Vue.prototype.loaded()
});



Vue.mixin({
  created () {
    const events = this.socketEvents
    if (events) {
      Object.keys(events).forEach(k => {
        this.$stomp.subscribe(k, events[k].bind(this))
      })
    }
  },
  beforeDestory () {
    const events = this.socketEvents
    if (events) {
      // Object.keys(events).forEach(k => {
      //   this.$webSocket.off(k, events[k].bind(this))
      // })
      this.$stomp.unsubscribe();
    }
  }
});


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');

document.addEventListener('touchmove', e => {
  e.preventDefault()
}, false);
