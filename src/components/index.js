// 全局注册组件
// 侧边导航/头部用户信息/面包屑
import leftnav from './aside-nav'
import userheader from './user-header'
import bread from './breadcrumb'
export default {
  // 注册全居组件
  install: function (Vue) {
    Vue.component('leftnav', leftnav)
    Vue.component('userheader', userheader)
    Vue.component('bread', bread)
  }
}
