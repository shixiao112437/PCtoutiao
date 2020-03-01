import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUi from 'element-ui' // 引入ui框架
import 'element-ui/lib/theme-chalk/index.css'
import '@/style/index.less' // 引入自己的css样式
Vue.use(ElementUi)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
