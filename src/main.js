import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './assets/css/base.less'
import api from './api/index'

Vue.config.productionTip = false
Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
