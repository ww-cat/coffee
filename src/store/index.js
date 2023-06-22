import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tokenString: localStorage.getItem("userToken") ? localStorage.getItem("userToken") : '',
    userBg: ''
  },
  getters: {
    getTokenString: state => state.tokenString,
    userBg: state => state.userBg
  },
  mutations: {
    SET_TOKEN_STRING(state, tokenString) {
      state.tokenString = tokenString
    },
    SET_USER_BACKGROUND_IMG(state, userBg) {
      state.userBg = userBg
    }
  },
  actions: {
    setTokenString({
      commit
    }, tokenString) {
      commit('SET_TOKEN_STRING', tokenString)
    },
    setUserBg({
      commit
    }, userBg) {
      commit('SET_USER_BACKGROUND_IMG', userBg)
    }
  },
  modules: {
  }
})
