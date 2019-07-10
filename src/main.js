import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import './assets/css/base.less'
import api from './api/index'
import {Toast} from 'vant'
import 'vant/lib/index.css';

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.use(Toast)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
