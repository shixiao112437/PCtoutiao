<template>
  <el-card>
    <!-- 面包屑导航 -->
    <bread>
      <template slot="title">文章列表</template>
    </bread>
    <!-- form表单 -->
    <el-form>
      <el-form-item label="文章状态">
        <el-radio-group v-model="currentRadio" @change="formChange">
          <el-radio :label="5">全部</el-radio>
          <el-radio :label="0">草稿</el-radio>
          <el-radio :label="1">待审核</el-radio>
          <el-radio :label="2">审核通过</el-radio>
          <el-radio :label="3">审核失败</el-radio>
        </el-radio-group>
        当前文章类型 {{currentRadio}}
      </el-form-item>
      <el-form-item label="频道类型">
        当前频道 {{currentChannel}}
        <el-select v-model="currentChannel" placeholder="请选择频道" @change="formChange">
          <el-option v-for="item in selected" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期范围">
        <el-date-picker
          v-model="timeRange"
          type="datetimerange"
          value-format="yyyy-MM-dd"
          size="small"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          popper-class="timeRnge"
          @change="formChange"
        ></el-date-picker>
      </el-form-item>
      {{timeRange}}
    </el-form>
    <!-- 文章列表 -->
    <div class="articItem" v-for="item in articList" :key="item.id.toString()">
      <div class="left">
        <div class="img">
          <img :src="item.cover.images[0]?item.cover.images[0]:defaultImage" alt />
        </div>
        <div class="info">
          <p>{{item.title}}</p>
          <el-tag
            style="width: 60px;text-align: center;"
            :type="item.status | tagType"
          >{{item.status | status }}</el-tag>
          <p>{{item.pubdate}}</p>
        </div>
      </div>
      <div @click="editArtic(item.id.toString())" class="right">
        <el-button type="text" style="color:black;">
          <i class="el-icon-edit"></i> 修改
        </el-button>
        <el-button @click="delArtic(item.id.toString())" type="text" style="color:black;">
          <i class="el-icon-delete" ></i> 删除
        </el-button>
      </div>
    </div>
    <!-- 分页功能 -->
    <el-row type="flex" justify="center">
      <el-pagination
        layout="prev, pager,next"
        :total="page.total"
        :current-page="page.currentPage"
        :page-size="page.pagesize"
        background
        @current-change="pageChange"
      ></el-pagination>
    </el-row>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      // 本地资源 加载
      defaultImage: require('@/assets/img/IMG.jpg'), // 默认图片
      articList: [], // 文章列表
      currentRadio: 5, // 当前文章类型
      selected: [], // 下拉列表 频道列表
      currentChannel: null, // 当前下拉项
      timeRange: '', // 所选择的时间
      // ================================= >上面是表单绑定的数据 下面是记录分页的数据
      page: {
        currentPage: 1,
        total: 0,
        pagesize: 10
      }
    }
  },
  methods: {
    // 获取频道列表
    getChannel () {
      this.$axios({
        url: '/channels'
      }).then(res => {
        this.selected = res.data.channels
      })
    },
    // 获取所有文章列表
    getshow () {
      this.$axios({
        url: '/articles',
        params: {
          // response_type: 'comment', // 获取的内容类型 比传
          // page: this.currentPage,
          // per_page: this.per_page // 获取那一页的数据 默认值为第一页
        }
      }).then(res => {
        // console.log(res)
        this.articList = res.data.results
        this.page.total = res.data.total_count
      })
    },
    // 当表单值发生变化时获取文章列表
    getFormArtic () {
      this.$axios({
        url: '/articles',
        params: {
          status: this.currentRadio === 5 ? null : this.currentRadio, // 文章类型 5位全部类型=>不同用传参数
          channel_id: this.currentChannel, // 文章频道
          // 返回的时间是一个数组 [开始,结束]
          begin_pubdate: this.timeRange.length > 0 ? this.timeRange[0] : null, // 若果大于0说明有值  不筛选时间是可以不传
          end_pubdate: this.timeRange.length > 1 ? this.timeRange[1] : null,
          page: this.page.currentPage, // 页数
          per_page: this.page.pagesize // 每页数量
        }
      }).then(res => {
        this.articList = res.data.results
        // this.page.currentPage = res.data.page
        this.page.total = res.data.total_count
        // this.$message.success('111')
        // this.page.pagesize = res.data.per_page
      }).catch(() => {
        this.$message.error('请求失败')
      })
    },
    // 表单条件变化时
    formChange () {
      this.page.currentPage = 1 // 当刷选条件发生变化时 让当前页为第一页
      this.getFormArtic()
    },
    // 当前页发生变化时重新加载数据
    pageChange (pager) {
      this.page.currentPage = pager
      this.getFormArtic()
    },
    // 删除文章
    delArtic (id) {
      this.$confirm('是否删除').then(() => {
        this.$axios({
          url: `articles/${id}`,
          method: 'delete'
        }).then(res => {
          this.$message('删除成功')
          this.pageChange(this.page.currentPage)// 重新加载数据  得保存 当前页码 和表单的筛选条件
        })
      })
    },
    // 编辑文章
    editArtic (id) {
      // 路由传参
      this.$router.push(`/home/publish/${id}`)
    }

  },
  // 生命周期
  created () {
    this.getshow()
    this.getChannel()
  },
  // 过滤器
  filters: {
    status (value) {
      switch (value) {
        case 0:
          return '草稿'
        case 1:
          return '待审核'
        case 2:
          return '已发表'
        case 3:
          return '审核失败'

        default:
          break
      }
    },
    tagType (value) {
      switch (value) {
        case 0:
          return 'waring'
        case 1:
          return 'info'
        case 2:
          return 'success'
        case 3:
          return 'danger'

        default:
          break
      }
    }
  }

}
</script>

<style lang='less' scoped>
.articItem {
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
  border-bottom: 2px solid #aaaaaa;
  height: 150px;
  // height: 220px;
  .left {
    // width: 50%;
    display: flex;
    justify-content: space-between;
    .img {
      width: 200px;
      // height: 100px;
      // border: 1px solid #cccccc;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      padding-left: 30px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 150px;
      // border: 1px solid #cccccc;
    }
  }
}
.timeRnge {
  height: 100px;
}
</style>
