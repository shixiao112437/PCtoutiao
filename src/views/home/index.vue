<template>
  <el-container>
    <!-- 侧导航 -->
    <div class="logo"></div>
   <el-aside class="right">
      <!-- menu 可以设置 导航的 background-color
      、text-color和active-text-color
       -->
     <el-menu background-color="#323745" text-color="white" active-text-color="#ffd04b">
       <!-- logo部分 -->
       <div class="logo">
         <img src="../../assets/img/toutiao.png" alt="">
         <h1>黑马程序员</h1>
        </div>
       <el-menu-item>首页</el-menu-item>
       <!-- <el-menu-item>内容管理</el-menu-item> -->
          <!-- 二级导航   submenu -->
          <el-submenu>
            <template slot="title">内容管理</template>
            <!-- 这些应该 是路由 router-link -->
              <el-menu-item>发布文章</el-menu-item>
              <el-menu-item>内容列表</el-menu-item>
              <el-menu-item>评论列表</el-menu-item>
              <el-menu-item>素材管理</el-menu-item>
          </el-submenu>
       <el-menu-item>粉丝管理</el-menu-item>
       <el-menu-item>账户信息</el-menu-item>
     </el-menu>
   </el-aside>

   <el-container>
     <!-- 内容 -->
     <el-header class="top">头部</el-header>
     <!-- 主体 -->
     <el-main class="main">内容</el-main>
   </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.logo{
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #2e2f32;
  h1{
    color:white
  }
}
.right{
  width: 300px;
  background-color: #323745;
  height: 100vh;
}
.top{
  height: 60px;
  background-color: rgb(83, 27, 105)
}
.main{
  // width: 60px;
  // height: 100vh;
  background-color: rgb(185, 255, 127)
}
</style>
