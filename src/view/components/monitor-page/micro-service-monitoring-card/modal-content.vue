<template>
<div>
    <Tabs value="name1">
        <TabPane label="统计" name="name1" class="micro-service-total">
          <Row style="margin-top: 10px;">
            <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
              <div ref="dom" class="charts chart-bar" style="height: 300px;"></div>
            </i-col>
          </Row>
        </TabPane>
        <TabPane label="详情" name="name2" class="micro-service-detail">
          <Row style="margin-top: 10px;">
            <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
              <Table stripe :columns="detailColumns" :data="detailData" class="detailTable" size="small"></Table>
              <Page :total="40" size="small" style="padding-top: 15px;"/>
            </i-col>
          </Row>
        </TabPane>
        <TabPane label="调用" name="name3">
          <Tree :data="data1"></Tree>
        </TabPane>
        <TabPane label="被调用" name="name4">
        </TabPane>
    </Tabs>
    <Select class="select" v-model="model1" style="width:200px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    <div class="dateTimeRangePicker">
        <DatePicker v-model="time" :options="options" type="daterange" placement="bottom-end" placeholder="请选择" style="width: 200px"></DatePicker>
    </div>
</div>
</template>
<script>
import echarts from 'echarts'
import tdTheme from '@/components/charts/theme.json'
import { on, off } from '@/libs/tools'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'ChartsBar',
  props: {
    value: Object,
    text: String,
    subtext: String
  },
  data () {
    return {
      dom: null,
      detailColumns: [
        { title: '开始时间', key: 'begin_time', width: 200 },
        { title: '响应时间(ms)', key: 'time', width: 200 },
        { title: 'HTTP状态码', key: 'http', width: 200 },
        { title: '调用方', key: 'route' },
        { title: '链路追踪号', key: 'trake' }
      ],
      detailData: [
        { route: '/translation/v1/codet', begin_time: '2018-10-19', time: 11, http: 324188, trake: 11331 },
        { route: '/translation/v1/codet', begin_time: '2018-10-19', time: 21, http: 42420, trake: 4234242 },
        { route: '/translation/v1/', begin_time: '2018-10-19', time: 43, http: 53414, trake: 324242 },
        { route: '/translation/v1/', begin_time: '2018-10-19', time: 3, http: 542, trake: 113331 },
        { route: '/translation/v1/codet', begin_time: '2018-10-19', time: 16, http: 52351, trake: 112222221 }
      ],
      time: [],
      model1: '',
      cityList: [
        { value: 'New York', label: 'New York' },
        { value: 'London', label: 'London' },
        { value: 'Sydney', label: 'Sydney' },
        { value: 'Ottawa', label: 'Ottawa' },
        { value: 'Paris', label: 'Paris' },
        { value: 'Canberra', label: 'Canberra' }
      ],
      options: {
        shortcuts: [
          {
            text: '本周',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              return [start, end]
            }
          },
          {
            text: '本月',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              return [start, end]
            }
          },
          {
            text: '本季',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              return [start, end]
            }
          },
          {
            text: '半年',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
              return [start, end]
            }
          },
          {
            text: '全年',
            value () {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
              return [start, end]
            }
          }
        ]
      },
      data1: [
        {
          title: '/translation/v1/codet',
          expand: true,
          children: [
            {
              title: '/translation/v1/codet/translation/v1/codet',
              expand: true,
              children: [
                {
                  title: '/translation/v1/translation/v1/codet/translation/v1/codet'
                },
                {
                  title: '/translation/v1/codet'
                }
              ]
            },
            {
              title: '/translation/v1/codet',
              expand: true,
              children: [
                {
                  title: '/translation/v1'
                },
                {
                  title: '/translation/v1/codet'
                }
              ]
            },
            {
              title: '/translation/v1/codet',
              expand: true,
              children: [
                {
                  title: '/translation/v1'
                }
              ]
            }
          ]
        }
      ]
    }
  },
  methods: {
    resize () {
      this.dom.resize()
    }
  },
  mounted () {
    this.$nextTick(() => {
      let option = {
        xAxis: {
          type: 'category',
          data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          splitLine: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          splitLine: {
            show: true,
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        grid: {
          left: '5%',
          top: '10%',
          width: '90%',
          height: '90%',
          containLabel: true
        },
        series: [{
          data: [1610, 912, 2221, 1754, 1910, 1630, 2710, 1921, 1354, 1560, 1830, 810],
          type: 'line',
          barWidth: '50%',
          smooth: false,
          symbol: 'none'
        }]
      }
      this.dom = echarts.init(this.$refs.dom, 'tdTheme')
      this.dom.setOption(option)
      on(window, 'resize', this.resize)
    })
  },
  beforeDestroy () {
    off(window, 'resize', this.resize)
  }
}
</script>
<style lang="less" scoped>
.dateTimeRangePicker{
  position: absolute;
  top: 12px;
  right: 50px;
}
.select{
  position: absolute;
  top: 12px;
  right: 266px;
}
</style>
