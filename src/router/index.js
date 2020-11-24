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


const Page = () => import('../views/home/indexPage')
const Home = () => import('../views/home/menu')

const Login = () => import('../views/login/index')

const Booking = () => import('../views/bookingManagement')
// 默认index.vue
const Business = () => import('../views/businessManagement')
const Activity = () => import('../views/businessManagement/activityManager')
const Meeting = () => import('../views/businessManagement/meetingManager')

const Map = () => import('../views/mapManagement')

const Message = () => import('../views/messageManagement')
const Action = () => import('../views/messageManagement/msgAction')
const Temp = () => import('../views/messageManagement/msgTemp')
const Feedback = () => import('../views/messageManagement/feedback')



const Qiye = () => import('../views/qiyeManagement')
const User = () => import('../views/userManagement')

const routes = [
  {
    path: '/',
    redirect: '/home/page'
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/home/page',
        name: 'Page',
        component: Page
      },
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
        path: '/home/business/activity',
        name: 'Activity',
        component: Activity
      },
      {
        path: '/home/business/meeting',
        name: 'Meeting',
        component: Meeting
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
      },
      {
        path: '/home/message/action',
        name: 'Action',
        component: Action
      },
      {
        path: '/home/message/temp',
        name: 'Temp',
        component: Temp
      },
      {
        path: '/home/message/feedback',
        name: 'Feedback',
        component: Feedback
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
