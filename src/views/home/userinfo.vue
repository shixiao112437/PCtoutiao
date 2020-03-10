<template>
  <el-card class="wrap">
      <bread slot="header">
        <template slot="title">账户信息</template>
      </bread>
      <el-form label-width="100px" :model="userData" :rules="rules">
          <el-form-item label="用户名:" prop="name">
              <el-input v-model="userData.name" class="inp"></el-input>
          </el-form-item>
           <el-form-item label="简介:" prop="intro">
              <el-input v-model="userData.intro" class="inp"></el-input>
          </el-form-item>
           <el-form-item label="邮箱" prop="email">
              <el-input v-model="userData.email" class="inp"></el-input>
          </el-form-item>
           <el-form-item  label="手机号">
              <el-input v-model="userData.mobile" class="inp" disabled></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="save">保存</el-button>
          </el-form-item>
      </el-form>
      <div class="photo">
          <img :src="userData.photo" alt="">
          <el-row type="flex" justify="center">
            <el-upload action="" :http-request="editPhoto" :show-file-list="false">
          <el-button type="primary">修改头像</el-button>
          </el-upload>
          </el-row>

      </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      userData: {
        name: '',
        intro: '',
        email: '',
        mobile: '',
        photo: ''

      },
      rules: {
        name: [{ required: true, message: '用户名不能为空', trigger: 'blur' }, { min: 1, max: 7, message: '用户名的长度为1-7位', trigger: 'blur' }],
        email: [{}]
      }
    }
  },
  methods: {
    //   获取信息
    getInfo () {
      this.$axios({
        url: '/user/profile'
        // method: 'patch'
      }).then(res => {
        // debugger
        // console.log(res)
        // alert(1)
        this.userData = res.data
      })
    },
    save () {
      this.$axios({
        url: '/user/profile',
        method: 'patch',
        data: this.userData
      }).then(res => {
        // console.log(res)
        // this.userData = res.data
        this.$message.success('保存成功')
      }).catch(() => {
        this.$message.error('保存失败')
      })
    },
    editPhoto (param) {
      const data = new FormData()
      data.append('photo', param.file)
      this.$axios({
        url: '/user/photo',
        method: 'patch',
        data
      }).then(res => {
        this.userData.photo = res.data.photo
      })
    }

  },
  created () {
    this.getInfo()
  }
}
</script>

<style lang='less' scoped>
.wrap{
    position: relative;
}
.inp{
    width: 40%;
}
.photo{
    width: 300px;
    height: 300px;
    border: 1px solid #cccccc;
    position: absolute;
    top: 50px;
    right: 50px;
    img{
        width: 100%;
        height: 80%;
    }
}

</style>
