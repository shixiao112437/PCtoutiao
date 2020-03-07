<template>
  <el-card>
    <!-- 面包屑导航 -->
    <bread>
      <template slot="title">文章列表</template>
    </bread>
    <!-- form表单 -->
    <el-form>
      <el-form-item label="文章状态">
        <el-radio-group v-model="currentRadio">
          <el-radio :label="0">全部</el-radio>
          <el-radio :label="1">草稿</el-radio>
          <el-radio :label="2">待审核</el-radio>
          <el-radio :label="3">审核通过</el-radio>
          <el-radio :label="4">审核失败</el-radio>
        </el-radio-group>
        当前文章类型 {{currentRadio}}
      </el-form-item>
      <el-form-item label="频道类型">
        当前频道 {{currentChannel}}
        <el-select v-model="currentChannel" placeholder="请选择频道">
          <el-option  v-for="item in selected" :key="item.id" :label="item.name" :value="item.id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="日期范围">
        <el-date-picker
        v-model="timeRange"
          type="datetimerange"
          size="small"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          popper-class='timeRnge'
        ></el-date-picker>
      </el-form-item>
     当前时间范围 {{timeRange}}
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
            :type="item.status | tagType">
            {{item.status | status }}
            </el-tag>
          <p>{{item.pubdate}}</p>
        </div>
      </div>
      <div class="right">
        <el-button type="text" style="color:black;">
          <i class="el-icon-edit"></i> 修改
        </el-button>
        <el-button type="text" style="color:black;">
          <i class="el-icon-delete"></i> 删除
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      defaultImage: require('@/assets/img/IMG.jpg'), // 默认图片
      articList: [], // 文章列表
      currentRadio: 0, // 当前文章类型
      selected: [], // 下拉列表 频道列表
      currentChannel: 5, // 当前下拉项
      timeRange: '' // 所选择的时间

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
    // 获取文章列表
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
      })
    }
  },
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
  // height: 220px;
  .left {
    // width: 50%;
    display: flex;
    justify-content: space-between;
    .img {
      width: 200px;
      // height: 180px;
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
      // border: 1px solid #cccccc;
    }
  }
}
.timeRnge{
  height: 100px;
}
</style>
