import store from '@/store'
import { merge } from 'lodash'
import { querySceneList, queryPreInstallTemplate, querySceneType, addScene } from '@/api/scene'

const defaultQuery = {
  page: 0,
  size: 100
}

const scene = {
  state: {
    list: [],
    preInstallTemplateMap: {},
    sceneTypeMap: [],
    loading: {
      submitLoading: false
    }
  },

  mutations: {
    SET_SENCE_LIST (state, sceneList) {
      state.list = sceneList
    },
    SET_PER_INSTALL_TEMPLATE_MAP (state, preInstallTemplateMap) {
      state.preInstallTemplateMap = preInstallTemplateMap
    },
    SET_SENCE_TYPE_MAP (state, sceneTypeMap) {
      state.sceneTypeMap = sceneTypeMap
    },
    SET_SUBMIT_LOADING (state, loading) {
      state.loading.submitLoading = loading
    }
  },

  actions: {
    async QuerySceneList ({ commit }, parameter) {
      const {
        data: { content }
      } = await querySceneList(merge(defaultQuery, parameter))
      commit('SET_SENCE_LIST', content)
    },
    async QueryPreInstallTemplate ({ commit }) {
      const { data } = await queryPreInstallTemplate()
      commit('SET_PER_INSTALL_TEMPLATE_MAP', data)
    },
    async QuerySceneType ({ commit }) {
      const { data } = await querySceneType()
      commit('SET_SENCE_TYPE_MAP', data)
    },
    async AddScene ({ commit }, data) {
      commit('SET_SUBMIT_LOADING', true)
      try {
        const respent = await addScene(data)
        await store.dispatch('QuerySceneList', defaultQuery)
        commit('SET_SUBMIT_LOADING', false)
        return respent
      } catch (error) {
        commit('SET_SUBMIT_LOADING', false)
        return error
      }
    }
  }
}

export default scene
