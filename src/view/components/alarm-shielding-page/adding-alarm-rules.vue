<template>
   <div>
        <Form label-position="top" inline class="alarmForm">
                <FormItem label="任务描述">
                <Select v-model="model1">
                    <!-- <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
                </Select>
            </FormItem>
            <FormItem label="任务间隔">
                <Select v-model="model1">
                    <!-- <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
                </Select>
            </FormItem>
            <FormItem label="检测指标">
                <Select v-model="model1">
                    <!-- <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
                </Select>
            </FormItem>
            <FormItem label="时间范围">
                <Input v-model="model1"></Input>
            </FormItem>
            <FormItem label="归属接口">
                <Input v-model="model1"></Input>
            </FormItem>
            <FormItem label="接口描述">
                <Input v-model="model1"></Input>
            </FormItem>
            <FormItem label="环比">
                <Select v-model="model1">
                    <!-- <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
                </Select>
            </FormItem>
            <FormItem label="环比方式">
                <Select v-model="model1">
                    <!-- <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
                </Select>
            </FormItem>
            <FormItem label="条件">
                <Select v-model="model1">
                    <!-- <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
                </Select>
            </FormItem>
            <FormItem label="阈值">
                <Input v-model="model1"></Input>
            </FormItem>
            <FormItem label="等级">
                <Select v-model="model1">
                    <!-- <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
                </Select>
            </FormItem>
            <FormItem label="归属应用">
                <Select v-model="model1">
                    <!-- <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option> -->
                </Select>
            </FormItem>
            <FormItem label="指定数据源">
                <Input v-model="model1"></Input>
            </FormItem>
        </Form>
    </div>
</template>

<script>

export default {
  name: 'addingAlarmRules',
  props: {
  },
  data () {
    return {
      model1: ''
    }
  },
  methods: {
  },
  mounted () {
  }
}
</script>
<style lang="less" scoped>
.alarmForm > .ivu-form-item{
    width: 25%;
    margin-right: 0px;
}
.alarmForm > .ivu-form-item > .ivu-form-item-content > div{
    padding-right: 5px;
}
</style>
