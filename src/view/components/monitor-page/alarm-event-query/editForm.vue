<template>
<Form label-position="right" :label-width="140">
    <FormItem label="发生时间"><DatePicker  v-model="addForm.occurrence_time" type="date" placeholder="选择时间" style="width: 100%"></DatePicker></FormItem>
    <FormItem label="任务类型">
    <Select v-model="addForm.task_type" style="width: 100%">
        <Option v-for="item in taskList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    </FormItem>
    <FormItem label="等级">
        <Rate v-model="addForm.grade" />
    </FormItem>
    <FormItem label="结束时间">
        <DatePicker  v-model="addForm.end_time" type="date" placeholder="选择时间" style="width: 100%"></DatePicker>
    </FormItem>
    <FormItem label="归属应用">
    <Select v-model="addForm.attribution_application" style="width: 100%">
        <Option v-for="item in serviceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
    </FormItem>
    <FormItem label="归属接口"><Input v-model="addForm.attribution_nterface"/></FormItem>
    <FormItem label="接口描述"><Input v-model="addForm.interface_description"/></FormItem>
    <FormItem label="告警信息"><Input v-model="addForm.alarm_information"/></FormItem>
    <FormItem label="当前值"><Input v-model="addForm.current_value"/></FormItem>
</Form>
</template>
<script>
export default {
  name: 'edit_form',
  props: {
    addForm: Object
  },
  data () {
    return {
      serviceList: [
        { value: 'All', label: '今日所有告警' },
        { value: 'API', label: 'API告警' },
        { value: 'Batch', label: 'Batch告警' },
        { value: 'Fuse', label: '熔断告警' }
      ],
      taskList: [
        { value: 'OPTION', label: 'OPTION' },
        { value: 'POST', label: 'POST' },
        { value: 'GET', label: 'GET' }
      ]
    }
  }
}
</script>
<style>
</style>
