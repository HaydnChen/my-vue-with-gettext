<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="24" :md="12" :lg="16" style="height: 420px;margin-bottom: 20px;">
        <main-card/>
      </i-col>

      <i-col :xs="24" :md="12" :lg="8" style="height: 420px;margin-bottom: 20px;">
        <tab-card/>
      </i-col>
    </Row>

    <Card :shadow="shadow">
      <Tabs value="statistics">
        <TabPane label="统计" name="statistics">
          <charts-bar style="height: 350px"/>
          <div class="operationArea">
            <Select v-model="model1" style="width:200px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <DatePicker v-model="time" :options="options" type="daterange" placement="bottom-end" placeholder="请选择" style="width: 200px"></DatePicker>
          </div>
        </TabPane>
        <TabPane label="详情" name="details">
          <Table stripe :columns="detailColumns" :data="detailData" size="small"></Table>
          <Page :total="40" size="small"/>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>
<script>
import MainCard from '@/view/components/monitor-page/micro-service-monitoring-card/main-card'
import TabCard from '@/view/components/monitor-page/micro-service-monitoring-card/tab-card'
import ChartsBar from '@/view/components/monitor-page/micro-service-monitoring-card/charts-bar'
export default {
  name: 'micro_service_monitoring',
  props: {
    shadow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    MainCard,
    TabCard,
    ChartsBar
  },
  data () {
    return {
      cityList: [
        { value: 'Batch', label: 'Batch' },
        { value: 'API', label: 'API' },
        { value: 'config-server', label: 'config-server' },
        { value: 'urp', label: 'urp' },
        { value: 'workflow', label: 'workflow' },
        { value: 'plateform', label: 'plateform' }
      ],
      detailColumns: [
        { title: '路径', key: 'route' },
        { title: '方法', key: 'function' },
        { title: '成功次数', key: 'success' },
        { title: '失败次数', key: 'failure' },
        { title: '平均响应时间(ms)', key: 'average_response_time' },
        { title: '成功平均响应时间(ms)', key: 'success_average_response_time' },
        { title: '失败平均响应时间(ms)', key: 'failure_average_response_time' }
      ],
      detailData: [
        { route: '/translation/v1/codet', function: 'POST', success: 3424424, failure: 0, average_response_time: 111, success_average_response_time: 111, failure_average_response_time: 111 },
        { route: '/translation/v1/codet', function: 'GET', success: 5432, failure: 0, average_response_time: 111, success_average_response_time: 111, failure_average_response_time: 111 },
        { route: '/translation/v1/', function: 'OPTIONS', success: 51515, failure: 0, average_response_time: 111, success_average_response_time: 111, failure_average_response_time: 111 },
        { route: '/translation/v1/', function: 'GET', success: 523525, failure: 0, average_response_time: 111, success_average_response_time: 111, failure_average_response_time: 111 },
        { route: '/translation/v1/codet', function: 'POST', success: 1431415, failure: 0, average_response_time: 111, success_average_response_time: 111, failure_average_response_time: 111 }
      ],
      model1: '',
      time: [],
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
      }
    }
  },
  mounted () {

  }
}
</script>
<style lang="less">

</style>
