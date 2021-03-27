<template>
  <Card class="chart1-card-wapper" :shadow="shadow" style="height: 180px">
    <p class="chart1-card-title">{{todayWarnings.title}}</p>
    <count-to :end="todayWarnings.count" count-class="chart1-card-count" :isFormat="true"/>
    <div class="chart1-footer">
      <div v-for="(item, index) in todayWarnings.data" :key="`char1_${index}`">
        <h5>{{item.title}}</h5>
        <p>{{item.value}}</p>
      </div>
    </div>
    <slot/>
  </Card>
</template>
<script>
import CountTo from '_c/count-to'
export default {
  name: 'charts1',
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
      todayWarnings: {
        title: '今日所有告警',
        count: 122,
        data: [
          { title: 'API', value: 20 },
          { title: 'Batch', value: 100 },
          { title: '熔断', value: 2 }
        ]
      }
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style lang="less">
.chart1-card-wapper{
  padding: 20px 24px 8px;
}
.chart1-card-title{
  color: rgba(0,0,0,.45);
  font-size: 14px;
  line-height: 22px;
  height: 22px;
}
.chart1-card-count{
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
  color: rgba(0,0,0,.85);
  margin-top: 8px;
  margin-bottom: 0;
  font-size: 50px;
  line-height: 60px;
  height: 60px;
  display: inline-block;
}
.chart1-footer{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding-top: 10px;
}
.chart1-footer > div{
  flex-grow: 1;
  text-align: center;
  border-right: 1px solid #dcdee2;
}
.chart1-footer > div:last-child{
  border: none;
}
.chart1-footer > div > h5{
  color: #808695;
}
.chart1-card-wapper > .ivu-card-body{
  padding: 0px;
}
</style>
