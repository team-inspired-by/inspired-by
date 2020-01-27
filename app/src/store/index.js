import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    show: true,
    pageType: "intro",
    topic: "",
    focusedTopic: "",
    popupLogin: false,
    loginStatus: false
  },
  mutations: {
    focusTopic(state, topic) {
      state.focusedTopic = topic;
    },
    setTopic(state, topic) {
      state.topic = topic;
    },
    movePage(state, to) {
      console.log("pageType:", state.pageType);
      state.show = false;
      if (to != 'topic')
        state.pageType = to;
      else
        setTimeout(() => {
          state.pageType = to;
        }, 5000);

      var timing = 4000;
      if (state.pageType == "intro")
        timing = 4000;
      setTimeout(() => {
        state.show = true;
      }, timing);
    },
    // Deprecated: movePageTo()
    movePageTo(state, val) {
      state.pageType = val;
      if (val == "post") return;
      state.show = false;
      setTimeout(() => {
        state.show = true;
      }, 2000);
    },
    setPopupLogin(state, val) {
      state.popupLogin = val;
    },
    login(state, val) {
      state.loginStatus = val;
    }
  },
  actions: {
    focusTopic({
      commit
    }, {
      newTopic
    }) {
      commit("focusTopic", newTopic);
    },
    setTopic({
      commit
    }, {
      newTopic
    }) {
      commit("setTopic", newTopic);
    },
    setPopupLogin({
      commit
    }) {
      commit("setPopupLogin", newVal);
    },
    movePageTo({
      commit
    }, {
      newVal
    }) {
      commit("movePageTo", movePageTo);
    },
    login({
      commit
    }, {
      newVal
    }) {
      commit("login", login);
    }
  },
  modules: {},
  getters: {
    getFocusedTopic(state) {
      return state.focusedTopic;
    },
    getTopic(state) {
      return state.topic;
    },
    getPopupLogin(state) {
      return state.popupLogin;
    },
    getShow(state) {
      return state.show;
    },
    getPageType(state) {
      return state.pageType;
    },
    getLoginStatus(state) {
      return state.loginStatus;
    }
  }
});