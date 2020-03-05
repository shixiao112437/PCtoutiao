<template>
  <div>
    <el-card style="padding:0px;">
      <!-- 面包导航为卡片的标题 -->
      <bread slot="header">
        <template slot="title">评论</template>
      </bread>
      <!-- 下面的数据表格  data后面是要渲染的数据 stripe条纹(true/fasle) broder边框
      当表格太宽太高时 可以设置height:xxxpx, flex:(true/fasle/left/right)
      -->
      <el-table :data="commentList" :stripe="true" border height="500px">
        <!-- el-table-column表示一列 prop 是数组中对象字段名  label是每列的标头 width可以设置宽度

        -->
        <el-table-column label="标题" prop="title"></el-table-column>
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
      commentList: []
    }
  },
  methods: {
    // 获取评论列表
    getshow () {
      // 发送axios请求获取评论
      this.$axios({
        url: '/articles',
        params: {
          response_type: 'comment'
        }
      }).then(res => {
        console.log('评论数据')
        console.log(res)
        this.commentList = res.data.results
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
    switchComment (res) {
      const mess = res.comment_status ? '关闭' : '打开'
      const id = res.id
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
        this.$axios({
          url: '/comments/status',
          method: 'put',
          params: {
            article_id: id // 文章id
          },
          data: {
            allow_comment: !res.comment_status
          }

        }).then((res) => {
          this.$message.succsee(`${mess}成功`)
          this.getshow()
          console.log(res)
        }).catch(res => {
          this.$message.error(`${mess}失败`)
        })
      })
    }
  },
  created () {
    this.getshow()
  }
}
</script>

<style lang='less' scoped>
.top {
  height: 60px;
  border: 1px solid springgreen;
}
</style>
