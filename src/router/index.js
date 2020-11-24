/*
 * @Author: ShenYuQiang
 * @Date: 2020-11-21 21:00:57
 * @LastEditors: ShenYuQiang
 * @LastEditTime: 2020-11-22 02:32:13
 * @FilePath: \yishangxiaozhen\src\router\index.js
 */

import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const Home = () => import('../views/home/index')
const Login = () => import('../views/login/index')

const Booking = () => import('../views/bookingManagement')
const Business = () => import('../views/businessManagement')
const Map = () => import('../views/mapManagement')
const Message = () => import('../views/messageManagement')
const Qiye = () => import('../views/qiyeManagement')
const User = () => import('../views/userManagement')

const routes = [
  {
    path: '/',
    redirect: '/home/booking'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/home/booking',
        name: 'Booking',
        component: Booking
      },
      {
        path: '/home/business',
        name: 'Business',
        component: Business
      },
      {
        path: '/home/map',
        name: 'Map',
        component: Map
      },
      {
        path: '/home/qiye',
        name: 'Qiye',
        component: Qiye
      },
      {
        path: '/home/user',
        name: 'User',
        component: User
      },
      {
        path: '/home/message',
        name: 'Message',
        component: Message
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
