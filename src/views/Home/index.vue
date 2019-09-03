<template>
  <div class="page-header-index-wide">
    <a-row :gutter="16">
      <a-col :sm="24" :xl="15">
        <a-row :gutter="6" style="margin-bottom:6px">
          <a-col class="device-count-list">
            <div class="list-item">
              <chart-card
                :loading="loading"
                :title="simplify?'MQTT':'MQTT设备'"
                :total="analyzeData.deviceCount.MQTT.total"
              >
                <a-tooltip v-show="!simplify" title="MQTT设备情况" slot="action">
                  <a-icon type="info-circle-o" />
                </a-tooltip>
                <div>
                  <span flag="up" style="margin-right: 16px;">
                    <span slot="term">在线</span>
                    {{ analyzeData.deviceCount.MQTT.online }}
                  </span>
                  <span flag="down">
                    <span slot="term">离线</span>
                    {{ analyzeData.deviceCount.MQTT.total - analyzeData.deviceCount.MQTT.online }}
                  </span>
                </div>
              </chart-card>
            </div>
            <div class="list-item">
              <chart-card
                :loading="loading"
                :title="simplify?'TCP':'TPC设备'"
                :total="analyzeData.deviceCount.TCP"
              >
                <a-tooltip v-show="!simplify" title="TCP设备情况" slot="action">
                  <a-icon type="info-circle-o" />
                </a-tooltip>
                <div>
                  <span flag="up" style="margin-right: 16px;">
                    <span slot="term">在线</span>
                    {{ analyzeData.deviceCount.TCP }}
                  </span>
                  <span flag="down">
                    <span slot="term">离线</span>
                    0
                  </span>
                </div>
              </chart-card>
            </div>
            <div class="list-item">
              <chart-card
                :loading="loading"
                :title="simplify?'CoAP':'CoAP设备'"
                :total="analyzeData.deviceCount.CoAP"
              >
                <a-tooltip v-show="!simplify" title="CoAP设备情况" slot="action">
                  <a-icon type="info-circle-o" />
                </a-tooltip>
                <div>
                  <span flag="up" style="margin-right: 16px;">
                    <span slot="term">总数</span>
                    {{ analyzeData.deviceCount.CoAP }}
                  </span>
                </div>
              </chart-card>
            </div>
            <div class="list-item">
              <chart-card
                :loading="loading"
                :title="simplify?'HTTP':'HTTP设备'"
                :total="analyzeData.deviceCount.HTTP"
              >
                <a-tooltip v-show="!simplify" title="HTTP设备情况" slot="action">
                  <a-icon type="info-circle-o" />
                </a-tooltip>
                <div>
                  <span flag="up" style="margin-right: 16px;">
                    <span slot="term">总数</span>
                    {{ analyzeData.deviceCount.HTTP }}
                  </span>
                </div>
              </chart-card>
            </div>
            <div class="list-item">
              <chart-card
                :loading="loading"
                :title="simplify?'UDP':'UDP设备'"
                :total="analyzeData.deviceCount.UDP"
              >
                <a-tooltip v-show="!simplify" title="UDP设备情况" slot="action">
                  <a-icon type="info-circle-o" />
                </a-tooltip>
                <div>
                  <span flag="up" style="margin-right: 16px;">
                    <span slot="term">总数</span>
                    {{ analyzeData.deviceCount.HTTP }}
                  </span>
                </div>
              </chart-card>
            </div>
          </a-col>
        </a-row>
        <a-row :gutter="6">
          <a-col :xl="24">
            <a-card
              class="antd-pro-pages-dashboard-analysis-salesCard"
              :loading="loading"
              :bordered="false"
              :style="{ marginBottom: '12px', height: '375px' }"
            >
              <a-row>
                <a-col :xl="12">
                  <v-chart :force-fit="true" :height="320" :data="pieData" :scale="pieScale">
                    <v-tooltip :showTitle="false" data-key="item*percent" />
                    <v-legend data-key="item" />
                    <v-pie position="percent" color="item" :vStyle="pieStyle" />
                    <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
                  </v-chart>
                </a-col>
                <a-col :xl="12">
                  <v-chart :force-fit="true" :height="320" :data="pieData" :scale="pieScale">
                    <v-tooltip :showTitle="false" data-key="item*percent" />
                    <v-axis />
                    <v-legend data-key="item" />
                    <v-pie position="percent" color="item" :vStyle="pieStyle" />
                    <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
                  </v-chart>
                </a-col>
              </a-row>
            </a-card>
          </a-col>
        </a-row>
      </a-col>
      <a-col :sm="24" :xl="9">
        <a-card :bordered="false">
          <log-list style="height:500px" title="重要日志" :list="this.logList" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { ChartCard, MiniArea, MiniBar, MiniProgress, Bar, Trend, NumberInfo, MiniSmoothArea } from '@/components'
import LogList from './components/LogList'
import { mixinDevice, mixinWindowSize } from '@/utils/mixin'
import { queryAnalyzeData, querySyslogListByUser } from '@/api/analysis'
import { PageView } from '@/layouts'
const DataSet = require('@antv/data-set')

const sourceData = [
  { item: 'MQTT', count: 0 },
  { item: 'TCP', count: 0 },
  { item: 'CoAP', count: 0 },
  { item: 'HTTP', count: 0 },
  { item: 'UDP', count: 0 }
]

const pieScale = [
  {
    dataKey: 'percent',
    min: 0,
    formatter: '.0%'
  }
]

export default {
  name: 'Analysis',
  mixins: [mixinDevice, mixinWindowSize],
  components: {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    LogList,
    Bar,
    Trend,
    NumberInfo,
    MiniSmoothArea,
    PageView
  },
  data () {
    return {
      loading: true,
      logList: [],
      // 查询参数
      queryParam: {
        page: 0,
        size: 10
      },
      // 精简展示 统计表格
      simplify: false,
      tooltipShow: true,
      sourceData,
      // 日志信息
      analyzeLogMap: {},
      // 分析状态数据
      analyzeData: {
        deviceCount: {
          MQTT: {
            total: 0,
            online: 0
          },
          TCP: 0,
          UDP: 0,
          HTTP: 0,
          CoAP: 0,
          scene: 0
        },
        typeCount: {
          TEXT: 0,
          SWITCH: 0,
          VALUE: 0,
          FILE: 0,
          BOOLEAN: 0
        }
      },
      pieScale,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      }
    }
  },
  watch: {
    windowSize (value) {
      this.updateSimplify()
    }
  },
  computed: {
    pieData () {
      const dv = new DataSet.View().source(this.sourceData)
      dv.transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
      })
      const pieData = dv.rows
      return pieData
    }
  },
  created () {
    queryAnalyzeData().then(res => {
      this.analyzeData = res.data
      // 目前存在更改pieData数据时不改变的问题。。。
      sourceData[0].count = this.analyzeData.deviceCount.MQTT.total
      sourceData[1].count = this.analyzeData.deviceCount.TCP
      sourceData[2].count = this.analyzeData.deviceCount.CoAP
      sourceData[3].count = this.analyzeData.deviceCount.HTTP
      sourceData[4].count = this.analyzeData.deviceCount.UDP
      this.sourceData = sourceData
      this.loading = !this.loading
    })
    querySyslogListByUser(Object.assign(this.queryParam)).then(res => {
      this.analyzeLogMap = res.data.content
      console.log(this.analyzeLogMap)
      for (let i = 0; i < 6; i++) {
        if (this.analyzeLogMap[i]) {
          this.logList.push({
            name: this.analyzeLogMap[i].info,
            date: this.dateFormat(this.analyzeLogMap[i].createTime)
          })
        }
      }
    })
  },
  mounted () {
    this.$nextTick(() => this.updateSimplify())
  },
  methods: {
    dateFormat: function (timeStamp) {
      var date = new Date(timeStamp)
      var Y = date.getFullYear() + '-'
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
      var D = date.getDate() + ' '
      var h = date.getHours() + ':'
      var m = date.getMinutes() + ':'
      var s = date.getSeconds()
      return Y + M + D + h + m + s
    },
    updateSimplify () {
      const { width } = this.windowSize
      if (width > 1680) this.simplify = false
      else if (width >= 1200) this.simplify = true
      else if (width < 850) this.simplify = true
      else this.simplify = false
    }
  }
}
</script>

<style lang="less" scoped>
@import '~ant-design-vue/lib/style/index';
.extra-wrapper {
  line-height: 55px;
  padding-right: 24px;

  .extra-item {
    display: inline-block;
    margin-right: 24px;

    a {
      margin-left: 24px;
    }
  }
}

.device-count-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  padding: 0;

  .list-item {
    flex: 1;
    margin: 0 5px;

    &:first-child,
    &:last-child {
      margin: 0;
    }
  }

  @media screen and (max-width: @screen-xs) {
    .list-item {
      flex: 100%;
      margin: 6px 5px !important;
    }
  }
}

.antd-pro-pages-dashboard-analysis-twoColLayout {
  position: relative;
  display: flex;
  display: block;
  flex-flow: row wrap;

  &.desktop div[class^='ant-col']:last-child {
    position: absolute;
    right: 0;
    height: 100%;
  }
}

.antd-pro-pages-dashboard-analysis-salesCard {
  height: calc(100% - 24px);
  /deep/ .ant-card-head {
    position: relative;
  }
}

.dashboard-analysis-iconGroup {
  i {
    margin-left: 16px;
    color: rgba(0, 0, 0, 0.45);
    cursor: pointer;
    transition: color 0.32s;
    color: black;
  }
}
.analysis-salesTypeRadio {
  position: absolute;
  right: 54px;
  bottom: 12px;
}
</style>
