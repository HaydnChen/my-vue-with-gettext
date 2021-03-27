<template>
  <Card :shadow="shadow" class="data-card-wrapper">
    <h3 class="data-card-count-title">{{fuseWarning.title}}</h3>
    <count-to :end="fuseWarning.count" count-class="data-card-count-style" :isFormat="true"/>
    <div class="data-card-content">
      <div ref="fuseWarningBar" class="charts chart-bar fuse-warning-bar"></div>
    </div>
    <div class="data-card-footer">
      <span class="data-card-title">{{fuseWarning.chainRatio}}</span>
      <span class="data-card-count">{{fuseWarning.chainRatioCount}}%</span>
      <span class="data-card-content-tip-green"></span>
    </div>
    <slot/>
  </Card>
</template>
<script>
import echarts from 'echarts'
import tdTheme from '@/components/charts/theme.json'
import { on, off } from '@/libs/tools'
import CountTo from '_c/count-to'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'charts4',
  components: {
    CountTo
  },
  props: {
    shadow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      fuseWarning: {
        title: '熔断告警',
        count: 2,
        chainRatio: '环比',
        chainRatioCount: 5
      },
      fuseWarningBar: {}
    }
  },
  methods: {
    resize () {
      this.fuseWarningBar.resize()
    }
  },
  mounted () {
    this.$nextTick(() => {
      let option = {
        tooltip: {
          trigger: 'axis',
          position: function (p) {
            return [p[0] + 10, p[1] - 10]
          },
          confine: true
        },
        grid: {
          left: '-15%',
          bottom: '0%',
          width: '105%',
          height: '100%',
          containLabel: true
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          boundaryGap: false,
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          show: false,
          splitLine: {
            show: false
          }
        }],
        yAxis: {
          type: 'value',
          show: false,
          splitLine: {
            show: false
          }
        },
        series: [{
          name: '熔断警告',
          // center: ['10%', '10%'],
          type: 'line',
          symbol: 'none',
          lineStyle: {
            normal: {
              color: '#C577D9'
            }
          },
          areaStyle: {
            normal: {
              color: '#C577D9'
            }
          },
          smooth: true,
          itemStyle: {
            normal: {
              color: '#C577D9',
              areaStyle: {
                type: 'default'
              }
            }
          },
          data: [610, 312, 221, 654, 910, 630, 310, 521, 354, 560, 830, 310]
        }]
      }
      this.fuseWarningBar = echarts.init(this.$refs.fuseWarningBar, 'tdTheme')
      this.fuseWarningBar.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
<style lang="less">
.fuse-warning-bar{
  width: 115%;
  height: 70px;
}
.fuse-warning-bar canvas{
  // left: -30px!important;
}
.data-card-content-tip-green{
  width: 0;
  height: 0;
  border-width: 4px 4px 0;
  border-style: solid;
  border-color: #52c41a transparent transparent ;
  display: inline-block;
  margin-left: 5px;
  position: relative;
  top: -2px;
}
.data-card-content-tip-red{
  width: 0;
  height: 0;
  border-width: 0 4px 4px;
  border-style: solid;
  border-color: transparent transparent #f5222d;
  display: inline-block;
  margin-left: 5px;
  position: relative;
  top: -2px;
}

.data-card-wrapper{
  padding: 20px 24px 8px;
  // padding: 0px
}
// .data-card-wrapper > .ivu-card-body{
//   padding: 0px;
// }
.data-card-count-title{
  color: rgba(0,0,0,.45);
  font-size: 14px;
  line-height: 22px;
  height: 22px;
}
.data-card-count-style{
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
  color: rgba(0,0,0,.85);
  margin-top: 4px;
  margin-bottom: 0;
  font-size: 30px;
  line-height: 38px;
  height: 38px;
}
.data-card-content{
  width: 100%;
  height: 46px;
  margin-bottom: 12px;
}
.data-card-footer{
  /* border-top: 1px solid #e8e8e8; */
  padding-top: 9px;
  margin-top: 8px;
  height: 32px;
  overflow: hidden;
}
</style>
