<template>
  <!-- 栅格布局 -->
  <el-row class="top" type="flse" align="miidle" style="padding:0;">
    <!-- 左边 -->
    <el-col class="right" :span="12">
      <i @click="changeIcon" :class="iconClass? 'el-icon-s-fold':'el-icon-s-unfold'"></i> &nbsp; &nbsp;&nbsp;
      <span>江苏传智播客教育科技股份有限公司</span>
    </el-col>
    <!-- 右边 -->
    <el-col :span="12" style="margin:0;padding:0;">
      <el-row type="flex" justify="space-around" align="bottom">
        <el-input v-model="searchComment" style="width:200px" prefix-icon="el-icon-search" size="mini"  type="text" placeholder="请输入搜索的文章内容" />
        <span>消息</span>
        <!-- 用户头像 -->
        <img style="width:40px;height:40px; border-radius:50%;" :src="userInfo.photo" alt />
        <!-- 下拉菜单 -->
        <!-- 点击 下拉菜单项触发不同的事件  (指令事件)-->
        <el-dropdown @command='userAction'>
          <!-- 用户昵称 -->
          <span>{{userInfo.name}}</span>
          <i class="el-icon-arrow-down el-icon--right"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="git">git地址</el-dropdown-item>
            <el-dropdown-item command="quit">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import eventBus from '@/utils/eventBus'
export default {
  methods: {
    // 点击图片 切换图标
    changeIcon () {
      this.iconClass = !this.iconClass
      // 触发自定义事件
      eventBus.$emit('fold')
    },
    // 指令事件 commant 表示菜单项的command属性
    userAction (commant) {
      if (commant === 'info') {
        //  表示用户点击的是个人信息
      } else if (commant === 'git') {
        //  表示用户点击的是git
        window.location.href = ''
      } else {
        //  表示用户点击的是退出
        // 1.清除token (存于localStorage)  然后跳转登录页面用练市
        localStorage.removeItem('user-token')
        this.$router.push('/login')
      }
    },
    getInfo () {
      // const token = window.localStorage.getItem('user-token')
      this.$axios({
        url: '/user/profile',
        method: 'get'
        /*        headers: {
          Authorization: `Bearer ${token}`
        } */ // 在请求拦截出已经设置了token
      }).then(res => {
        this.userInfo = res.data
      })
    }
  },
  created () {
    // 页面刚加载时发送请求获取用户的信息并选在页面
    // 获取token
    this.getInfo()
    eventBus.$on('update', () => {
      // alert(1)
      this.getInfo()
    })
  },
  data () {
    return {
      // 用户的基本信息
      userInfo: {},
      searchComment: '',
      iconClass: true
    }
  }
}
</script>

<style lang='less' scoped>
.top {
  height: 60px;
  //   background-color: rgb(83, 27, 105);
  .right {
    height: 100%;
    display: flex;
    //   justify-content: space-between;
    align-items: center;
    font-size: 18px;
    i {
      font-size: 20px;
    }
  }
  input{
    height: 30px;
  }
}
</style>
