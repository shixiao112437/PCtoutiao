import vouter from '@/router'
import nprogress from 'nprogress' // 引入进度条包
import 'nprogress/nprogress.css' // 引入进度条样式
// 当路由发生跳转时 有进度条的效果
// 需要在路由的前置守卫beforeEach() 过程中开启 nprpgress.strat()
// 在路由的后置守卫afterEach()过程中 关闭 进度条 nprogress.done()

vouter.beforeEach((to, from, next) => {
  // 开启进度条
  nprogress.start()
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
vouter.afterEach(() => {
  // 关闭进度条
  setTimeout(() => {
    nprogress.done()
  }, 200)
})
