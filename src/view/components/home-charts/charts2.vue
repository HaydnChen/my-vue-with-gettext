<template>
  <Card :shadow="shadow" class="data-card-wrapper">
      <h3 class="data-card-count-title">{{APIWarning.title}}</h3>
      <count-to :end="APIWarning.count" count-class="data-card-count-style" :isFormat="true"/>
      <div class="data-card-content">
        <div ref="APIWarningBar" class="charts chart-bar api-warning-bar"></div>
      </div>
      <div class="data-card-footer">
        <span class="data-card-title">{{APIWarning.chainRatio}}</span>
        <span class="data-card-count">{{APIWarning.chainRatioCount}}%</span>
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
  name: 'charts2',
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
      APIWarning: {
        title: 'API告警',
        count: 20,
        chainRatio: '环比',
        chainRatioCount: 20
      },
      APIWarningBar: {}
    }
  },
  methods: {
    resize () {
      this.APIWarningBar.resize()
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
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
          name: 'API警告',
          // center: ['10%', '10%'],
          type: 'line',
          smooth: false,
          symbol: 'none',
          lineStyle: {
            normal: {
              color: '#FF6901'
            }
          },
          areaStyle: {
            normal: {
              color: 'transparent'
            }
          },
          itemStyle: {
            show: false,
            normal: {
              color: '#FF6901'
            }
          },
          data: [820, 32, 901, 94, 1290, 330, 1320]
        }]
      }
      this.APIWarningBar = echarts.init(this.$refs.APIWarningBar, 'tdTheme')
      this.APIWarningBar.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
<style lang="less">
.api-warning-bar{
  width: 115%;
  height: 70px;
}
.api-warning-bar canvas{
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
.data-card-wrapper > .ivu-card-body{
  padding: 0px;
}
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
