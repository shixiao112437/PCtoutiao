<template>
  <!-- menu 可以设置 导航的 background-color、text-color和active-text-color-->
  <!-- 如果导航中需要用到vue-router  可以给el-menu 设置 :router:true -->
  <el-menu :router="true" class="right" background-color="#323745" text-color="white" active-text-color="#ffd04b" :unique-opened="true">
    <!-- logo部分 -->
    <div class="logo">
      <img src="../assets/img/toutiao.png" alt />
      <h1>黑马程序员</h1>
    </div>
    <el-menu-item index="/home">
      <i class="el-icon-menu"></i>
      <span>首页</span>
    </el-menu-item>
    <!-- <el-menu-item>内容管理</el-menu-item> -->
    <!-- 二级导航   submenu -->
    <el-submenu index="1">
      <template slot="title">
        <!-- 字体图标 -->
        <i class="el-icon-reading"></i>
        <span>内容管理</span>
      </template>
      <!-- 这些应该 是路由 router-link -->
      <el-menu-item index="/home/publish">发布文章</el-menu-item>
      <el-menu-item index="/home/articles">内容列表</el-menu-item>
      <el-menu-item index="/home/comment">评论列表</el-menu-item>
      <el-menu-item index="/home/material">素材管理</el-menu-item>
    </el-submenu>
    <!-- 二级导航 -->
    <el-submenu index='2'>
      <template slot="title">
        <i class="el-icon-star-off"></i>
        <span>粉丝管理</span>
      </template>
    <el-menu-item>图文数据</el-menu-item>
    <el-menu-item>粉丝概况</el-menu-item>
    <el-menu-item>粉丝画像</el-menu-item>
    <el-menu-item>粉丝列表</el-menu-item>
    </el-submenu>
    <el-menu-item>
      <i class="el-icon-user-solid"></i>
      <span>账户信息</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.right {
  width: 300px;
  background-color: #323745;
  min-height: 100vh;
  .logo {
    height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #2e2f32;
    h1 {
      color: white;
    }
  }
}
</style>
