<template>
  <div>
    <Row :gutter="20">
      <i-col :xs="24" :md="12" :lg="6" style="height: 188px;margin-bottom: 10px;">
        <charts1>
          <div class="direct-button">
            <p class="rainbow Setting" @click="goToSettings"></p>
            <p class="rainbow Info" @click="goToAllWarning"></p>
          </div>
        </charts1>
      </i-col>

      <i-col :xs="24" :md="12" :lg="6" style="height: 188px;margin-bottom: 10px;">
        <charts2>
          <div class="direct-button">
            <p class="rainbow Info" @click="goToAPIWarning"></p>
          </div>
        </charts2>
      </i-col>

      <i-col :xs="24" :md="12" :lg="6" style="height: 188px;margin-bottom: 10px;">
        <charts3>
          <div class="direct-button">
            <p class="rainbow Info" @click="goToBatchWarning"></p>
          </div>
        </charts3>
      </i-col>

      <i-col :xs="24" :md="12" :lg="6" style="height: 188px;margin-bottom: 10px;">
        <charts4>
          <div class="direct-button">
            <p class="rainbow Info" @click="goToFuseWarning"></p>
          </div>
        </charts4>
      </i-col>
    </Row>
    <Card class="home-tab-card" :shadow="shadow" style="margin-bottom: 20px;">
      <Tabs value="name1">
        <TabPane label="API" name="name1">
          <Row :gutter="20" style="margin-top: 10px;">
            <!-- <i-col :md="24" :lg="8" style="margin-bottom: 20px;">
              <Card shadow>
                <chart-pie style="height: 300px;" :value="pieData" text="用户访问来源"></chart-pie>
              </Card>
            </i-col> -->
            <i-col :md="24" :lg="24" style="margin-bottom: 20px;">
              <charts-bar style="height: 300px;"/>
              <div class="dateTimeRangePicker">
                <DatePicker v-model="time" :options="options" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
              </div>
            </i-col>
          </Row>
        </TabPane>
        <TabPane label="Batch" name="name2">标签二的内容</TabPane>
        <TabPane label="熔断" name="name3">标签三的内容</TabPane>
      </Tabs>
    </Card>
    <Row :gutter="20">
      <i-col :xs="24" :md="24" :lg="12" style="height: 345px;margin-bottom: 10px;">
        <warning-ranking/>
      </i-col>

      <i-col :xs="24" :md="24" :lg="12" style="height: 345px;margin-bottom: 10px;">
        <warning-ratio/>
      </i-col>
    </Row>
    <!-- <Row>
      <Card shadow>
        <example style="height: 310px;"/>
      </Card>
    </Row> -->
  </div>
</template>

<script>
import InforCard from '_c/info-card'
import CountTo from '_c/count-to'
import Example from './example.vue'
import Charts1 from '@/view/components/home-charts/charts1'
import Charts2 from '@/view/components/home-charts/charts2'
import Charts3 from '@/view/components/home-charts/charts3'
import Charts4 from '@/view/components/home-charts/charts4'
import ChartsBar from '@/view/components/home-charts/charts-bar'
import WarningRanking from '@/view/components/home-charts/warning-ranking'
import WarningRatio from '@/view/components/home-charts/warning-ratio'
export default {
  name: 'home',
  props: {
    shadow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    InforCard,
    CountTo,
    Example,
    Charts1,
    Charts2,
    Charts3,
    Charts4,
    WarningRanking,
    WarningRatio,
    ChartsBar
  },
  data () {
    return {
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
    //
  },
  created () {
    const end = new Date()
    const start = new Date()
    start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
    this.time = [start, end]
  },
  methods: {
    goToSettings () {
      this.$router.push({
        path: '/instance/monitor/alarm_shielding_settings',
        query: {
          // model1: 'AllWarning'
        }
      })
    },
    goToAllWarning () {
      this.$router.push({
        path: '/instance/monitor/alarm_event_query',
        query: {
          model1: 'All'
        }
      })
    },
    goToAPIWarning () {
      this.$router.push({
        path: '/instance/monitor/alarm_event_query',
        query: {
          model1: 'API'
        }
      })
    },
    goToBatchWarning () {
      this.$router.push({
        path: '/instance/monitor/alarm_event_query',
        query: {
          model1: 'Batch'
        }
      })
    },
    goToFuseWarning () {
      this.$router.push({
        path: '/instance/cache/alarm_event_query',
        query: {
          model1: 'FuseWarning'
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.home-tab-card{
  margin-bottom: 10px;
}
.home-tab-card > div{
  padding-top: 0px;
}
// .home-tab-card .ivu-tabs-bar{
//   padding-top: 20px;
// }
.dateTimeRangePicker{
  position: absolute;
  top: -70px;
  right: 16px;
}

.direct-button{
    position: absolute;
    top: 14px;
    font-size: 20px;
    right: 16px;
}
.direct-button > p{
    padding-left: 10px;
}
</style>
