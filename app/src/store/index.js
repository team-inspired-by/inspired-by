import Vue from "vue";
import Vuex from "vuex";
import sample_posts from "./sample_posts.json";
import sample_users from "./sample_users.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    show: true,
    pageType: "intro",
    pageTo: "",
    topic: "",
    focusedTopic: "",
    topicLists: [
      {
        text: "English"
      },
      {
        text: "Philosophy"
      },
      {
        text: "ROS"
      },
      {
        text: "Indonesian"
      },
      {
        text: "Memory"
      }
    ],
    popupContentsManager: false,
    popupLogin: false,
    loginStatus: false,
    isPostOpened: false,
    imageToUpload: {},
    post: {},
    str: `## Lorem Ipsum
Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor nobis debitis, odit quisquam itaque et, totam dolores voluptas accusamus at explicabo porro? Neque incidunt, id voluptates omnis at ipsa distinctio consequuntur illum, necessitatibus magnam unde quae nesciunt iste sapiente inventore reprehenderit placeat voluptate quam enim a earum,
### How can we improve it?
lorem asperiores, nisi nobis quisquam id neque consequatur dolorem magni, consequuntur magnam
### Is this really Happen?
consequatur perspiciatis delectus quidem. Repudiandae saepe deleniti possimus iure a blanditiis laborum praesentium, dignissimos inventore illo libero quia? Culpa iusto earum quae vero provident, asperiores, nisi nobis quisquam id neque consequatur dolorem magni, consequuntur magnam ex natus velit quo? Quaerat quia quae eius dolore, libero cupiditate nihil expedita ut laborum voluptatibus itaque molestiae?
    `,
    pagePosition: {},
    pageTiming: {
      "intro-topic": 4000,
      "post-topic": 0,
      "topic-git": 2000,
      "post-git": 2000,
      "admin-admin": 0
    },
    samplePost: sample_posts[0],
    samplePosts: sample_posts,
    sampleUser: sample_users[0],
    sampleUsers: sample_users
  },
  mutations: {
    focusTopic(state, topic) {
      state.focusedTopic = topic;
    },
    setTopic(state, topic) {
      state.topic = topic;
    },
    loadTopicLists(state) {
      // Logic to load topicLists
    },
    movePage(state, val) {
      state.pageType = val.from;
      state.pageTo = val.to;
      // if (!state.pageType) state.pageType = val.to
      state.pagePosition[val.from] = window.scrollY;
      if (val.routingAnimation) {
        state.show = false;
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      }

      setTimeout(() => {
        state.show = true;
      }, state.pageTiming[val.from + "-" + val.to] | 1000);

      setTimeout(() => {
        window.scrollTo({
          top: state.pagePosition[val.to] | 0,
          left: 0,
          behavior: "smooth"
        });
      }, (state.pageTiming[val.from + "-" + val.to] + 1000) | 0);
    },
    // movePage (state, to) {
    //   state.pagePosition[to] = window.scrollY;
    //   if (to == "post") return;
    //   state.show = false;
    //   if (to != "topic") state.pageType = to;
    //   else
    //     setTimeout(() => {
    //       state.pageType = to;
    //     }, 6000);

    //   // var timing = 4000;
    //   // if (state.pageType == "intro") timing = 4000;
    //   setTimeout(() => {
    //     state.show = true;
    //   }, state.pageTiming[to] | state.pageTiming['default']);
    // },
    // Deprecated: movePageTo()
    movePageTo(state, val) {
      state.pageType = val;
      if (val == "post") return;
      state.show = false;
      setTimeout(() => {
        state.show = true;
      }, 2000);
    },
    setPopupContentsManager(state, val) {
      state.popupContentsManager = val;
    },
    setPopupLogin(state, val) {
      state.popupLogin = val;
    },
    login(state, val) {
      state.loginStatus = val;
    },
    openPost(state, val) {
      // query to load post
      if (!val) {
        state.isPostOpened = false;
        return;
      } else {
        state.post = {
          key: val["key"],
          title: val["title"],
          category: val["category"]
        };
        setTimeout(() => {
          state.isPostOpened = true;
        }, 1000);
      }
    },
    loadPost(state, val) {
      // deprecated
      state.post = {
        key: val
      };
    },
    closePost(state, val) {
      state.isPostOpened = false;
      state.post = {};
    },
    uploadImage(state, val) {
      if (val.type == "unsplash") {
        this.imageToUpload = val.data.urls.small;
        // Add logig to uploac
      } else if (val.type == "local") {
      }
    }
  },
  actions: {
    focusTopic({ commit }, { newVal }) {
      commit("focusTopic", newVal);
    },
    setTopic({ commit }, { newVal }) {
      commit("setTopic", newVal);
    },
    loadTopicLists({ commit }, {}) {
      commit("loadTopicLists");
    },
    setPopupContentsManager({ commit }, { newVal }) {
      commit("setContentsManager", newVal);
    },
    setPopupLogin({ commit }) {
      commit("setPopupLogin", newVal);
    },
    movePageTo({ commit }, { newVal }) {
      commit("movePageTo", movePageTo);
    },
    login({ commit }, { newVal }) {
      commit("login", login);
    },
    openPost({ commit }, { newVal }) {
      commit("openPost", openPost);
    },
    loadPost({ commit }, { newVal }) {
      commit("loadPost", loadPost);
    },
    closePost({ commit }, { newVal }) {
      commit("closePost", closePost);
    },
    uploadImage({ commit }, { newVal }) {
      commit("uploadImage", uploadImage);
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
    getTopicLists(state) {
      return state.topicLists;
    },
    getPopupContentsManager(state) {
      return state.popupContentsManager;
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
    getPageTo(state) {
      return state.pageTo;
    },
    getPosition(state) {
      return state.pagePosition;
    },
    getTiming(state) {
      return state.pageTiming;
    },
    getLoginStatus(state) {
      return state.loginStatus;
    },
    getLorem(state) {
      return state.str;
    },
    getIsPostOpened(state) {
      return state.isPostOpened;
    },
    getPost(state) {
      // console.log("post: ", state.post);
      return state.post;
    },
    getImageUrl(state) {
      console.log(state.imageToUpload);
      if (state.imageToUpload["data"]) {
        return state.imageToUpload.data.urls.small;
      } else return "null";
    },
    getSamplePost(state) {
      return sample_posts.posts[0];
    },
    getSamplePosts(state) {
      return sample_posts.posts;
    },
    getSampleUser(state) {
      return sample_users.users[0];
    },
    getSampleUsers(state) {
      return sample_users.users;
    }
  }
});
