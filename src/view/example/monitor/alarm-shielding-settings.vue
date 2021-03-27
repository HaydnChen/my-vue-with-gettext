<template>
  <div>
    <Row :gutter="20" className="tiling-card-wrap">
      <i-col :xs="24" :md="24" :lg="24" style="margin-bottom: 20px">
        <Card class="setting-title-card" :shadow="shadow">
          <p slot="title">应用{{ model1=='alarm setting' ? '告警' : '屏蔽' }}规则设置</p>
          <div class="setting-title-search-section">
            <div>
                <Input v-model="value" placeholder="请输入关键字" style="width: 500px">
                    <Select v-model="model1" slot="prepend" style="width: 150px" placeholder="告警设置">
                        <Option v-for="item in settingList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                    </Select>
                    <Button type="primary" slot="append">搜索</Button>
                </Input>
                <Button v-if="model1 == 'alarm setting'" type="primary" ghost @click="addModal = true">添加</Button>
                <Button v-if="model1 == 'shielding setting'" type="primary" ghost @click="addModal = true">添加</Button>
            </div>
          </div>
        </Card>
      </i-col>
    </Row>
    <Row :gutter="20">
      <i-col :xs="24" :md="24" :lg="24" style="height: 420px;margin-bottom: 20px;">
        <Card class="setting-title-card" :shadow="shadow" style="margin-bottom: 20px;">
          <Table  v-if="model1 == 'alarm setting'" stripe :columns="alarmColumns" :data="alarmData" class="alarmTable" size="small"></Table>
          <Page v-if="model1 == 'alarm setting'" :total="40" size="small" style="padding-top: 15px;"/>
          <Table  v-if="model1 == 'shielding setting'" stripe :columns="shieldingColumns" :data="shieldingData" class="shieldingTable" size="small"></Table>
          <Page v-if="model1 == 'shielding setting'" :total="40" size="small" style="padding-top: 15px;"/>
        </Card>
      </i-col>
    </Row>
    <Modal v-model="addModal" width="60%">
        <p slot="header">
            <span>添加告警规则</span>
        </p>
       <adding-alarm-rules/>
        <div slot="footer">
            <Button type="primary" ghost>取消</Button>
            <Button type="primary">提交</Button>
        </div>
    </Modal>
    <Modal v-model="shieldingModal" width="60%">
        <p slot="header">
            <span>屏蔽设置</span>
        </p>
       <shielding-settings/>
        <div slot="footer">
            <Button type="primary" ghost>取消</Button>
            <Button type="primary">提交</Button>
        </div>
    </Modal>
  </div>
</template>
<script>
import AddingAlarmRules from '@/view/components/alarm-shielding-page/adding-alarm-rules'
import ShieldingSettings from '@/view/components/alarm-shielding-page/shielding-settings'
export default {
  name: 'alarm-shielding-settings',
  props: {
    shadow: {
      type: Boolean,
      default: false
    }
  },
  components: {
    AddingAlarmRules,
    ShieldingSettings
  },
  data () {
    return {
      settingList: [
        {
          value: 'alarm setting',
          label: '告警设置'
        },
        {
          value: 'shielding setting',
          label: '屏蔽设置'
        }
      ],
      alarmColumns: [
        { title: '任务描述', key: 'task_description' },
        { title: '任务间隔', key: 'task_interval' },
        { title: '检测指标', key: 'detection_index' },
        { title: '时间范围', key: 'time_frame' },
        { title: '归属接口', key: 'attribution_interface' },
        { title: '接口描述', key: 'interface_description' },
        { title: '环比', key: 'chain_ratio' },
        { title: '操作',
          key: 'operation',
          align: 'left',
          render: (h, params) => {
            return h('div', [
              h('p', {
                props: {
                },
                class: 'rainbow Edit',
                style: {
                  marginRight: '5px',
                  fontSize: '17px'
                },
                on: {
                  click: () => {
                    this.alarmEdit(params.index)
                  }
                }
              }, ''),
              h('p', {
                props: {
                },
                class: 'rainbow Trash',
                style: {
                  marginRight: '5px',
                  fontSize: '17px'
                },
                on: {
                  click: () => {
                    this.alarmDelete(params.index)
                  }
                }
              }, '')
            ])
          } }
      ],
      alarmData: [
        { task_description: 'POST', task_interval: 'OPTION', detection_index: 0, time_frame: 111, attribution_interface: 999, interface_description: 789, chain_ratio: 787 },
        { task_description: 'OPTION', task_interval: 'OPTION', detection_index: 0, time_frame: 111, attribution_interface: 999, interface_description: 789, chain_ratio: 787 },
        { task_description: 'GET', task_interval: 'POST', detection_index: 0, time_frame: 111, attribution_interface: 999, interface_description: 789, chain_ratio: 787 },
        { task_description: 'POST', task_interval: 'POST', detection_index: 0, time_frame: 111, attribution_interface: 999, interface_description: 789, chain_ratio: 787 },
        { task_description: 'POST', task_interval: 'OPTION', detection_index: 0, time_frame: 111, attribution_interface: 999, interface_description: 789, chain_ratio: 787 },
        { task_description: 'GET', task_interval: 'OPTION', detection_index: 0, time_frame: 111, attribution_interface: 999, interface_description: 789, chain_ratio: 787 }
      ],
      shieldingColumns: [
        { title: '屏蔽名称', key: 'mask_name' },
        { title: '开始时间', key: 'begin_time' },
        { title: '持续小时数', key: 'hours_of_duration' },
        { title: '持续分钟数', key: 'continuous_minutes' },
        { title: '周期', key: 'cycle' },
        { title: '开始日期', key: 'start_date' },
        { title: '结束日期', key: 'end_date' },
        { title: '操作',
          key: 'operation',
          align: 'left',
          render: (h, params) => {
            return h('div', [
              h('p', {
                props: {
                },
                class: 'rainbow Setting',
                style: {
                  marginRight: '5px',
                  fontSize: '17px'
                },
                on: {
                  click: () => {
                    this.shieldingSetting(params.index)
                  }
                }
              }, ''),
              h('p', {
                props: {
                },
                class: 'rainbow Trash',
                style: {
                  marginRight: '5px',
                  fontSize: '17px'
                },
                on: {
                  click: () => {
                    this.shieldingDelete(params.index)
                  }
                }
              }, '')
            ])
          } }
      ],
      shieldingData: [
        { mask_name: 'POST', begin_time: '16:30', hours_of_duration: 30, continuous_minutes: 111, cycle: '星期五', start_date: '2018/09/09', end_date: '2018/09/29' },
        { mask_name: 'OPTION', begin_time: '16:30', hours_of_duration: 20, continuous_minutes: 111, cycle: '星期五', start_date: '2018/09/09', end_date: '2018/09/29' },
        { mask_name: 'GET', begin_time: '16:30', hours_of_duration: 34, continuous_minutes: 111, cycle: '星期五', start_date: '2018/09/09', end_date: '2018/09/29' },
        { mask_name: 'POST', begin_time: '16:30', hours_of_duration: 1, continuous_minutes: 111, cycle: '星期五', start_date: '2018/09/09', end_date: '2018/09/29' },
        { mask_name: 'POST', begin_time: '16:30', hours_of_duration: 34, continuous_minutes: 111, cycle: '星期五', start_date: '2018/09/09', end_date: '2018/09/29' },
        { mask_name: 'GET', begin_time: '16:30', hours_of_duration: 7, continuous_minutes: 111, cycle: '星期五', start_date: '2018/09/09', end_date: '2018/09/29' }
      ],
      model1: 'alarm setting',
      value: '',
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
      time: [],
      addModal: false,
      shieldingModal: false
    }
  },
  methods: {
    alarmEdit (index) {
      this.addModal = true
    },
    alarmDelete (index) {
    },
    shieldingSetting (index) {
      this.shieldingModal = true
    },
    shieldingDelete (index) {
    }
  }
}
</script>
<style lang="less" scoped>
.setting-title-search-section > div{
    display: flex;
    justify-content: center;
    flex-direction: row;
}
.setting-title-search-section > div > div{
    top: 0;
}
.setting-title-search-section > div > button{
    margin-left: 10px;
}
</style>
