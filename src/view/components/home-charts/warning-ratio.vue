<template>
  <Card :shadow="shadow">
    <p slot="title">告警类别占比</p>
    <div ref="warningRatioPie" class="charts chart-pie warning-ratio-bar"></div>
  </Card>
</template>
<script>
import echarts from 'echarts'
import tdTheme from '@/components/charts/theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'warning-ratio',
  components: {
  },
  props: {
    shadow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      ratioData: [
        { value: 335, name: 'API告警' },
        { value: 310, name: 'Batch告警' },
        { value: 234, name: '熔断告警' },
        { value: 335, name: 'API告警1' },
        { value: 310, name: 'Batch告警1' },
        { value: 234, name: '熔断告警1' }
      ],
      warningRatioPie: {}
    }
  },
  methods: {
    resize () {
      this.warningRatioPie.resize()
    }
  },
  mounted () {
    this.$nextTick(() => {
      let option = {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          right: 50,
          top: 50,
          bottom: 20,
          data: this.ratioData.name,
          itemWidth: 20,
          itemHeight: 10,
          itemGap: 10
        },
        series: [
          {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['30%', '50%'],
            color: ['#FFCE42', '#B8C8CE', '#1890FF', '#5CCA44', '#C577D9', '#FF6901'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '30',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: this.ratioData
          }
        ]
      }
      this.warningRatioPie = echarts.init(this.$refs.warningRatioPie, 'tdTheme')
      this.warningRatioPie.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
<style lang="less">
.warning-ratio-bar{
    width: 100%;
    height: 262px;
    margin-top: 10px;
}
.warning-ratio-bar canvas{
    margin-top: 20px;
}
</style>
