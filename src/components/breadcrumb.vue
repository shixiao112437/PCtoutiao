<template>
  <!-- separator可以设置分隔符 -->
  <el-breadcrumb separator=">">
    <el-breadcrumb-item to="/home" style=" font-weight: 900;">首页</el-breadcrumb-item>
    <el-breadcrumb-item>
      <!-- 可以在组件标签中动态设置内容 -->
      <slot name="title"></slot>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {}
</script>

<style>
</style>
