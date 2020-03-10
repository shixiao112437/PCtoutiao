<template>
  <div class="wrap" ref="bgi">
    <!-- 用ui框架设置登录页面 -->
    <el-button class="btn a" plain @click="open1"> &lt; </el-button>
    <el-button class="btn b" plain @click="open2"> &gt; </el-button>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <img src="../../assets/img/logo_index.png" alt />
      </div>
      <div>
        <!-- 将表达那数据绑定在 表单el-form 的model的属性上 -->
        <el-form :model="loginFormData" :rules="loginRules" ref="loginForm">
          <!-- 设置Form-Item 的prop属性:需要校验的字段名 -->
          <el-form-item  prop="mobile">
            <!-- 双向绑定数据 -->
            <el-input placeholder="请你输入你的账号或手机号" v-model="loginFormData.mobile"></el-input>
          </el-form-item>

          <el-form-item label="" prop="pwd">
            <el-input type="password" placeholder="请你输入你的密码" v-model="loginFormData.pwd"></el-input>
          </el-form-item>

          <el-form-item  prop="code">
            <el-input style="width:60%" placeholder="请你输入你的验证码" v-model="loginFormData.code"></el-input>
            <el-button style="float:right" type="info" plain>获取验证码</el-button>
          </el-form-item>

          <el-form-item prop="checked">
            <el-checkbox v-model="loginFormData.checked">我已阅读同意用户协议和隐私条款</el-checkbox>
          </el-form-item>
          <el-form-item>
            <el-button style="width:100%" type="primary" @click="login('loginForm')">登录</el-button>
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
      this.$refs.bgi.style.backgroundImage =
        'url(' + require('@/assets/img/login_bg.jpg') + ')'
    },
    open2 () {
      this.$refs.bgi.style.backgroundImage =
        'url(' + require('@/assets/img/bg.jpg') + ')'
    },
    // 定义一个验证表单数据的方法
    login (b) {
      // 验证通过会进入then中 之后发送请求 判断输入
      this.$refs[b].validate().then(() => {
        this.$axios({
          url: '/authorizations', // 请求地址
          // params: {}  // get 请求行的参数
          data: this.loginFormData,
          method: 'post'
        }).then(res => {
          console.log(res.data)
          // 获取token 存起来
          window.localStorage.setItem('user-token', res.data.token)
          // 然后跳转主页
          this.$router.push('/home')
        }).catch(() => {
        // alert('密码错误')
          this.$message({
            message: '请你输入正确的密码',
            type: 'error',
            duration: '2000',
            center: true,
            showClose: true
          })
        })
      })
    }
  },
  data () {
    return {
      // 定义表单数据
      loginFormData: {
        mobile: '',
        pwd: '',
        code: '',
        checked: false
      },
      // 定义在验证规则  rilues:{'字段名':[规则1,规则2]}
      loginRules: {
        // 手机号格式
        mobile: [{ required: true, message: '手机号不能为空', trigger: 'blur' }, // 规则1内容不能为空,
          { pattern: /1[3-9]\d{9}$/, message: '你输入的手机号位数不对', trigger: 'blur' }
        ],
        // 密码格式
        pwd: [{ required: false }],
        // 验证码格式
        code: [{ required: true, message: '验证码输入错误', trigger: 'blur' }, {
          pattern: /\d{6}$/,
          message: '验证码格式不对',
          trigger: 'blur'
        }],
        // 是否勾选条款
        checked: [{
          // requred 不能检测ture/fasle 所以只能使用validator(自定义校验函数)
          validator (rules, value, callback) {
            value ? callback() : callback(new Error('你必须同意条款'))
          }
        }]
      }
    }
  }
}
</script>

<style lang="less" scoped>
.wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &::before {
    width: 100%;
    height: 100%;
    position: absolute;
    background: url("../../assets/img/bg.jpg") no-repeat;
    background-size: cover;
    content: "";
    filter: blur(4px)
  }
  .btn {
    position: fixed;
    top: 50%;
  }
  .a {
    left: 20px;
  }
  .b {
    right: 20px;
  }
  .box-card {
    width: 400px;
    height: 400px;
    z-index: 2;
    // opacity: 0.8;
    .clearfix {
      text-align: center;
    }
    img {
      height: 40px;
    }
  }
}
</style>
