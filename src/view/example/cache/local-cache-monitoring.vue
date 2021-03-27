<template>
  <div>
    <Row :gutter="20" className="tiling-card-wrap">
      <i-col :xs="24" :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card class="local-cache-title-card" :shadow="shadow">
          <p slot="title">本地缓存监控</p>
          <div class="local-cache-title-search-section">
            <Select v-model="model1" style="width:200px;padding-right:10px" placeholder="请选择归属应用">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Select v-model="model1" style="width:200px;padding-right:10px" placeholder="请选择分类">
              <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Input suffix="ios-search" placeholder="请输入内容" style="width: auto" />
          </div>
        </Card>
      </i-col>
    </Row>
     <Row :gutter="20">
      <i-col :xs="24" :md="12" :lg="8"  v-for="(item, index) in localCacheList" :key="`local-cache-${index}`" style="margin-bottom: 20px;">
        <Card class="local-cache-card" :shadow="shadow">
            <Row class="local-cache-card-row1">
                <i-col :xs="4" :md="4" :lg="4" >
                    <p class="rainbow URP"></p>
                </i-col>
                <i-col :xs="20" :md="20" :lg="20" >
                    <div class="local-cache-card-title">{{item.title}}</div>
                </i-col>
            </Row>
            <Row class="local-cache-card-row2">
                <i-col :xs="24" :md="12" :lg="12" >
                    <span>命中数</span>
                    <span>{{item.hit_number}}</span>
                </i-col>
                <i-col :xs="24" :md="12" :lg="12" >
                    <span>错失数</span>
                    <span>{{item.miss_count}}</span>
                </i-col>
                <i-col :xs="24" :md="12" :lg="12" >
                    <span>命中率</span>
                    <span>{{item.hit_rate}}</span>
                </i-col>
                <i-col :xs="24" :md="12" :lg="12" >
                    <span>缓存数</span>
                    <span>{{item.cache_count}}</span>
                </i-col>
            </Row>
        </Card>
         <Row class="local-cache-card-row3">
                <ButtonGroup>
                    <Button >刷新</Button>
                    <Button >删除</Button>
                </ButtonGroup>
            </Row>
      </i-col>
    </Row>
    <Page :total="40" size="small" style="padding-top: 15px;"/>

  </div>
</template>
<script>
export default {
  name: 'local-cache-monitoring',
  props: {
    shadow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      cityList: [
        { value: 'New York', label: 'New York' },
        { value: 'London', label: 'London' },
        { value: 'Sydney', label: 'Sydney' },
        { value: 'Ottawa', label: 'Ottawa' },
        { value: 'Paris', label: 'Paris' },
        { value: 'Canberra', label: 'Canberra' }
      ],
      detailColumns: [
        { title: '方法', key: 'function' },
        { title: '接口', key: 'interface' },
        { title: '总响应时间', key: 'total_response_time' },
        { title: '时间占比', key: 'time_occupying_ratio' },
        { title: '平均响应时间', key: 'average_response_time' },
        { title: '调用次数', key: 'call_count' },
        { title: '成功次数', key: 'success_times' },
        { title: '失败次数', key: 'failure_time' },
        { title: '操作', key: 'operation' }
      ],
      detailData: [
        { function: 'POST', interface: 'OPTION', total_response_time: 0, time_occupying_ratio: 111, average_response_time: 999, call_count: 789, success_times: 787, failure_time: 232 },
        { function: 'OPTION', interface: 'OPTION', total_response_time: 0, time_occupying_ratio: 111, average_response_time: 999, call_count: 789, success_times: 787, failure_time: 232 },
        { function: 'GET', interface: 'POST', total_response_time: 0, time_occupying_ratio: 111, average_response_time: 999, call_count: 789, success_times: 787, failure_time: 232 },
        { function: 'POST', interface: 'POST', total_response_time: 0, time_occupying_ratio: 111, average_response_time: 999, call_count: 789, success_times: 787, failure_time: 232 },
        { function: 'POST', interface: 'OPTION', total_response_time: 0, time_occupying_ratio: 111, average_response_time: 999, call_count: 789, success_times: 787, failure_time: 232 },
        { function: 'GET', interface: 'OPTION', total_response_time: 0, time_occupying_ratio: 111, average_response_time: 999, call_count: 789, success_times: 787, failure_time: 232 }
      ],
      localCacheList: [
        { title: '名称', hit_number: 100, hit_rate: '80%', miss_count: 9, cache_count: 20 },
        { title: '名称', hit_number: 100, hit_rate: '80%', miss_count: 9, cache_count: 20 },
        { title: '名称', hit_number: 100, hit_rate: '80%', miss_count: 9, cache_count: 20 },
        { title: '名称', hit_number: 100, hit_rate: '80%', miss_count: 9, cache_count: 20 },
        { title: '名称', hit_number: 100, hit_rate: '80%', miss_count: 9, cache_count: 20 },
        { title: '名称', hit_number: 100, hit_rate: '80%', miss_count: 9, cache_count: 20 },
        { title: '名称', hit_number: 100, hit_rate: '80%', miss_count: 9, cache_count: 20 },
        { title: '名称', hit_number: 100, hit_rate: '80%', miss_count: 9, cache_count: 20 },
        { title: '名称', hit_number: 100, hit_rate: '80%', miss_count: 9, cache_count: 20 }
      ],
      model1: '',
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
      time: []
    }
  }
}
</script>
<style lang="less" scoped>
.local-cache-card-row1{
    padding: 0 10px;
}
.local-cache-card-row1 .rainbow{
    height: 40px;
    width: 40px;
    border-radius: 40px;
    background-color: #2D8CF1;
}
.local-cache-card-row1 .rainbow::before{
    line-height: 40px;
    font-size: 25px;
    color: #fff;
}
.local-cache-card-row1 .local-cache-card-title{
    line-height: 40px;
    font-size: 14px;
    color: #333;
}

.local-cache-card-row2{
    padding: 10px 10px 0px 10px;
}
.local-cache-card-row2 .ivu-col{
    line-height: 30px;
}
.local-cache-card-row2 .ivu-col > span:first-child{
    font-size: 14px;
    color: #666;
    padding-right: 20px;
}
.local-cache-card-row2 .ivu-col > span:nth-child(2){
    font-size: 14px;
    color: #333;
}

.local-cache-card-row3 .ivu-btn-group{
    display: flex;
}
.local-cache-card-row3 .ivu-btn-group .ivu-btn{
    flex-grow: 1;
    border-radius: 0;
    background-color: #F5F5F5;
    font-size: 14px;
    color: #333;
    height: 40px;
}

.local-cache-card{
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    border-bottom: none
}

</style>
