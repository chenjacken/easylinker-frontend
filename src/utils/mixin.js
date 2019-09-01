// import Vue from 'vue'
import { throttle } from 'lodash'
import { deviceEnquire, DEVICE_TYPE } from '@/utils/device'
import { mapState } from 'vuex'
import { Message } from 'paho-mqtt'
import { message } from 'ant-design-vue'

// const mixinsComputed = Vue.config.optionMergeStrategies.computed
// const mixinsMethods = Vue.config.optionMergeStrategies.methods

const mixin = {
  computed: {
    ...mapState({
      layoutMode: state => state.app.layout,
      navTheme: state => state.app.theme,
      primaryColor: state => state.app.color,
      colorWeak: state => state.app.weak,
      fixedHeader: state => state.app.fixedHeader,
      fixSiderbar: state => state.app.fixSiderbar,
      fixSidebar: state => state.app.fixSiderbar,
      contentWidth: state => state.app.contentWidth,
      autoHideHeader: state => state.app.autoHideHeader,
      sidebarOpened: state => state.app.sidebar,
      multiTab: state => state.app.multiTab
    })
  },
  methods: {
    isTopMenu () {
      return this.layoutMode === 'topmenu'
    },
    isSideMenu () {
      return !this.isTopMenu()
    }
  }
}

const mixinDevice = {
  computed: {
    ...mapState({
      device: state => state.app.device
    })
  },
  methods: {
    isMobile () {
      return this.device === DEVICE_TYPE.MOBILE
    },
    isDesktop () {
      return this.device === DEVICE_TYPE.DESKTOP
    },
    isTablet () {
      return this.device === DEVICE_TYPE.TABLET
    }
  }
}

const AppDeviceEnquire = {
  mounted () {
    const { $store } = this
    deviceEnquire(deviceType => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          $store.commit('TOGGLE_DEVICE', 'desktop')
          $store.dispatch('setSidebar', true)
          break
        case DEVICE_TYPE.TABLET:
          $store.commit('TOGGLE_DEVICE', 'tablet')
          $store.dispatch('setSidebar', false)
          break
        case DEVICE_TYPE.MOBILE:
        default:
          $store.commit('TOGGLE_DEVICE', 'mobile')
          $store.dispatch('setSidebar', true)
          break
      }
    })
  }
}

const mixinSelectMap = {
  methods: {
    getNameByKey (map, key) {
      const result = map.find(item => item.key === key)
      return result ? result.name : '--'
    }
  }
}

const mixinWindowSize = {
  data () {
    return {
      windowSize: {}
    }
  },
  mounted () {
    this.updateWindowSize()
    window.addEventListener(
      'resize',
      throttle(ev => {
        this.updateWindowSize()
      }, 500)
    )
  },
  unmounted () {
    window.removeEventListener('resize')
  },
  methods: {
    updateWindowSize () {
      const height = window.innerHeight
      const width = window.innerWidth
      this.windowSize = { width, height }
    }
  }
}

const mixinMqtt = {
  created () {
    if (this.subscribe) this.subscribe()
  },
  unmounted () {
    if (this.unsubscribe) this.unsubscribe()
  },
  computed: {
    ...mapState({
      detail: state => state.device.detail
    }),
    topic () {
      const { deviceProtocol, securityId } = this.detail
      if (deviceProtocol !== 'MQTT') return null
      return `/device/${securityId}/`
    }
  },
  methods: {
    subscribe () {
      if (/* this.detail.deviceProtocol === 'MQTT' && */ this.$mqtt) {
        if (!this.$mqtt.isConnected()) return message.error('mqtt 连接失败')
        message.success('mqtt 连接成功')
        this.$mqtt.subscribe(this.topic, {
          qos: 2
        })
        this.$mqtt.onMessageArrived = message => {
          console.log('onMessageArrived:' + message.payloadString)
        }
      }
    },
    unsubscribe () {
      if (this.detail.deviceProtocol === 'MQTT' && this.$mqtt) {
        this.$mqtt.unsubscribe(this.detail.topic)
        this.$mqtt.onMessageArrived = null
      }
    },
    publish (data) {
      if (this.detail.deviceProtocol === 'MQTT' && this.$mqtt && this.$mqtt.isConnected()) {
        let stringData = ''
        if (typeof data === 'object') {
          try {
            stringData = JSON.stringify(data)
          } catch (error) {}
        } else {
          stringData = data
        }
        try {
          const msg = new Message(stringData)
          msg.destinationName = this.topic + 's2c'
          console.log('=>', this.topic + 's2c')
          this.$mqtt.send(msg)
          message.success('操作成功！')
        } catch (error) {
          message.error(error)
        }
      }
    }
  }
}

export { mixin, AppDeviceEnquire, mixinDevice, mixinSelectMap, mixinMqtt, mixinWindowSize }
