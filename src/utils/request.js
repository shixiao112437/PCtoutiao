import axios from 'axios'
import router from '@/router' // 路由实例对象

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// axios的拦截语法中参数是两个函数 第一个成功时执行 第二个失败时执行
// config 是请求信息
// 请求拦截
axios.interceptors.request.use(function (config) {
  console.log('这是此次请求的config', config)
  const token = window.localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}` // 统一设置token
  return config
}, function (error) {
  return Promise.reject(error) // 失败时reject(error)会直接进入axios catch中
})

axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (error) {
  console.log('这是返回的错误对象', error)

  if (error.response.status === 401) {
    // 说明token失效 需要清除token 并重新设置(在登录页面)
    localStorage.removeItem('user-token')
    // 需要让路由跳转到登录 得先引入路由
    router.push('/login')
  }
  return Promise.reject(error)
})

export default axios
