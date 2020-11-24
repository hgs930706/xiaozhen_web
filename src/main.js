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

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
