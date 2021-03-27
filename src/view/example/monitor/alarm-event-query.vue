<template>
  <div id="demo">
    <Row className="tiling-card-wrap">
      <i-col :xs="24" :md="24" :lg="24" style="margin-bottom: 20px">
        <Card>
          <p slot="title">告警事件查询(接口案例)</p>
          <div class="api-title-search-section">
            <Input v-model="searchPath" placeholder="请输入任务类型（OPTION/POST）" style="width: 500px">
                <Select v-model="searchName" clearable slot="prepend" style="width: 150px" placeholder="告警归属应用">
                     <Option v-for="item in serviceList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
                <Button type="primary" slot="append" @click="search">搜索</Button>
            </Input>
            <Button type="primary" ghost @click="addNew">新增</Button>
          </div>
        </Card>
      </i-col>
    </Row>
    <Row>
      <i-col :xs="24" :md="24" :lg="24" style="margin-bottom: 20px;">
        <Card>
          <p slot="title">告警列表</p>
          <Table stripe :columns="detailColumns" :data="detailData" class="detailTable" size="small"></Table>
          <Page :current="detailCurrentPage" :total="dataCount" :page-size="pageSize" show-total  size="small" @on-change="changeDetailpage"></Page>
        </Card>
      </i-col>
    </Row>
    <Modal
        v-model="modal1"
        title="新增"
        @on-ok="addOk">
        <edit-form :addForm="addForm"></edit-form>
    </Modal>
    <Modal
        v-model="modal2"
        title="查看／修改"
        @on-ok="editorOk">
        <edit-form :addForm="editorForm"></edit-form>
    </Modal>
  </div>
</template>
<script>
import editForm from '@/view/components/monitor-page/alarm-event-query/editForm'
import { getData, removeData, addData, editData } from '@/api/data.js'
export default {
  name: 'demo',
  components: {
    editForm
  },
  data () {
    return {
      modal1: false,
      modal2: false,
      addForm: {},
      editorForm: {},
      detailCurrentPage: 1,
      editorIndex: 0,
      serviceList: [
        { value: 'All', label: '今日所有告警' },
        { value: 'API', label: 'API告警' },
        { value: 'Batch', label: 'Batch告警' },
        { value: 'Fuse', label: '熔断告警' }
      ],
      detailColumns: [
        { title: '发生时间', key: 'occurrence_time' },
        { title: '任务类型', key: 'task_type' },
        { title: '等级', key: 'grade' },
        { title: '结束时间', key: 'end_time' },
        { title: '归属应用', key: 'attribution_application' },
        { title: '归属接口', key: 'attribution_nterface' },
        { title: '接口描述', key: 'interface_description' },
        { title: '告警信息', key: 'alarm_information' },
        { title: '当前值', key: 'current_value' },
        {
          title: '操作',
          key: 'action',
          width: 80,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('icon', {
                props: {
                  type: 'md-create'
                },
                style: {
                  marginRight: '5px',
                  fontSize: '16px'
                },
                on: {
                  click: () => {
                    this.show(params.index)
                  }
                }
              }),
              h('Poptip', {
                props: {
                  confirm: true,
                  title: '确认删除此条数据？'
                },
                style: {
                  fontSize: '16px'
                },
                on: {
                  'on-ok': () => {
                    this.remove(params.index)
                  }
                }
              }, [
                h('icon', {
                  props: {
                    type: 'md-trash'
                  },
                  style: {
                    marginRight: '5px',
                    fontSize: '16px'
                  }
                })
              ])
            ])
          }
        }
      ],
      ajaxdetailData: [],
      dataCount: 0,
      pageSize: 5,
      detailData: [],
      searchName: '',
      searchPath: '',
      detailIndex: 1
    }
  },
  mounted () {
    this.detailIndex = 1
    this.searchName = this.$route.query.model1
  },
  watch: {
    $route (to) {
      this.searchName = this.$route.query.model1
    }
  },
  methods: {
    handleListApproveHistory (originalData) {
      this.ajaxdetailData = originalData
      this.dataCount = originalData.length
      if (this.dataCount < this.pageSize) {
        this.detailData = this.ajaxdetailData
      } else {
        this.detailData = this.ajaxdetailData.slice(0, this.pageSize)
      }
    },
    changeDetailpage (index) {
      this.detailIndex = index
      var _start = (index - 1) * this.pageSize
      var _end = index * this.pageSize
      this.detailData = this.ajaxdetailData.slice(_start, _end)
    },
    show (index) {
      this.modal2 = true
      this.editorForm = JSON.parse(JSON.stringify(this.ajaxdetailData[(this.detailIndex - 1) * this.pageSize + index]))
      this.editorIndex = (this.detailIndex - 1) * this.pageSize + index
    },
    async remove (index) {
      const removeDataList = await removeData((this.detailIndex - 1) * this.pageSize + index)
      this.handleListApproveHistory(removeDataList)
    },
    addNew () {
      this.modal1 = true
      this.addForm = {}
    },
    async addOk () {
      const addDataList = await addData(this.addForm)
      this.handleListApproveHistory(addDataList)
    },
    async editorOk () {
      const editorList = await editData(this.editorIndex, this.editorForm)
      this.handleListApproveHistory(editorList)
    },
    async search () {
      this.detailIndex = 1
      let name = this.searchName
      let path = this.searchPath
      this.ajaxdetailData = await getData(name, path)
      this.handleListApproveHistory(this.ajaxdetailData)
      this.detailCurrentPage = 1
    }
  },
  async created () {
    const originalData = await getData()
    this.handleListApproveHistory(originalData)
  }
}
</script>
<style lang="less">
.api-title-search-section{
  display: inline-block;
  width: 100%;
  text-align: center;
}
.api-title-search-section > div{
  display: inline-table;
  top: 0;
  margin-right: 10px;
}
.ivu-poptip-body{
  text-align: left
}
</style>
