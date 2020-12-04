/*
 * @Author: ShenYuQiang
 * @Date: 2020-11-21 21:00:57
 * @LastEditors: ShenYuQiang
 * @LastEditTime: 2020-11-21 22:22:52
 * @FilePath: \yishangxiaozhen\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import elementUI, { Alert } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(elementUI)

// Vue.prototype.$host = 'http://192.168.31.27:8081';

// 导入axios
import axios from 'axios'
Vue.prototype.$axios = axios;
//没有此设置，后端无法将数据保存到cookie中
axios.defaults.withCredentials = true;
//默认地址和端口，自行修改。
// axios.defaults.baseURL = 'http://localhost:8081'; //本地
// axios.defaults.baseURL = 'http://192.168.31.27:8081'; //本地
axios.defaults.baseURL = 'http://47.105.143.238:8081'; //测试

//给所有请求添加请求头
axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem('authorization');
  if (token) {
    config.headers['Authorization'] = token;
  }
  return config;
})

//处理所有响应信息
axios.interceptors.response.use(response => {
  return response;
}, error => {  
 
  let result = error.response;
  switch (result.status) {
    case 403:
      if ("Forbidden" === result.data) {
        elementUI.Message.warning("页面权限被禁止");
      } else {
        elementUI.Message.warning("登录已过期，请重新登录");
         //清理缓存
         localStorage.clear();
        // 拒绝访问，请重新登录               
        router.push("/login");
      }
      break;
    default:
      console.log("错误状态码："+result.status);
  }
  console.log('错误消息:' + JSON.stringify(result));
  return result;
})

//导入echarts
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
