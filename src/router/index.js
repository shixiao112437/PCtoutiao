import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login' // 登录组件
import Home from '@/views/home' // 主页组件
import contentHome from '@/views/home/contentHome.vue'
import addArtic from '@/views/home/addArtic.vue'
import articList from '@/views/home/articList.vue'
import comment from '@/views/home/comment.vue'
import material from '@/views/home/material.vue'
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
    name: 'home',
    children: [
      {
        path: '',
        component: contentHome
      },
      {
        path: '/home/publish/:id?',
        component: addArtic
      },
      {
        path: '/home/articles',
        component: articList
      },
      {
        path: '/home/comment',
        component: comment
      },
      {
        path: '/home/material',
        component: material
      },
      {
        path: 'userInfo',
        component: () => import('@/views/home/userinfo')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
