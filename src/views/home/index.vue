<template>
  <el-container>
   <el-aside class="right">
      <!-- 放侧导航 -->
      <asidenav></asidenav>
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
export default {
  components: {
    asidenav,
    userheader
  }

}
</script>

<style lang="less" scoped>
.right{
  background-color: #323745
}
</style>
