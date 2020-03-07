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
      <!-- 全部页面  -->
      <el-tab-pane label="全部" name="all" class="allimg">
          <el-card padding='0px' class="all" v-for="(item,index) in list" :key="item.id">
            <img :src="item.url" alt @click="showImg(index)"/>
            <!-- 按钮 -->
            <el-row type="flex" justify="space-around" style="margin-top:20px;">
              <i :style="{color:item.is_collected?'red':'black'}" @click='changeCollect(item)' class='el-icon-star-on'></i>
              <i @click='delimg(item)' class='el-icon-delete-solid'></i>
            </el-row>
          </el-card>
      </el-tab-pane>
    <!-- 收藏页面 -->
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
    <!-- 对话框 -->
    <el-dialog :visible='dialogShow' title="图片展示" center @close='dialogShow = false' @opened='openEnd'>
        <!-- 里面是幻灯片 -->
        <el-carousel ref="myCarousel"  :autoplay='false'>
          <el-carousel-item v-for="item in list" :key='item.id'>
            <img class="showImg" :src="item.url" alt="">
          </el-carousel-item>
        </el-carousel>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      activeName: 'all', // tab栏
      list: [], // 素材
      currentPage: 1, // 当前页
      per_page: 6, // 每页数量
      totalImg: 0, // 总素材
      dialogShow: false,
      imgIndex: -1 // 点击当前图片的索引
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
    },
    // 改变图片的收藏状态
    changeCollect (item) {
      // 先获取当前图片的id
      const id = item.id
      // 获取收藏图片的收藏状态
      const collect = !item.is_collected // 对图片的收藏状态
      const mes = collect ? '收藏成功' : '取消收藏'
      this.$axios({
        method: 'put',
        url: `/user/images/${id}`,
        data: {
          collect
        }
      }).then(() => {
        // alert(1)
        this.getshow()
        this.$message.success(mes)
      })
    },
    // 删除图片
    delimg (item) {
      const id = item.id
      this.$confirm('是否删除图片').then(() => {
        this.$axios({
          url: `/user/images/${id}`,
          method: 'delete'
        }).then(() => {
          this.getshow()
          this.$message.success('删除成功')
        }).catch(() => {
          this.$message.error('删除失败')
        })
      })
    },
    // 点击图片展示图片
    showImg (index) {
      this.dialogShow = true
      // 获取点击图片的index
      this.imgIndex = index
    },
    openEnd () {
      // 这个时候已经打开结束 ref已经有值 可以通过ref进行设置了
      this.$refs.myCarousel.setActiveItem(this.imgIndex) // 尝试通过这种方式设置index
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
  // align-content: space-around;
  flex-wrap:wrap;
  padding: 0;
  margin-bottom: 5px;
  .all {
  width: 300px;
  height: 230px;
  margin: 20px 10px;
  position: relative;
}
i{
  font-size: 20px;
}
}
.showImg{
  width: 100%;
  height: 80%;
}
</style>
