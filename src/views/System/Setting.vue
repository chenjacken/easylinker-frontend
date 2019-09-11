<template>
  <div class="page-header-index-wide">
    <a-row>
      <line-chart
        id="line"
        :chartData="chartData"
      ></line-chart>
    </a-row>
  </div>
</template>

<script>
import { LineChart } from '@/components'
import { getDeviceData } from '@/api/device'
export default {
  components: {
    LineChart
  },
  data () {
    return {
      chartData: []
    }
  },
  created () {
    getDeviceData().then(res => {
      this.chartData = res.data.content
    })
  }
}
</script>

<style>
</style>
