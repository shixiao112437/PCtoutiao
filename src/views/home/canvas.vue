<template>
  <el-card>
    <bread slot="header">
      <template slot="title">canvas</template>
    </bread>
    <canvas ref="canvas" height="400px" width="400px" style="border: 2px dashed #ccc"></canvas>
    <button @click="canvas1">1</button>
    <button>2</button>
    <button>3</button>
  </el-card>
</template>

<script>
export default {
  methods: {
    canvas1 () {
      const context = this.$refs.canvas.getContext('2d')
      context.beginPath() // 开始一个路径
      //  画布中的坐标系 从左上角开始 坐标系是 0 ,0
      context.moveTo(0, 0) // 来到左上角
      context.lineTo(500, 500) // 从左上角 到右下角
      context.lineWidth = 14
      context.stroke()
      context.closePath() // 关闭当前路径 下次不会连上
    }
  }
}
</script>

<style>
</style>
