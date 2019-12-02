import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMain: false,
    topic: ''
  },
  mutations: {
    setTopic(state, topic) {
      state.topic = topic
    },
    setIsMain(state, isMain) {
      console.log('isMain: ', isMain)
      state.isMain = isMain
    }
  },
  actions: {
    setTopic({
      commit
    }, {
      newTopic
    }) {
      commit('setTopic', newTopic)
    }
  },
  modules: {},
  getters: {
    getTopic(state) {
      return state.topic
    },
    getIsMain(state) {
      return state.isMain
    }
  }
})