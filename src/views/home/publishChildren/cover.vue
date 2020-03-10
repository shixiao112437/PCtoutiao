<template>
<!-- 显示图片的组件 -->
  <div class="wrap">
        <div class="cover-item" v-for="(item,index) in list" :key="index">
            <img @click="selectImg(index)" :src="item?item:defaultImg" alt="">
        </div>
        <el-dialog :visible="showImg" @close='showImg=false'>
            <!-- 显示图片素材的自检 -->
            <material @selectImg='receive'></material>
        </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'], // 接受父传子的值
  data () {
    return {
      showImg: false,
      coverIndex: -1,
      defaultImg: require('../../../assets/img/pic_bg.png')
    }
  },
  methods: {
    selectImg (index) {
      this.showImg = true
      this.coverIndex = index // 点击的是第几张封面
    },
    receive (url) {
      this.$emit('selectImg', url, this.coverIndex) // 传递索引
      this.showImg = false
    }
  }

}
</script>

<style lang='less' scoped>
.wrap{
    display: flex;
    justify-content: space-around;
    margin-bottom: 20px;
    .cover-item{
        border: 4px solid #cccccc;
        width: 200px;
        height: 200px;
        box-sizing: border-box;
        img{
          width: 100%;
          height: 100%;
        }
    }
}
</style>
