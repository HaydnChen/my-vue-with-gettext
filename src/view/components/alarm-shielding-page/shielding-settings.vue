<template>
    <div class="ShieldingSettingModal" style="padding : 20px">
        <Form label-position="left" inline :label-width="80">
                <FormItem label="屏蔽名称">
                <Input v-model="shieldingName" placeholder="Please input somthing" style="width: 200px"></Input>
            </FormItem>
        </Form>
        <hr/>
        <p class="Subheading">屏蔽时长</p>
        <Form label-position="left" inline :label-width="80">
            <FormItem label="开始时间">
                 <TimePicker type="time" placeholder="Select time" style="width: 150px;margin-right: 100px"></TimePicker>
            </FormItem>
            <FormItem label="持续小时数">
                <InputNumber :max="10" :min="1" v-model="value1"></InputNumber>
            </FormItem>
            <FormItem label="持续分钟数">
                <Input v-model="shieldingName" style="width: 80px"></Input>
            </FormItem>
        </Form>
        <hr/>
        <p class="Subheading">屏蔽周期</p>
        <Row style="padding-bottom: 20px">
            <i-col :xs="3" :md="3" :lg="3" class="radioGroup">
                <RadioGroup v-model="radioGroup" vertical @on-change="weekGroupChange">
                    <Radio label="once">
                        <span>一次</span>
                    </Radio>
                    <Radio label="day">
                        <span>每日</span>
                    </Radio>
                    <Radio label="week">
                        <span>每周</span>
                    </Radio>
                    <Radio label="month">
                        <span>每月</span>
                    </Radio>
                </RadioGroup>
            </i-col>
            <i-col :xs="21" :md="21" :lg="21" class="cycleGroup">
                <CheckboxGroup v-model="value2" v-if="weekShow">
                    <Checkbox label="周日"></Checkbox>
                    <Checkbox label="周一"></Checkbox>
                    <Checkbox label="周二"></Checkbox>
                    <Checkbox label="周三"></Checkbox>
                    <Checkbox label="周四"></Checkbox>
                    <Checkbox label="周五"></Checkbox>
                    <Checkbox label="周六"></Checkbox>
                </CheckboxGroup>
                <ul class="monthShow" v-if="monthShow">
                    <li v-for="(item , index) in everyDay" :key="index" :class="item.show ? 'every_active' : 'every_normal'"  @click="monthShowCelect(item,index)">
                    {{ item.value }}
                    </li>
                </ul>
            </i-col>
        </Row>
        <hr/>
        <p class="Subheading">屏蔽范围</p>
        <Row>
            <i-col :xs="8" :md="8" :lg="8">
                <DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
            </i-col>
            <i-col :xs="8" :md="8" :lg="8">
                <RadioGroup v-model="radioTimeGroup" horizontal class="radioTimeGroup">
                    <Radio label="nobegin">
                        <span>无结束日期</span>
                    </Radio>
                    <Radio label="begin">
                        结束日期：<DatePicker type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                    </Radio>
                </RadioGroup>
            </i-col>
        </Row>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'ShieldingSettings',
  props: {
  },
  data () {
    return {
      shieldingName: '',
      value1: 1,
      value2: ['周一'],
      radioGroup: 'once',
      weekShow: false,
      monthShow: false,
      everyDay: [],
      radioTimeGroup: 'nobegin'
    }
  },
  methods: {
    weekGroupChange (item) {
      if (item === 'week') {
        this.weekShow = true
        this.monthShow = false
      } else if (item === 'month') {
        this.monthShow = true
        this.weekShow = false
      } else {
        this.weekShow = false
        this.monthShow = false
      }
    },
    monthShowCelect (item, index) {
      Vue.set(this.everyDay, index, { value: `${item.value}`, show: !item.show })
    }
  },
  mounted () {
    for (let i = 0; i < 31; i++) {
      this.everyDay[i] = { value: `${i + 1}`, show: false }
    }
  }
}
</script>
<style lang="less" scoped>
.ShieldingSettingModal .radioGroup{
    border-right: 1px solid #f2f2f2;
}
.cycleGroup{
    padding-left: 20px;
}
.monthShow > li{
    display: inline-block;
    height: 26px;
    width: 26px;
    line-height: 22px;
    text-align: center;
    border: 2px solid transparent;
    border-radius: 5px;
    margin-right: 20px;
    margin-bottom: 10px;
    cursor: pointer;
}
.monthShow > li.every_active{
    border: 2px solid #2d8cf0;
    position: relative;
}
.monthShow > li.every_active:before{
    content: "";
    height: 4px;
    width: 4px;
    background-color: #2d8cf0;
    border-radius: 2px;
    position: absolute;
    top: 2px;
    right: 2px;
}
.radioTimeGroup > .ivu-radio-wrapper{
    line-height: 32px;
}
</style>
