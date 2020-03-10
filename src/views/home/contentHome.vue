<template>
  <div class="wrap" :style="{backgroundImage:`url(`+bgImgList[bgIndex]+')'}">
    <el-dropdown placement="bottom" @command="toggle">
      <span>
        <i class="el-icon-loading"></i>
        换肤
        <i class="el-icon-caret-bottom"></i>
      </span>
      <el-dropdown-menu>
        <el-dropdown-item :command="0">默认</el-dropdown-item>
        <el-dropdown-item :command="1">背景1</el-dropdown-item>
        <el-dropdown-item :command="2">背景2</el-dropdown-item>
        <el-dropdown-item :command="3">背景3</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <h1>充满希望的一天</h1>
    <el-carousel indicator-position="outside" height="300px" arrow="always" type="card">
      <el-carousel-item v-for="item in slideImg" :key="item">
        <img :src="item" alt />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      bgIndex: 0,
      bgImgList: [
        'http://img1.imgtn.bdimg.com/it/u=3306367262,1797207147&fm=26&gp=0.jpg',
        'http://img2.imgtn.bdimg.com/it/u=683581252,3654367472&fm=26&gp=0.jpg',
        'http://img0.imgtn.bdimg.com/it/u=3653273060,2980461482&fm=26&gp=0.jpg',
        'http://img0.imgtn.bdimg.com/it/u=3416298593,1460946041&fm=26&gp=0.jpg'
      ],
      slideImg: [
        'http://img4.imgtn.bdimg.com/it/u=559529430,2149456864&fm=11&gp=0.jpg',
        'http://img1.imgtn.bdimg.com/it/u=1529523085,2130368760&fm=26&gp=0.jpg',
        'http://img2.imgtn.bdimg.com/it/u=60295700,1712385642&fm=11&gp=0.jpg',
        'http://img3.imgtn.bdimg.com/it/u=2801288866,4253790105&fm=26&gp=0.jpg'
      ]
    }
  },
  methods: {
    toggle (command) {
      this.bgIndex = command
    }
  }
}
</script>

<style lang='less' scoped>
.wrap {
  width: 100%;
  height: 100%;
  // border: 1px solid #ccc;
  background-size: cover;
  //   filter: blur(1px);
  // background-image: url()
  span {
    text-align: center;
    display: inline-block;
    padding: 10px 20px;
    background-color: rgba(0, 0, 0, 0.562);
    // background-color: rgba(red, green, blue, alpha)
    // opacity: 0.4;
    color: white;
    margin: 20px 30px 0;
  }
  img {
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }

  h1 {
      text-align: center;
    color: gold;
    letter-spacing: 0;
    text-shadow: 0px 1px 0px #999, 0px 2px 0px #888, 0px 3px 0px #777,
      0px 4px 0px #666, 0px 5px 0px #555, 0px 6px 0px #444, 0px 7px 0px #333,
      0px 8px 7px #001135;
  }
}
</style>
