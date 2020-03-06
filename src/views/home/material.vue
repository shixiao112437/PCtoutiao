<template>
  <el-card>
    <!-- 面包屑 -->
    <bread slot="header">
      <template slot="title">素材</template>
    </bread>
    <!-- 上传图片
    multiple 多选
    -->
    <el-upload action="" multiple :http-request='uploadImg' :show-file-list='false'>
      <el-button type="success">点击上传</el-button>
    </el-upload>
    <!-- tab栏 -->
    <el-tabs v-model="activeName" @tab-click='clickTab'>
      <el-tab-pane label="全部" name="all" class="allimg">
          <el-card padding='0px' class="all" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
            <!-- 按钮 -->
            <el-row type="flex" justify="center">
               <i class='el-icon-star-on'></i>
              <i class='el-icon-delete-solid'></i>
            </el-row>
          </el-card>
      </el-tab-pane>
      <el-tab-pane class="allimg" label="收藏" name="collect">
        <el-card class="all" v-for="item in list" :key="item.id">
            <img :src="item.url" alt />
        </el-card> <!-- 按钮 -->
      </el-tab-pane>
    </el-tabs>
    <!-- 分页部分 -->
    <el-row style="height:60px;" type="flex" justify="center" align="bottom" >
      <el-pagination layout="prev, pager, next" background :total="totalImg" :page-size="per_page" :current-page="currentPage" @current-change="clickPager">
      </el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // tab栏
      list: [], // 素材
      currentPage: 1, // 当前页
      per_page: 10, // 每页数量
      totalImg: 0 // 总素材

    }
  },
  methods: {
    // 获取素材
    getshow () {
      this.$axios({
        url: '/user/images',
        params: {
          // collect: false, // 获取的是全部的数据
          // 当在全部页面是activeName是all 表达式不成立为fasle 获取的全部素材
          // 在收藏页面是 表达式成立 为true  获取的是收藏素材
          collect: this.activeName !== 'all',
          page: this.currentPage,
          per_page: this.per_page
        }
      }).then(res => {
        console.log(res)
        this.totalImg = res.data.total_count
        this.list = res.data.results
      }).catch(() => {
        this.$message.error('获取素材失败')
      })
    },
    // 分页点击
    clickPager (pager) {
      this.currentPage = pager
      this.getshow()
    },
    // tab点击
    clickTab () {
      this.currentPage = 1
      this.getshow()
    },
    // 上传图片
    uploadImg (params) {
      console.log(params)
      // 获取文件
      const data = new FormData()
      data.append('image', params.file)
      this.$axios({
        url: '/user/images',
        method: 'post',
        /*   headers: {
          Content-Type: 'multipart/form-data'
        } */
        data
        /*    data: {
          image: params.file
        } */

      }).then(res => {
        console.log(res)
        this.$message.success('上传成功')
        this.getshow()
      }).catch(() => {
        this.$message.error('上传失败')
      })
    }

  },
  created () {
    this.getshow()
  }
}
</script>

<style lang='less' scoped>
   img {
    width: 100%;
    height: 150px;
    margin-top: -10px;
  }
.allimg{
  display: flex;
  justify-content: space-around;
  align-content: space-around;
  flex-wrap:wrap;
  padding: 0;
  margin-bottom: 5px;
  .all {
  width: 200px;
  height: 190px;

}
}
</style>
