import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission'
import ElementUi from 'element-ui' // 引入ui框架
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/index.less' // 引入自己的css样式
// import axios from 'axios'
// axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 设置请求的基地址
import axios from '@/utils/request.js'
import Components from '@/components' // 引入全局注册的组件
Vue.use(Components)
// 把axios 添加在vue的原型属性上
Vue.prototype.$axios = axios
Vue.use(ElementUi)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
