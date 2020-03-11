<template>
  <el-container>
   <el-aside :style="{width: fold?'50px':'300px'}" style="transition:all 0.5s;background-color:#323745">
      <!-- 放侧导航 -->
      <asidenav :fold='fold'></asidenav>
   </el-aside>

   <el-container>
     <!-- 放头部 和 路由容器-->

     <el-header>
       <userheader></userheader>
     </el-header>
     <!-- 主体 -->
     <el-main style="padding:0;">
       <router-view></router-view>
     </el-main>
   </el-container>
  </el-container>
</template>

<script>
import asidenav from '@/components/aside-nav.vue' // 引入导航模块
import userheader from '@/components/user-header.vue' // 引入导航模块
import eventBus from '@/utils/eventBus'

export default {
  components: {
    asidenav,
    userheader
  },
  data () {
    return {
      fold: false // 记录是否折叠
    }
  },
  created () {
    eventBus.$on('fold', () => {
      // alert(1)
      this.fold = !this.fold
    })
  }

}
</script>

<style lang="less" scoped>

</style>
