<template>
  <Card :shadow="shadow" :padding="0">
    <p slot="title">批处理监控</p>
    <div class="micro-service-monitoring-header" >
      <div v-for="(item, index) in Monitoring" :key="`micro_service_monitoring_${index}`">
        <h5>{{item.title}}</h5>
        <p>{{item.value}}</p>
      </div>
      <div >
        <Select style="width:80%" placeholder="任务类别">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
    </div>
    <div class="micro-service-monitoring-chart-wrap">
      <div ref="warningBar" class="charts chart-bar micro-service-monitoring-chart"></div>
    </div>
  </Card>
</template>
<script>
import echarts from 'echarts'
import tdTheme from '@/components/charts/theme.json'
import CountTo from '_c/count-to'
import '@/index.less'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'main-card',
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
      warningBar: {},
      Monitoring: [
        { title: '今日危险总数', value: 2000 },
        { title: '今日告警总数', value: 100 },
        { title: '近期危险总数', value: 2000 },
        { title: '近期危险总数', value: 100 }
      ],
      cityList: [
        { value: 'New York', label: 'New York' },
        { value: 'London', label: 'London' },
        { value: 'Sydney', label: 'Sydney' },
        { value: 'Ottawa', label: 'Ottawa' },
        { value: 'Paris', label: 'Paris' },
        { value: 'Canberra', label: 'Canberra' }
      ],
      model1: '',
      data: [
        [0, 0, 2, 'plate-form-config', 'http://172.25.16.83:8250'], [1, 0, 1, 'plate-form-config', 'http://172.25.16.83:8250'], [2, 0, 2, 'plate-form-config', 'http://172.25.16.83:8250'], [3, 0, 1, 'plate-form-config', 'http://172.25.16.83:8250'], [4, 0, 2, 'plate-form-config', 'http://172.25.16.83:8250'], [5, 0, 1, 'plate-form-config', 'http://172.25.16.83:8250'], [6, 0, 2, 'plate-form-config', 'http://172.25.16.83:8250'],
        [0, 1, 2, 'batch', 'http://172.25.16.83:8250'], [1, 1, 1, 'batch', 'http://172.25.16.83:8250'], [2, 1, 1, 'batch', 'http://172.25.16.83:8250'], [3, 1, 1, 'batch', 'http://172.25.16.83:8250'], [4, 1, 1, 'batch', 'http://172.25.16.83:8250'], [5, 1, 1, 'batch', 'http://172.25.16.83:8250'], [6, 1, 1, 'batch', 'http://172.25.16.83:8250'],
        [0, 2, 1, 'batch', 'http://172.25.16.83:8250'], [1, 2, 1, 'batch', 'http://172.25.16.83:8250'], [2, 2, 1, 'batch', 'http://172.25.16.83:8250'], [3, 2, 1, 'batch', 'http://172.25.16.83:8250'], [4, 2, 1, 'urp', 'http://172.25.16.83:8250'], [5, 2, 1, 'batch', 'http://172.25.16.83:8250'], [6, 2, 1, 'urp', 'http://172.25.16.83:8250'],
        [0, 3, 1, 'batch', 'http://172.25.16.83:8250'], [1, 3, 1, 'urp', 'http://172.25.16.83:8250'], [2, 3, 1, 'batch', 'http://172.25.16.83:8250'], [3, 3, 1, 'urp', 'http://172.25.16.83:8250'], [4, 3, 1, 'batch', 'http://172.25.16.83:8250'], [5, 3, 3, 'workflow', 'http://172.25.16.83:8250'], [6, 3, 3, 'workflow', 'http://172.25.16.83:8250'],
        [0, 4, 1, 'batch', 'http://172.25.16.83:8250'], [1, 4, 1, 'batch', 'http://172.25.16.83:8250'], [2, 4, 1, 'batch', 'http://172.25.16.83:8250'], [3, 4, 1, 'batch', 'http://172.25.16.83:8250'], [4, 4, 3, 'workflow', 'http://172.25.16.83:8250'], [5, 4, 3, 'workflow', 'http://172.25.16.83:8250'], [6, 4, 3, 'workflow', 'http://172.25.16.83:8250'],
        [0, 5, 1, 'batch', 'http://172.25.16.83:8250'], [1, 5, 3, 'workflow', 'http://172.25.16.83:8250'], [2, 5, 3, 'workflow', 'http://172.25.16.83:8250'], [3, 5, 3, 'workflow', 'http://172.25.16.83:8250'], [4, 5, 3, 'workflow', 'http://172.25.16.83:8250'], [5, 5, 1, 'batch', 'http://172.25.16.83:8250'], [6, 5, 1, 'batch', 'http://172.25.16.83:8250'],
        [0, 6, 3, 'workflow', 'http://172.25.16.83:8250'], [1, 6, 1, 'batch', 'http://172.25.16.83:8250'], [2, 6, 1, 'batch', 'http://172.25.16.83:8250'], [3, 6, 3, 'workflow', 'http://172.25.16.83:8250'], [4, 6, 1, 'urp', 'http://172.25.16.83:8250'], [5, 6, 3, 'workflow', 'http://172.25.16.83:8250'], [6, 6, 1, 'urp', 'http://172.25.16.83:8250'],
        [0, 7, 1, 'batch', 'http://172.25.16.83:8250'], [1, 7, 3, 'workflow', 'http://172.25.16.83:8250'], [2, 7, 3, 'workflow', 'http://172.25.16.83:8250'], [3, 7, 3, 'workflow', 'http://172.25.16.83:8250'], [4, 7, 1, 'urp', 'http://172.25.16.83:8250'], [5, 7, 1, 'batch', 'http://172.25.16.83:8250'], [6, 7, 1, 'batch', 'http://172.25.16.83:8250'],
        [0, 8, 1, 'batch', 'http://172.25.16.83:8250'], [1, 8, 3, 'workflow', 'http://172.25.16.83:8250'], [2, 8, 3, 'workflow', 'http://172.25.16.83:8250'], [3, 8, 3, 'workflow', 'http://172.25.16.83:8250'], [4, 8, 1, 'urp', 'http://172.25.16.83:8250'], [5, 8, 3, 'workflow', 'http://172.25.16.83:8250'], [6, 8, 1, 'urp', 'http://172.25.16.83:8250'],
        [0, 9, 1, 'batch', 'http://172.25.16.83:8250'], [1, 9, 3, 'workflow', 'http://172.25.16.83:8250'], [2, 9, 3, 'workflow', 'http://172.25.16.83:8250'], [3, 9, 3, 'workflow', 'http://172.25.16.83:8250'], [4, 9, 1, 'urp', 'http://172.25.16.83:8250'], [5, 9, 3, 'workflow', 'http://172.25.16.83:8250'], [6, 9, 1, 'urp', 'http://172.25.16.83:8250']
      ]
    }
  },
  methods: {
    resize () {
      this.warningBar.resize()
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.dataSource = this.data.map(function (item) {
        return [item[0], item[1], item[2] || '-']
      })
      let option = {
        tooltip: {
          position: 'top',
          formatter: function (params) {
            // var ch = params.value[3] // 频道名称
            // return ch + '<br>' + params.value[4] + '<br>' + params.value[4]
          }
        },
        animation: false,
        grid: {
          left: '5%',
          bottom: '0%',
          height: '100%',
          containLabel: true
        },
        xAxis: {
          show: false,
          type: 'category',
          //   data: this.hours,
          splitArea: {
            show: false
          }
        },
        yAxis: {
          show: false,
          type: 'category',
          //   data: this.days,
          splitArea: {
            show: false
          }
        },
        dataZoom: [{
          type: 'inside',
          xAxisIndex: [0],
          start: 1,
          end: 100
        }, {
          type: 'inside',
          yAxisIndex: [0],
          start: 1,
          end: 100
        }],
        visualMap: {
          min: 0,
          max: 3,
          type: 'piecewise',
          splitNumber: 3,
          orient: 'horizontal',
          calculable: false,
          right: '70px',
          bottom: '-5px',
          // show: true,
          //   right: '0',
          color: ['#A2F09C', '#E2E2E2', '#C0444D'],
          pieces: [
            { value: 1, label: '成功', color: '#A2F09C' },
            { value: 2, label: '无', color: '#E2E2E2' },
            { value: 3, label: '失败', color: '#C0444D' }
          ]
        //   formatter: function (value) { // 标签的格式化工具。
        //     debugger
        //     if (value === 1) {
        //       return '正常'
        //     } else if (value === 2) {
        //       return '告警'
        //     } else {
        //       return '危险'
        //     }
        //   }
        },
        series: [{
          name: 'Card',
          type: 'heatmap',
          data: this.dataSource,
          label: {
            normal: {
              show: false
            }
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }]
      }
      this.warningBar = echarts.init(this.$refs.warningBar, 'tdTheme')
      this.warningBar.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
<style lang="less">
.micro-service-monitoring-header{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 10px 10px 10px 10px;
}
.micro-service-monitoring-header > div{
  flex-grow: 1;
  text-align: center;
  border-right: 1px solid #dcdee2;
}
.micro-service-monitoring-header > div:last-child{
  border: none;
}
.micro-service-monitoring-header > div > h5{
  color: #808695;
}
.micro-service-monitoring-chart-wrap{
  position: relative;
  width: 100%;
  height: 310px;
}
.micro-service-monitoring-chart{
  position: relative;
  width: 100%;
  height: 280px;
}
</style>
