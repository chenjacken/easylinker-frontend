<template>
  <a-modal :width="650" :visible="visible" @cancel="handleCancel" @ok="handleSubmit">
    <div class="container">
      <a-tabs :activeKey="activeKey" @change="handleTabChange">
        <a-tab-pane tab="纯文本" :key="0">
          <a-textarea v-model="currentText" placeholder="输入发送的文字" :rows="15" />
        </a-tab-pane>
        <a-tab-pane tab="JSON" :key="1">
          <a-textarea v-model="currentJSON" placeholder="输入发送的JSON" :rows="15" />
        </a-tab-pane>
        <a-button
          v-show="activeKey===1"
          class="format-button"
          slot="tabBarExtraContent"
          @click="handleFormat"
        >格式化JSON</a-button>
      </a-tabs>
    </div>
  </a-modal>
</template>

<script>
import { message } from 'ant-design-vue'
export default {
  data () {
    return {
      activeKey: 0,
      visible: false,
      currentText: '',
      currentJSON: ''
    }
  },
  methods: {
    create () {
      this.visible = true
    },
    reset () {
      this.activeKey = 0
      this.currentText = ''
      this.currentJSON = ''
    },
    handleCancel () {
      this.visible = false
      this.reset()
    },
    handleSubmit () {
      if (this.activeKey === 1) {
        try {
          const obj = JSON.parse(this.currentJSON)
          if (typeof obj === 'object' && obj) {
          } else {
            message.warning('格式错误！')
            return
          }
        } catch (error) {
          message.warning('格式错误！')
          return
        }
      }
      const value = this.activeKey === 0 ? this.currentText : JSON.stringify(JSON.parse(this.currentJSON))
      if (!value) return message.warning('数据为空！')
      this.$emit('send', value)
      this.handleCancel()
    },
    handleTabChange (e) {
      this.activeKey = e
    },
    handleFormat () {
      let ret = ''
      try {
        ret = JSON.stringify(JSON.parse(JSON.stringify(this.currentJSON)), null, '\t')
        this.currentJSON = ret
      } catch (error) {
        message.warning('格式错误！')
      }
    }
  }
}
</script>

<style>
.container {
  margin-top: 20px;
}
</style>
