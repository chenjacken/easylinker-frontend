import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import scene from './modules/scene'
import device from './modules/device'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    permission,
    scene,
    device
  },
  state: {},
  mutations: {},
  actions: {},
  getters
})
