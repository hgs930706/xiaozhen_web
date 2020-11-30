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

import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(elementUI)

// 导入axios
import axios from 'axios'
Vue.prototype.$axios = axios;
//默认地址和端口，自行修改。
axios.defaults.baseURL = 'http://localhost:8081'; //本地
//没有此设置，后端无法将数据保存到cookie中
axios.defaults.withCredentials = true;







Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
