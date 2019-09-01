import mqtt from 'paho-mqtt'
import baseConfig from '@/config/mqtt.config'
const { brokerUrl, port, clientId } = baseConfig
const client = new mqtt.Client(brokerUrl, port, clientId)

client.connect({
  onSuccess: () => {
    console.log('=> mqtt connect success!')
  }
})

client.onConnectionLost = responseObject => {
  if (responseObject.errorCode !== 0) {
    console.log('onConnectionLost:' + responseObject.errorMessage)
  }
}

const vueMqtt = {
  vm: {},
  // eslint-disable-next-line no-unused-vars
  install (Vue, instance) {
    if (this.installed) {
      return
    }
    this.installed = true

    if (!instance) {
      // eslint-disable-next-line no-console
      console.error('You have to install axios')
      return
    }

    Vue.mqtt = instance

    Object.defineProperties(Vue.prototype, {
      mqtt: {
        get: function get () {
          return instance
        }
      },
      $mqtt: {
        get: function get () {
          return instance
        }
      }
    })
  }
}

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(vueMqtt, client)
  }
}

export default installer
