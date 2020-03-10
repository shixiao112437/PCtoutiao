<template>
<el-card>
  <bread slot="header">
    <template slot="title">
      发布文章
    </template>
     </bread>
    <el-form class="form" ref="publish" label-width="100px" :model="articForm" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="articForm.title" placeholder="请输入标题" style="width:500px"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <!-- <el-input type="textarea" v-model="articForm.content" rows="8"></el-input> -->
        <!-- 富文本域组件的使用 -->
        <quill-editor v-model="articForm.content" style="height:200px"></quill-editor>
      </el-form-item>
      <el-form-item style="margin-top:125px" label="封面" prop="cover">
        <el-radio-group v-model="articForm.cover.type" @change="changeRadio">
          <el-radio :label="1">单图</el-radio>
          <el-radio :label="3">三图</el-radio>
          <el-radio :label="0">无图</el-radio>
          <el-radio :label="-1">自动</el-radio>
        </el-radio-group>
      </el-form-item>
      <cover @selectImg="receive" :list='articForm.cover.images'></cover>
      <!-- <el-dialog :visible="showImg"></el-dialog> -->
      <el-form-item label="频道" prop="currentChannel">
        <el-select v-model="articForm.currentChannel" placeholder="请选择频道">
          <el-option v-for="item in articForm.channels" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>

      </el-form-item>
      <el-form-item label="">
          <el-button @click="publish(false)" type="primary">发布</el-button>
          <el-button @click="publish(true)" type="info">存为草稿</el-button>
      </el-form-item>
    </el-form>

</el-card>
</template>

<script>
export default {
  data () {
    return {
      // 表单蹦定的数据
      articForm: {
        title: '', // 标题
        content: '', // 内容
        channels: [], // 频道类型
        // 封面
        currentChannel: null, // 当前频道
        cover: {
          type: 0, // 封面类型 -1 是自动 0是无图  1 是单图 3 是三图
          images: []
        }
      },
      // 表单验证
      rules: {
        title: [{ required: true, message: '文章标题不能为空', trigger: 'blur' }, {
          min: 5, max: 30, message: '标题应该在5-30字符之间', trigger: 'blur'
        }],
        content: [{ required: true, message: '文章内容不能为空', trigger: 'blur' }],
        currentChannel: [{ required: true, message: '请选择文章类型', trigger: 'blur' }]
      }
      // 图片对话框
      // showImg: false
    }
  },
  methods: {
    // 获取频道类型
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.articForm.channels = res.data.channels
      })
    },
    // 发布文章
    publish (draft) {
      // 手动验证表单数据的格式
      const id = this.$route.params.id
      this.$refs.publish.validate().then(() => {
        this.$axios({
          url: id ? `articles/${id}` : 'articles',
          method: id ? 'put' : 'post',
          params: {
            draft
          },
          data: {
            title: this.articForm.title,
            content: this.articForm.content,
            cover: this.articForm.cover,
            channel_id: this.articForm.currentChannel
          }
        }).then(() => {
          const mes = id ? '修改成功' : '发布成功'
          this.$message.success(mes)
          // 跳转文章列表页面
          this.$router.push('/home/articles')
        })
      }).catch(() => {
        this.$message({
          message: '请核实要发布的文章内容',
          type: 'waring'
        })
      })
    },
    // 获取指定文章 显示在页面上
    edit () {
      const id = this.$route.params.id
      console.log('id', id)
      this.$axios({
        url: `articles/${id}`
        // methods: 'put'
      }).then((res) => {
        // console.log(res)
        this.articForm.title = res.data.title
        this.articForm.content = res.data.content
        this.articForm.cover = res.data.cover
        this.articForm.currentChannel = res.data.channel_id
      })
    },
    // 给据封面类型 控制是否弹出对话框
    changeRadio () {
      if (this.articForm.cover.type === 1) {
        this.articForm.cover.images = [''] // 一张图片
      } else if (this.articForm.cover.type === 3) {
        this.articForm.cover.images = ['', '', ''] // 三张图片
      } else {
        this.articForm.cover.images = [] // 无图片 空数组
      }
    },
    receive (url, index) {
      this.articForm.cover.images.splice(index, 1, url)
      // this.articForm.cover.images[index] = url
    }
  },
  created () {
    this.getChannel()
    const id = this.$route.params.id
    /*   if (id) {
      this.edit()
    } */
    id && this.edit()
  },
  //   当路由地址发生变化时 包含同样的组件 组件(不会被销毁)的数据不会发生改变  该组件不会执行created()函数
  // 需要用watch 来监听 路由的变化
  watch: {
    //   监听谁写谁  监听路由
    // 当路由发生变化时 执行下面的函数
    $route: function (to, from) {
      // alert(1)
      console.log(to)
      console.log(from)
      if (to.params.id) {
        // 获取当前id的数据
        this.edit()
      } else {
        this.articForm = {
          title: '', // 标题
          content: '', // 内容
          channels: [], // 频道类型
          // 封面
          currentChannel: null, // 当前频道
          cover: {
            type: 0, // 封面类型 -1 是自动 0是无图  1 是单图 3 是三图
            images: []
          }
        }
      }
    }
  }

}
</script>

<style scoped>
</style>
