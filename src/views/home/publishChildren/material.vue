<template>
  <el-tabs v-model="currentTab">
    <el-tab-pane class="material" label="素材库" name="materials">
      <div>
        <el-card class="img-item" v-for="(item,index) in imgList" :key="index">
          <img :src="item.url" @click="transmit(item.url)" alt />
        </el-card>
      </div>
      <br />
      <el-row class="page" type="flex" justify="center">
        <el-pagination
          background
          layout="prev,pager,next"
          :total="page.total"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          @current-change="changePage"
        ></el-pagination>
      </el-row>
    </el-tab-pane>
    <el-tab-pane label="上传素材" name="upload">
      <el-row type="flex" justify="center" >
        <el-upload action :http-request="uploadImg">
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-row>
    </el-tab-pane>
  </el-tabs>
</template>

<script>
export default {
  data () {
    return {
      currentTab: 'materials',
      imgList: [], // 素材列表
      page: {
        currentPage: 1, // 第几页
        pageSize: 6, // 每页多少条
        total: 0 // 总条数
      }
    }
  },
  methods: {
    //   获取素材
    getMaterial () {
      this.$axios({
        url: '/user/images',
        params: {
          collect: false, // 查询全部的素材 所以这里给一个false
          page: this.page.currentPage, // 当前页码
          per_page: this.page.pageSize // 每页多少条
        }
      }).then(res => {
        this.imgList = res.data.results
        this.page.total = res.data.total_count // 将总数赋值给页码变量
      })
    },
    // 分页
    changePage (newPage) {
      this.page.currentPage = newPage // 赋值新页码
      this.getMaterial() // 重新获取数据
    },
    // 点击图片 给福组件传值 自定义事件
    transmit (url) {
      this.$emit('selectImg', url) // 通过自定事件 将url传给父组件
    },
    // 上传图片
    uploadImg (img) {
    //   alert(1)log
      console.log('sssssssssssssss', img)
      const data = new FormData()
      data.append('image', img.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        data
      }).then(res => {
        this.$emit('selectImg', res.data.rul)
      }).catch(() => {
        this.$message.error('上传失败重新上传')
      })
    }
  },
  created () {
    this.getMaterial()
  }
}
</script>

<style lang='less' scoped>
.material div {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  position: relative;
  //   padding-bottom: 80px;
  .img-item {
    width: 200px;
    height: 200px;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .page {
    margin-top: 20px;
    // position: absolute;
    // bottom: -10px;
  }
}
i {
  display: inline-block;
  padding: 40px;
  border: 2px dashed #cccccc;
  font-size: 30px;
}
</style>
