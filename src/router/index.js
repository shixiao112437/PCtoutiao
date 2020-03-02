import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login' // 登录组件
import Home from '@/views/home' // 主页组件
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login,
    name: 'login'

  },
  {
    path: '/home',
    component: Home,
    name: 'home'
  }
]

const router = new VueRouter({
  routes
})

export default router
