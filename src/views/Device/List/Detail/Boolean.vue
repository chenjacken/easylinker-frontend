
<template>
  <page-view
    :title="`设备编号：${detail.sn}`"
    logo="https://gw.alipayobjects.com/zos/rmsportal/nxkuOJlFJuAUhzlMTCEe.png"
  >
    <detail-list slot="headerContent" size="small" :col="2" class="detail-layout">
      <detail-list-item term="设备名">{{ detail.name }}</detail-list-item>
      <detail-list-item term="所属场景">{{ getNameByKey(sceneSecurityIdMap, detail.sceneSecurityId) }}</detail-list-item>
      <detail-list-item term="创建时间">{{ detail.createTime | moment }}</detail-list-item>
      <detail-list-item
        term="设备类型"
      >{{ getNameByKey(deviceProtocolMap, detail.deviceProtocol) }} | {{ getNameByKey(deviceTypeMap, detail.deviceType) }}</detail-list-item>
      <detail-list-item term="更新时间">{{ detail.updateTime | moment }}</detail-list-item>
      <detail-list-item term="备注">{{ detail.info }}</detail-list-item>
    </detail-list>
    <a-row slot="extra" class="extra">
      <div class="code-image">
        <vue-qrcode :val="detail.sn"></vue-qrcode>
        <code128 :val="detail.sn"></code128>
      </div>
      <!-- <div class="status-list">
          <div class="text">
            连接状态
            <span class="heading">在线</span>
          </div>

          <div class="text">
            开关状态
            <span class="heading">开启</span>
          </div>
        </div>-->
    </a-row>
    <!-- actions -->
    <template slot="action">
      <a-button-group>
        <a-button type="primary" @click="handleOn">打开</a-button>
        <a-button @click="handleOff">关闭</a-button>
      </a-button-group>
    </template>

    <!-- 操作 -->
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      :tabList="tabList"
      :activeTabKey="activeTabKey"
      @tabChange="(key) => {this.activeTabKey = key}"
    >
      <s-table
        rowKey="securityId"
        ref="operationEchoTable"
        v-show="activeTabKey === '1'"
        :columns="dataColumn"
        :data="deviceDataDataSource"
        showPagination="auto"
      >
        <template slot="status" slot-scope="status">
          <a-badge :status="status | statusTypeFilter" :text="status | statusFilter" />
        </template>
      </s-table>
      <s-table
        rowKey="securityId"
        ref="operationTable"
        v-show="activeTabKey === '2'"
        :columns="operateColumn"
        :data="deviceOperateLogDataSource"
        showPagination="auto"
      >
        <template slot="status" slot-scope="status">
          <a-badge :status="status | statusTypeFilter" :text="status | statusFilter" />
        </template>
      </s-table>
    </a-card>
  </page-view>
</template>

<script>
import VueQrcode from '@chenfengyuan/vue-qrcode'
import { dataColumn, operateColumn } from '@/model/device/detail'
import { mapActions, mapState, mapGetters } from 'vuex'
import { mixinDevice, mixinMqtt, mixinSelectMap } from '@/utils/mixin'
import { PageView } from '@/layouts'
import { STable } from '@/components'
import DetailList from '@/components/tools/DetailList'
import Code128 from '@/components/tools/Code128'
const DetailListItem = DetailList.Item

export default {
  name: 'Advanced',
  components: {
    PageView,
    DetailList,
    DetailListItem,
    STable,
    VueQrcode,
    Code128
  },
  mixins: [mixinDevice, mixinMqtt, mixinSelectMap],
  mounted () {
    if (Object.keys(this.detail).length === 0) return this.$router.push('/device/list')
    this.refreshTable()
  },
  watch: {
    $route () {
      this.refreshTable()
    }
  },
  data () {
    return {
      switch: null,
      queryParam: {},
      dataColumn,
      operateColumn,
      tabList: [
        {
          key: '1',
          tab: '设备数据'
        },
        {
          key: '2',
          tab: '操作日志'
        }
      ],
      activeTabKey: '1',
      deviceOperateLogDataSource: parameter =>
        this.QueryDeviceOperateLogList(Object.assign(parameter, this.queryParam)),
      deviceDataDataSource: parameter => this.QueryDeviceDataList(Object.assign(parameter, this.queryParam))
    }
  },
  computed: {
    ...mapGetters(['sceneSecurityIdMap']),
    ...mapState({
      detail: state => state.device.detail,
      deviceTypeMap: state => state.device.deviceTypeMap,
      deviceStatusMap: state => state.device.deviceStatusMap,
      deviceProtocolMap: state => state.device.deviceProtocolMap,
      deviceOperationColumns: state => state.device.operationColumns,
      deviceUploadColumns: state => state.device.uploadColumns
    })
  },
  methods: {
    ...mapActions(['QueryDeviceOperateLogList', 'QueryDeviceDataList']),
    refreshTable () {
      const { securityId, deviceType } = this.detail
      this.queryParam = { deviceSecurityId: securityId, deviceType }
      this.$refs.operationEchoTable.refresh()
      this.$refs.operationTable.refresh()
    },
    handleOn () {
      this.publish(1)
    },
    handleOff () {
      this.publish(0)
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        agree: '成功',
        reject: '失败'
      }
      return statusMap[status]
    },
    statusTypeFilter (type) {
      const statusTypeMap = {
        agree: 'success',
        reject: 'error'
      }
      return statusTypeMap[type]
    }
  }
}
</script>

<style lang="less" scoped>
.detail-layout {
  margin-left: 44px;
}

.text {
  color: rgba(0, 0, 0, 0.45);
}

.heading {
  color: rgba(0, 0, 0, 0.85);
  font-size: 20px;
}

.no-data {
  color: rgba(0, 0, 0, 0.25);
  text-align: center;
  line-height: 64px;
  font-size: 16px;

  i {
    font-size: 24px;
    margin-right: 16px;
    position: relative;
    top: 3px;
  }
}

.extra {
  .code-image {
    flex: 300px 0 0;
  }
}

.mobile {
  .detail-layout {
    margin-left: unset;
  }
}
</style>
