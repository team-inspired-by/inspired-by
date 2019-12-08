import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isMain: false,
    topic: '',
    posY: 0,
  },
  mutations: {
    setTopic(state, topic) {
      state.topic = topic
    },
    setIsMain(state, isMain) {
      console.log('isMain: ', isMain)
      state.isMain = isMain
    },
    setPosY(state, posY) {
      state.posY = posY
    }
  },
  actions: {
    setTopic({
      commit
    }, {
      newTopic
    }) {
      commit('setTopic', newTopic)
    },
    setPosY({
      commit
    }, {
      newPosY
    }) {
      commit('setPosY', newPosY)
    }
  },
  modules: {},
  getters: {
    getTopic(state) {
      return state.topic
    },
    getIsMain(state) {
      return state.isMain
    },
    getPosY(state) {
      return state.posY
    }
  }
})