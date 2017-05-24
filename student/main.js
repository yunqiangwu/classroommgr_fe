import Vue from 'vue';
import store from '../src/store';
import "babel-polyfill";
import App from './app';
import MintUI from 'mint-ui';
import router from './router';
import 'mint-ui/lib/style.css';
import ElementUI from 'element-ui';
import Stomp from 'stompjs';
import Sockjs from 'sockjs-client';
import axios from './http';
window.Stomp = Stomp;
window.Sockjs = Sockjs;

Vue.use(MintUI);
Vue.use(ElementUI);

var AppStaticParams = window.AppStaticParams;
Vue.prototype.$axios = axios;
Vue.prototype.AppStaticParams = AppStaticParams;



Vue.prototype.isIPhone = () => {
  return window.navigator.userAgent.indexOf('iPhone') > -1
}
Vue.prototype.isAndroid = () => {
  return window.navigator.userAgent.indexOf('Android') > -1
}


Vue.prototype.loading = text => {
  Vue.prototype._currentLoading = MintUI.Indicator.open({
    text, spinnerType: 'snake'
  })
}
Vue.prototype.loaded = _ => {
  Vue.nextTick(_ => MintUI.Indicator.close())
}

Vue.prototype.$messageBox = MintUI.MessageBox;

Vue.prototype.$message = (message, time = message.length / 4 * 1000) => {
  return MintUI.Toast({
    message: message,
    position: 'bottom',
    duration: time
  })
};

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
    // debugger;
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


});

router.afterEach(() => {
  Vue.prototype.loaded()
});



Vue.mixin({
  created () {
    const events = this.socketEvents
    if (events) {
      Object.keys(events).forEach(k => {
        console.log(k);
        this.$stomp.subscribe(k, events[k].bind(this))
      })
    }
  },
  beforeDestory () {
    const events = this.socketEvents
    // const webroot = '';
    console.log('23232323223232',this.socketEvents);
    var self = this;
    if (events) {
      Object.keys(events).forEach(k => {
        self.$stomp.unsubscribe(k, events[k].bind(self))
      })
      // this.$stomp.unsubscribe();
    }
  },
  filters:{
    json(v,b){
      return JSON.stringify(v,null,b)
    }
  }
});

new Vue({ // eslint-disable-line
  el: '#app',
  router,
  store,
  render: h => h(App)
});

document.addEventListener('touchmove', e => {
  e.preventDefault()
}, false);
