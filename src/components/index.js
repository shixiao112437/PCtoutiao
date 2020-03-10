// 全局注册组件
// 侧边导航/头部用户信息/面包屑
import leftnav from './aside-nav'
import userheader from './user-header'
import bread from './breadcrumb'
import VueQuillEditor from 'vue-quill-editor' // y引入富文本域组件
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import cover from '@/views/home/publishChildren/cover.vue'
import material from '@/views/home/publishChildren/material'
export default {
  // 注册全居组件
  install: function (Vue) {
    Vue.component('leftnav', leftnav)
    Vue.component('userheader', userheader)
    Vue.component('bread', bread)
    Vue.component('cover', cover)
    Vue.component('material', material)
    Vue.use(VueQuillEditor)
  }
}
