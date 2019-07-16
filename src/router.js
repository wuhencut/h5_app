import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    name: 'login',
    component: () => import('./views/Login.vue')
  },{
    path: '/productDetail',
    name: 'productDetail',
    component: () => import('./views/ProductDetail.vue')
  },{
    path: '/reviews',
    name: 'reviews',
    component: () => import('./views/Reviews.vue')
  },{
    path: '/order',
    name: 'order',
    component: () => import('./views/Order.vue')
  },{
    path: '/addressList',
    name: 'addressList',
    component: () => import('./views/AddressList.vue')
  },{
    path: '/addAddress',
    name: 'addAddress',
    component: () => import('./views/AddAddress.vue')
  }]
})
