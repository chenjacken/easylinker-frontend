<template>
  <page-view>
    <a-card type="card" :bordered="false">
      <div>
        <a-tabs :activeKey="queryParam.deviceProtocol" @change="handleTabChange">
          <a-tab-pane
            v-for="item in deviceProtocolMap"
            :tab="item.name | deviceProtocolFilter"
            :key="item.key"
          ></a-tab-pane>
          <a-button type="primary" slot="tabBarExtraContent" @click="$refs.createModal.create()">添加设备</a-button>
        </a-tabs>
      </div>
      <div class="table-page-search-wrapper">
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="8" :sm="24">
              <a-form-item label="设备编号">
                <a-input v-model="queryParam.sceneSecurityId" placeholder />
              </a-form-item>
            </a-col>
            <a-col :md="8" :sm="24">
              <a-form-item label="设备名称">
                <a-input v-model="queryParam.name" style="width: 100%" />
              </a-form-item>
            </a-col>
            <template v-if="advanced">
              <a-col :md="8" :sm="24">
                <a-form-item label="设备类型">
                  <a-select v-model="queryParam.deviceType">
                    <a-select-option
                      v-for="item in deviceTypeMap"
                      :key="item.key"
                      :title="item.name"
                    >{{ item.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>

              <a-col :md="8" :sm="24">
                <a-form-item label="设备描述">
                  <a-input-number v-model="queryParam.info" style="width: 100%" />
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="设备状态">
                  <a-select v-model="queryParam.deviceStatus" placeholder="请选择" default-value="0">
                    <a-select-option
                      v-for="item in deviceStatusMap"
                      :key="item.key"
                      :value="item.key"
                    >{{ item.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item optionLabelProp="children" label="所属场景">
                  <a-select
                    v-model="queryParam.sceneSecurityId"
                    placeholder="请选择"
                    default-value="0"
                  >
                    <a-select-option
                      v-for="item in sceneSecurityIdMap"
                      :key="item.key"
                      :value="item.key"
                    >{{ item.name }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
            </template>
            <a-col :md="!advanced && 8 || 24" :sm="24">
              <span
                class="table-page-search-submitButtons"
                :style="advanced && { float: 'right', overflow: 'hidden' } || {} "
              >
                <a-button type="primary" @click="$refs.table.refresh(true)">查询</a-button>
                <a-button style="margin-left: 8px" @click="resetSearchForm">重置</a-button>
                <a @click="toggleAdvanced" style="margin-left: 8px">
                  {{ advanced ? '收起' : '展开' }}
                  <a-icon :type="advanced ? 'up' : 'down'" />
                </a>
              </span>
            </a-col>
          </a-row>
        </a-form>
      </div>

      <s-table
        ref="table"
        size="default"
        rowKey="id"
        :scroll="{ x: scrollWidth}"
        :columns="columns"
        :data="loadData"
        :rowSelection="options.rowSelection"
        showPagination="auto"
      >
        <span class="serial-number" slot="serial" slot-scope="text">
          {{ text | serialFilter }}
        </span>
        <span slot="name" slot-scope="text">
          <ellipsis :length="20" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="info" slot-scope="text">
          <ellipsis :length="20" tooltip>{{ text }}</ellipsis>
        </span>
        <span slot="name" slot-scope="text">
          <ellipsis :length="20" tooltip>{{ text }}</ellipsis>
        </span>

        <span slot="type" slot-scope="text">
          {{ Array.isArray(deviceTypeMap)
            && deviceTypeMap.find(item => item.key === text).name
          }}
        </span>
        <span slot="deviceStatus" slot-scope="text">
          <a-badge :status="text | statusTypeFilter" :text="text | statusFilter" />
        </span>
        <span slot="action" slot-scope="text, record">
          <template>
            <a @click="handleEdit(record)">配置</a>
            <a-divider type="vertical" />
            <a @click="handleDetail(record)">操作</a>
          </template>
        </span>
      </s-table>
      <create-modal ref="createModal" @ok="handleOk" />
    </a-card>
  </page-view>
</template>

<script>
import { STable, Ellipsis } from '@/components'
import { PageView } from '@/layouts'
import CreateModal from './modules/Create'
import { getRoleList } from '@/api/manage'
import { mapActions, mapGetters, mapState } from 'vuex'
import * as deviceColumns from '@/model/device/list'

const statusMap = {
  0: {
    status: 'default',
    text: '关闭'
  },
  1: {
    status: 'processing',
    text: '运行中'
  },
  2: {
    status: 'success',
    text: '已上线'
  },
  3: {
    status: 'error',
    text: '异常'
  },
  UNKNOW: {
    status: 'error',
    text: '未知'
  }
}

export default {
  name: 'TableList',
  components: {
    STable,
    Ellipsis,
    CreateModal,
    PageView
  },
  data () {
    return {
      mdl: {},
      // 高级搜索 展开/关闭
      advanced: false,
      currentProtocol: null,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [],
      selectedRowKeys: [],
      selectedRows: [],
      // custom table alert & rowSelection
      loadData: parameter => this.QueryDeviceList(Object.assign(parameter, this.queryParam)),
      options: {
        alert: {
          show: true,
          clear: () => {
            this.selectedRowKeys = []
          }
        },
        rowSelection: {
          selectedRowKeys: this.selectedRowKeys,
          onChange: this.onSelectChange
        }
      },
      optionAlertShow: false
    }
  },
  computed: {
    ...mapState({
      deviceDataFn: state => state.device.deviceDataFn,
      deviceTypeMap: state => state.device.deviceTypeMap,
      deviceStatusMap: state => state.device.deviceStatusMap,
      deviceProtocolMap: state => state.device.deviceProtocolMap
    }),
    ...mapGetters(['sceneSecurityIdMap']),
    scrollWidth () {
      return this.columns.reduce((acc, value) => {
        if (typeof value.width === 'number') return acc + value.width
        return acc + 200
      }, 0)
    }
  },
  filters: {
    serialFilter (text) {
      return text.replace('SN-', '')
    },
    deviceProtocolFilter (name) {
      return name.replace('协议设备', '').replace('暂不选择协议', '')
    },
    statusFilter (type) {
      return statusMap[type] ? statusMap[type].text : statusMap.UNKNOW.text
    },
    statusTypeFilter (type) {
      return statusMap[type] ? statusMap[type].status : statusMap.UNKNOW.status
    }
  },
  created () {
    this.QueryDeviceType()
    this.tableOption()
    this.QuerySceneList()
    this.QueryDeviceStatus()
    this.QueryDeviceProtocol().then(res => {
      const { deviceProtocolMap } = this
      const deviceProtocol = deviceProtocolMap[0].key
      this.handleTabChange(deviceProtocol)
      this.$refs.table.refresh()
    })
    getRoleList({ t: new Date() })
  },
  methods: {
    ...mapActions([
      'QuerySceneList',
      'QueryDeviceList',
      'QueryDeviceData',
      'QueryDeviceDetail',
      'QueryDeviceType',
      'QueryDeviceProtocol',
      'QueryDeviceStatus',
      'SetDeviceDetail'
    ]),
    tableOption () {
      if (!this.optionAlertShow) {
        this.options = {}
        this.optionAlertShow = true
      } else {
        this.options = {
          alert: false,
          rowSelection: null
        }
        this.optionAlertShow = false
      }
    },
    handleEdit (record) {
      this.$refs.createModal.edit(record)
    },
    handleDetail (record) {
      this.SetDeviceDetail(record)
      this.$router.push(`/device/list/${record.deviceType.toLowerCase()}/${record.securityId}`)
    },
    handleOk (values) {
      const { deviceProtocol } = values
      this.queryParam = { deviceProtocol }
      this.$refs.table.refresh()
    },
    handleTabChange (deviceProtocol) {
      this.queryParam.deviceProtocol = deviceProtocol
      this.$refs.table.refresh().then(r => (this.columns = deviceColumns[`columns${deviceProtocol}`]))
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows = selectedRows
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      const {
        queryParam: { deviceProtocol }
      } = this
      this.queryParam = { deviceProtocol }
    }
  }
}
</script>
