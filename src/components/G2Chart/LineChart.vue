<template lang="">
  <a-card :loading="loading" :body-style="{ padding: '24px' }" :bordered="false">
    <div :id="id"></div>
  </a-card>
</template>

<script>
import G2 from '@antv/g2'
// import { dateFormat } from '@/utils/dateUtils'
import { DataSet } from '@antv/data-set'
export default {
  name: 'LineChart',
  data () {
    return {
      chart: null
    }
  },
  props: {
    id: {
      type: String,
      required: true
    },
    chartData: {
      type: Array,
      default: function () {
        return [{ 'field': 'hum', 'createTime': '2019-09-11 12:00:13', 'value': 4.09 },
          { 'field': 'hum', 'createTime': '2019-09-11 12:04:33', 'value': 6.09 },
          { 'field': 'hum', 'createTime': '2019-09-11 12:07:23', 'value': 3.09 },
          { 'field': 'lex', 'createTime': '2019-09-11 12:02:43', 'value': 7.65 },
          { 'field': 'lex', 'createTime': '2019-09-11 12:05:23', 'value': 10.65 },
          { 'field': 'lex', 'createTime': '2019-09-11 12:08:53', 'value': 3.65 }
        ]
      }
    },
    loading: {
      type: Boolean,
      default: false
    }
  },

  watch: {
    chartData: function (val, oldVal) {
      this.chart.changeData(val)
    }
  },

  created () {
  },

  mounted () {
    this.initChart(this.chartData)
    const e = document.createEvent('Event')
    e.initEvent('resize', true, true)
    window.dispatchEvent(e)
  },

  methods: {
    initChart (chartData) {
      this.chart && this.chart.destory()
      var ds = new DataSet()
      var dv = ds.createView().source(chartData)
      this.chart = new G2.Chart({
        container: this.id,
        forceFit: true,
        height: 300,
        padding: [10, 10, 70, 30]
      })
      this.chart.source(dv, { 'createTime': { type: 'time', mask: 'HH:mm:ss' } })
      this.chart.line().position('createTime*value').color('field').shape('smooth')
      this.chart.point().position('createTime*value').color('field').size(4).shape('circle').style({
        stroke: '#fff',
        lineWidth: 1
      })
      this.chart.render()
    }
  }
}
</script>

<style lang="less" scoped>
</style>
