import axios from 'axios'
import router from '../router'
import { Toast } from 'vant'

let count = 0, // 计算请求次数 控制loading关闭时间
  toast
let timer = null;
// http请求拦截器
axios.interceptors.request.use(config => {
  return config
}, error => {
  // store.dispatch('closeLoading')
  Toast('请求超时')
  return Promise.reject(error)
})

// http相应拦截器
axios.interceptors.response.use((res) => {
  return res.data || res
}, error => {
  Toast('服务器请求异常')
  return Promise.reject(error)
})

//测试环境
let BASEURL = 'http://dev.collectivedynamic.com';
//线上环境
if (location.host == 'sx-wechat.ingtube.com') {
  BASEURL = 'https://app.yingtu.co';
}

if (location.href.indexOf('sx-wechat-test.ingtube.com') != -1) {
  document.title = "【测试】联盟后台(微信)"
}
export function post(path, data) {
  let url = BASEURL + path;
  let req = {
    source: 'web',
    sid: localStorage.getItem('sid') || '',
    user_id: localStorage.getItem('user_id') || '0',//登录id
    data: data || {}
  };
  return axios.post(url, req);
}
// errorCode == 1002 登录过期
export default {
  // 注册/登录
  login(data){
    return post('/v2/phone/login', data)
  },
  // 获取测评列表
  getProductionAppraisal(data){
    return post('/v2/star/production/appraisal', data)
  }
}

