import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/scss/reset.scss';

//第三方包
//elementui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// area-data
import VueAreaLinkage from 'vue-area-linkage';
import 'vue-area-linkage/dist/index.css'; 
Vue.use(VueAreaLinkage);

//路由拦截
router.beforeEach((to,from,next) => {
  store.commit('getToken')
  let token = store.state.user.token
  if(!token && to.name !== 'login'){
    next({name:'login'})
  }else{
    next()
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
