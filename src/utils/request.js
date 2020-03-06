import axios from 'axios'
import router from '@/router' // 路由实例对象
import JSONBig from 'json-bigint'
// 先格式化在拦截
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
// 响应拦截
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
// transformRequest:[function(){return}] 允许在向服务器发送请求前修改请求数据   只能用在 put post patch 请求方法中
// 后面的函数必须返回字符串  /ArrayBuffer   /Stream
// axios.defaults.transformRequest = [function (data) {
//   // 可以修改数据
//   return data
// }]

// transformResponse 是在传递给 then/catch 之前 允许修改相应的数据
axios.defaults.transformResponse = [function (data) {
  // json-bigint可以转化一些比较大的数字(超过2的53次方)
  // console.log('id', JSONBig.parse(data))
  // console.log('id', JSONBig.parse(data))

  return data ? JSONBig.parse(data) : {}
}]
export default axios
