<template>
  <div>
    <el-card v-loading="loading" class="card" style="padding:0px;">
      <!-- 面包导航为卡片的标题 -->
      <bread slot="header">
        <template slot="title">评论</template>
      </bread>
      <!-- 下面的数据表格  data后面是要渲染的数据 stripe条纹(true/false) broder边框
      当表格太宽太高时 可以设置height:xxxpx, flex:(true/false/left/right)
      -->
      <el-table v-loading="loading" :data="commentList" :stripe="true" border height="420px" :row-style="{height:3+'px'}"
       :cell-style="{padding:3+'px'}">
        <!-- el-table-column表示一列 prop 是数组中对象字段名  label是每列的标头 width可以设置宽度

        -->
        <el-table-column width="500px" label="标题" prop="title"></el-table-column>
        <!-- 平评论状态是布尔值 需要用formatter对其进行转换 -->
        <el-table-column label="评论状态" prop="comment_status" :formatter="formatterBoolean"></el-table-column>
        <el-table-column label="总评论数" prop="total_comment_count"></el-table-column>
        <el-table-column label="粉丝评论数" prop="fans_comment_count"></el-table-column>

          <el-table-column label="操作">
              <template slot-scope="obj">
            <!-- 里面是两个超链接  也可以el-button 文字按钮 -->
            <el-button type="text">修改</el-button>
            <!-- <el-button type="text">{{ obj.row}}</el-button> -->
            <el-button :data-id="obj.row.id" @click="switchComment(obj.row)" type="text">{{obj.row.comment_status?'关闭':'打开'}}评论</el-button>
               </template>
          </el-table-column>

      </el-table>
      <!-- 分页布局 -->
      <el-row style="height:60px;margin-top:24px;" type="flex" justify="center" align="middle">
        <el-pagination layout="prev, pager, next" background :total="totlaComment" :page-size="per_page" :current-page="currentPage" :pager-count='5'
        @current-change="clickPager" >
          <!-- 分页介绍
          background 背景色
          total 总数
          page-size 每业条数
          current-page 当前页数
          -->
        </el-pagination>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import bread from '@/components/breadcrumb'
export default {
  components: {
    bread
  },
  data () {
    return {
      // 评论列表
      commentList: [],
      // 分页的一些信息
      /* page: {
        currentPage: 1
      } */
      currentPage: 1,
      per_page: 10,
      totlaComment: 0,
      loading: false // 遮罩层
    }
  },
  methods: {
    // 获取评论列表
    getshow () {
      // 发送axios请求获取评论
      this.loading = true // 打开遮罩层
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment', // 获取的内容类型 比传
          page: this.currentPage,
          per_page: this.per_page // 获取那一页的数据 默认值为第一页
        }
      }).then(res => {
        console.log('评论数据')
        console.log(res)
        this.commentList = res.data.results
        this.totlaComment = res.data.total_count
        this.loading = false // 关闭遮罩层
      }).catch(() => {
        alert(1)
        this.loading = false // 关闭遮罩层
      })
    },
    // 转换布尔值格式化 roe col index 都是对象
    formatterBoolean (row, col, cell, index) {
      // row = JSON.stringify(row)
      // col = JSON.stringify(col)
      // cell = JSON.stringify(cell)
      // index = JSON.stringify(index)
      // return `列${row}
      // 行${col}
      // 当前数据是${cell}
      // 第${row}行`
      // row 是当前行的数据
      // col是当前列的数据
      // cell是当前单元格的数据
      // index是索引
      return cell ? '正常' : '关闭'
    },
    // 操作评论状态
    switchComment (row) {
      const mess = row.comment_status ? '关闭' : '打开'

      /*   if (confirm(`是否${mess}评论`)) {

      } else {

      } */
      // $confirm 是以Promise 来处理后续响应 确定进入then()取消 进入(catch)
      this.$confirm(`是否${mess}评论`, '操作评论', {
        confirmButtonText: mess,
        cancleButtonText: '取消',
        type: 'waring'
      }).then(() => {
        // 发送请求
        // debugger
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: {
            article_id: row.id.toString() // 文章id
          },
          data: {
            allow_comment: !row.comment_status
          }

        }).then((res) => {
          console.log(res)
          this.$message.success(`${mess}成功`)
          this.getshow()
        }).catch(() => {
          this.$message.error(`${mess}失败`)
        })
      })
    },
    // 点击页码事件  pager是当前的页码数
    clickPager (pager) {
      this.currentPage = pager // 改变获取的页码数 重新获取
      this.getshow()
    }
  },
  created () {
    this.getshow()
  }
}
</script>

<style lang='less' scoped>
// 卡片高度
// .card{
//   height: calc(100vh - 50px);
// }
</style>
