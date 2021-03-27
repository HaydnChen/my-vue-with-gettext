<template>
  <Card :shadow="shadow" :padding="0">
    <Tabs value="name1" class="tab-card">
        <TabPane label="全部" name="name1">
            <Collapse v-model="value2" simple accordion>
                <Panel name="1">
                    配置子系统（12）
                    <div slot="content">
                        <div v-for="(item, index) in list1" :key="`collapse_li1_${index}`">
                            <p @click="itemModalClick(item)">{{item.value}}</p>
                        </div>
                    </div>
                </Panel>
                <Panel name="2">
                    帮助子系统（100）
                    <p slot="content"></p>
                </Panel>
                <Panel name="3">
                    运维子系统（0）
                    <p slot="content"></p>
                </Panel>
                <Panel name="4">
                    承保子系统（3）
                    <p slot="content"></p>
                </Panel>
                <Panel name="5">
                    产品工厂子系统（120）
                    <p slot="content"></p>
                </Panel>
                <Panel name="5">
                    报表子系统（20）
                    <p slot="content"></p>
                </Panel>
                <Panel name="6">
                    再保子系统（0）
                    <p slot="content"></p>
                </Panel>
                <Panel name="7">
                    监管平台子系统（13）
                    <p slot="content"></p>
                </Panel>
            </Collapse>
        </TabPane>
        <TabPane label="正常" name="name2">标签二的内容</TabPane>
        <TabPane label="告警" name="name3">标签三的内容</TabPane>
        <TabPane label="危险" name="name3">标签三的内容</TabPane>
    </Tabs>
    <Modal
        v-model="itemModal"
        width="80%"
        class="tab-card-modal"
        v-if="showItemModal">
        <p slot="title"></p>
        <modal-content />
        <p slot="footer"></p>
    </Modal>
  </Card>
</template>
<script>
import echarts from 'echarts'
import tdTheme from '@/components/charts/theme.json'
import CountTo from '_c/count-to'
import '@/index.less'
import ModalContent from '@/view/components/monitor-page/micro-service-monitoring-card/modal-content'
echarts.registerTheme('tdTheme', tdTheme)
export default {
  name: 'main-card',
  components: {
    CountTo,
    ModalContent
  },
  props: {
    shadow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      list1: [
        { value: 'batch' },
        { value: 'config-server' },
        { value: 'plateform-busi-config' },
        { value: 'urp' },
        { value: 'workflow' }
      ],
      value2: '1',
      itemModal: false,
      showItemModal: false
    }
  },
  methods: {
    itemModalClick () {
      this.itemModal = true
      this.showItemModal = true
    }
  },
  mounted () {
  }
}
</script>
<style lang="less">
.tab-card{
    height: 418px;
}
.tab-card .ivu-tabs-nav-scroll{
    text-align: center;
}
.tab-card .ivu-tabs-nav-scroll > .nav-text{
    float: none;
    display: inline-block;
}
.tab-card > .ivu-tabs-bar{
    margin-bottom: 0px;
}
.tab-card > .ivu-tabs-content{
    overflow-y: auto;
    height: 383px;
}
.tab-card .ivu-collapse-content-box p{
    padding: 5px 0 5px 25px;
}
// .tab-card .ivu-menu-vertical .ivu-menu-item{
//     padding: 6px 10px;
// }
// .tab-card .ivu-menu-vertical .ivu-menu-submenu-title{
//     padding: 6px 10px;
// }
.tab-card .ivu-collapse-content-box{
    padding-bottom: 0;

}

.tab-card-modal .ivu-modal-body{
    padding-top: 0;
    padding-bottom: 0;
}
</style>
