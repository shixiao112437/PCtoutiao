<template>
  <div class="wrap" ref='bgi'>
    <!-- 用ui框架设置登录页面 -->
      <el-button class="btn a" plain @click="open1">换肤</el-button>
      <el-button class="btn b" plain @click="open2">还原</el-button>

 <el-card class="box-card">
  <div slot="header" class="clearfix">
    <img src="../../assets/img/logo_index.png" alt="">
  </div>
  <div>
      <el-form>
           <el-form-item label="">
                <el-input placeholder="请你输入你的账号或手机号"></el-input>
           </el-form-item>
            <el-form-item label="">
                <el-input type="password" placeholder="请你输入你的密码"></el-input>
           </el-form-item>
           <el-form-item label="">
                <el-input style="width:60%" placeholder="请你输入你的验证码"></el-input>
                <el-button style="float:right" type="info" plain>获取验证码</el-button>
           </el-form-item>
           <el-form-item>
                <el-checkbox v-model="checked">我已阅读同意用户协议和隐私条款</el-checkbox>
           </el-form-item>
           <el-form-item>
               <el-button style="width:100%" type="primary">登录</el-button>
           </el-form-item>
      </el-form>

  </div>
</el-card>
  </div>
</template>

<script>
export default {
  methods: {
    open1 () {
      this.$refs.bgi.style.backgroundImage = 'url(http://img1.imgtn.bdimg.com/it/u=3849206785,1625340322&fm=26&gp=0.jpg)'
    },
    open2 () {
      this.$refs.bgi.style.backgroundImage = 'url(' + require('@/assets/img/bg.jpg') + ')'
    }
  }

}
</script>

<style lang="less" scoped>
.wrap{
    width: 100%;
    height: 100vh;
    background-color: aqua;
    display: flex;
    justify-content: center;
    align-items : center;
    background: url('../../assets/img/bg.jpg') no-repeat;
    background-size: cover;
    position: relative;
    .btn{
        position: fixed;
        top: 50%;
    }
    .a{
        left: 20px;
    }
     .b{
        right: 20px;
    }
    .box-card{
        width: 400px;
        height: 400px;
        opacity: .8;
        .clearfix{
            text-align: center;
        }
        img{
            height: 40px;
        }
    }
}

</style>
