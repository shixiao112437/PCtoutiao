import vouter from '@/router'
vouter.beforeEach((to, from, next) => {
  // to 表示即将进入目标的路由对象
  // from 表示正要离开的路由
  // next: function 一定要调用这个方法来resolve这个钩子.执行效果依赖next()方法的调用参数
  // next()表示放过
  // next(fasle) 表示中断当前的导航
  // next('/xxx') {path: /xxx''} 跳转xxx地址
  //   对要进入主页的路由(包括主页嵌套的路由)进行判断
  if (to.path.startsWith('/home')) {
    //   判断是否含有token
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
    //   this.$router.push('/login') ×××××××××××××××××××××××××
      next('/login')
    }
  } else {
    //   跳过
    next()
  }
})
