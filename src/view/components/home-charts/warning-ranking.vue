<template>
    <Card :shadow="shadow">
        <p slot="title">近期告警排行</p>
        <Table stripe :columns="warningColumns" :data="warningData" class="warningTable" size="small"></Table>
        <Page :total="40" size="small" style="padding-top: 15px;"/>
    </Card>
</template>
<script>
export default {
  name: 'warning-ranking',
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
      warningColumns: [
        { title: '排名', key: 'ranking' },
        { title: '关键词', key: 'keyWord' },
        { title: '告警数', key: 'alarmNumber' },
        { title: '环比', key: 'chainRatio' }
      ],
      warningData: [
        { ranking: 1, keyWord: 'API', alarmNumber: 20, chainRatio: '50%' },
        { ranking: 2, keyWord: 'Batch', alarmNumber: 100, chainRatio: '20%' },
        { ranking: 3, keyWord: '熔断', alarmNumber: 20, chainRatio: '50%' },
        { ranking: 4, keyWord: 'Batch', alarmNumber: 100, chainRatio: '20%' },
        { ranking: 5, keyWord: 'API', alarmNumber: 20, chainRatio: '50%' }
      ]
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style lang="less">
</style>
