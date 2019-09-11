import { getGlobalCode } from '@/api/globalCode'

const types = {
  SET_CODELIST: 'SET_CODELIST'
}

const globalCode = {
  state: {
    codeList: []
  },
  mutations: {
    [types.SET_CODELIST] (state, codeList) {
      state.codeList = codeList
    }
  },

  actions: {
    async GetGlobalCode ({ commit }) {
      const { data } = await getGlobalCode()
      commit(types.SET_CODELIST, data)
    }
  }
}

export default globalCode
