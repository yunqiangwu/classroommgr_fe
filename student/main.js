import Vue from 'vue';
import store from '../src/store';
import "babel-polyfill";
import App from './app';
import MintUI from 'mint-ui';
import router from './router';
import 'mint-ui/lib/style.css';
import ElementUI from 'element-ui';


Vue.use(MintUI);
Vue.use(ElementUI);



router.beforeEach((to, from, next) => {
  if(!/\/login/.test(to.path) &&   !store.getters.isAuthenticated){
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


new Vue({ // eslint-disable-line
  el: '#app',
  router,
  store,
  render: h => h(App)
});
