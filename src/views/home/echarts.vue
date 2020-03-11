<template>
  <el-card>
      <bread slot="header">
      <template slot="title">图文数据</template>
      </bread>
      <div ref="aa" class="a echarts1 a1"></div>
      <div ref="bb" class="a echarts2 b1"></div>
      <div ref="cc" class="a echarts3 c1"></div>
      <div ref="dd" class="a echarts4 d1"></div>
  </el-card>
</template>

<script>
import echarts from 'echarts'
export default {
  methods: {
    echarts () {
      this.echartsOne = echarts.init(this.$refs.aa)
      this.echartsTwo = echarts.init(this.$refs.bb)
      this.echartsThr = echarts.init(this.$refs.cc)
      this.echartsFou = echarts.init(this.$refs.dd)
      this.echartsOne.setOption({
        title: {
          text: '堆叠区域图'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: ['邮件营销', '联盟广告', '视频广告', '直接访问', '搜索引擎']
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            boundaryGap: false,
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '邮件营销',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: '联盟广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: '视频广告',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: '直接访问',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: '搜索引擎',
            type: 'line',
            stack: '总量',
            label: {
              normal: {
                show: true,
                position: 'top'
              }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      })
    }
  },
  mounted () {
    this.echarts()
  }
}
</script>

<style scoped>
.a{
  width: 400px;
  height: 400px;
  border: 1px solid #cccccc;
}
.a1{
  width: 100%;
  height: 600px;
  border: 1px solid #cccccc;
}

</style>
