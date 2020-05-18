import Vue from "vue";
import Vuex from "vuex";
import sample_posts from "./sample_posts.json";
import sample_users from "./sample_users.json";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    language: "ko",
    show: true,
    pageFrom: "intro",
    pageTo: "",
    playVideo: false,
    topic: "",
    focusedTopic: "",
    topicList: [{
        name: "English"
      },
      {
        name: "Philosophy"
      },
      {
        name: "ROS"
      },
      {
        name: "Indonesian"
      },
      {
        name: "Memory"
      }
    ],
    darken: false,
    popup: {
      profile: false
    },
    popupContentsManager: false,
    popupLogin: false,
    popupProfile: false,
    // loginStatus: false,
    userInfo: {
      isLoggedIn: false,
      isUser: false,
      accessToken: '',
      refreshToken: '',
      user: {}
    },
    treeview: {
      selected: ""
    },
    isPostOpened: false,
    attachedImages: {},
    imageToUpload: {},
    imagesToUpload: [],
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
      "git-topic": 1500,
      "topic-admin": 2000,
      "topic-intro": 2000,
      "topic-writer": 2000,
      "topic-git": 2000,
      "post-admin": 2000,
      "post-git": 2000,
      "post-topic": 10,
      "post-writer": 2000,
      "writer-post": 2000,
      "writer-topic": 1500,
      "admin-admin": 10,
      "admin-post": 2000,
      "admin-topic": 1500
    },
    adminStatus: {
      isPostEditing: false,
      editRequest: [],
    }
  },
  mutations: {
    focusTopic(state, topic) {
      state.focusedTopic = topic;
    },
    setTopic(state, topic) {
      state.topic = topic;
    },
    loadTopicLists(state) {
      // Logic to load topicList
    },
    movePage(state, val) {
      state.pageFrom = val.from;
      state.pageTo = val.to;
      // if (!state.pageFrom) state.pageFrom = val.to
      state.pagePosition[val.from] = window.scrollY;
      if (val.routingAnimation) {
        state.show = false;
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth"
        });
      }

      console.info("page: ", val.from + "-" + val.to);
      const timing = state.pageTiming[val.from + "-" + val.to];
      setTimeout(() => {
        state.show = true;
      }, timing | 1000);

      if (val.to != "post")
        setTimeout(() => {
          window.scrollTo({
            top: state.pagePosition[val.to] | 0,
            left: 0,
            behavior: "smooth"
          });
        }, (timing ? timing + 1000 : 0) | 0);
    },
    // movePage (state, to) {
    //   state.pagePosition[to] = window.scrollY;
    //   if (to == "post") return;
    //   state.show = false;
    //   if (to != "topic") state.pageFrom = to;
    //   else
    //     setTimeout(() => {
    //       state.pageFrom = to;
    //     }, 6000);

    //   // var timing = 4000;
    //   // if (state.pageFrom == "intro") timing = 4000;
    //   setTimeout(() => {
    //     state.show = true;
    //   }, state.pageTiming[to] | state.pageTiming['default']);
    // },
    // Deprecated: movePageTo()
    movePageTo(state, val) {
      state.pageFrom = val;
      if (val == "post") return;
      state.show = false;
      setTimeout(() => {
        state.show = true;
      }, 2000);
    },
    lighten(state) {
      state.darken = false;
      for (let i in state.popup) {
        state.popup[i] = false;
      }
    },
    setDarken(state, val) {
      state.darken = val;
    },
    setPopupContentsManager(state, val) {
      state.darken = val;
      state.popupContentsManager = val;
    },
    setPopupProfile(state, val) {
      state.darken = val;
      state.popup.profile = val;
    },
    setPopupLogin(state, val) {
      state.popupLogin = val;
    },
    login(state, val) {
      console.debug('on login():')
      for (let i in val) {
        state.userInfo[i] = val[i]
        console.debug("    ", i, ": ", val[i])
        if (i == 'accessToken') {
          console.debug('    accessToken stored.')
          sessionStorage.setItem("inspired-by-access-token", val[i]);
        } else if (i == 'refreshToken') {
          console.debug('    refreshToken stored.')
          localStorage.setItem("inspired-by-refresh-token", val[i]);
        }
      }
    },
    logout(state) {
      console.debug('logged out.')
      localStorage.removeItem('inspired-by-refresh-token');
      sessionStorage.removeItem('inspired-by-access-token');
      state.userInfo = {
        isLoggedIn: false,
        isUser: false,
        accessToken: '',
        refreshToken: '',
        user: {}
      }
    },
    setRefreshToken(state, val) {
      state.userInfo.refreshToken = val;
    },
    setAccessToken(state, val) {
      state.userInfo.accessToken = val;
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
    // // NOTE: deprecated
    // uploadImage(state, val) {
    //   // if (val.type == "unsplash") {
    //   //   state.imageToUpload = val.data.urls.small;
    //   //   // Add logig to uploac
    //   // } else if (val.type == "local") {}
    //   state.imagesToUpload.push({
    //     uploaded: val
    //   });
    //   console.log("on uploadImage:");
    //   console.log(state.imagesToUpload);
    // },
    // NOTE: deprecated
    loadImages(state, val) {
      state.attachedImages = val
      console.debug("on loadImages:", state.attachedImages);
    },
    attachImage(state, {
      uploaded,
      image,
    }) {
      Vue.set(state.attachedImages, image.alias, {
        alias: image.alias,
        uploaded: uploaded,
        registered: false,
        registeredId: null,
        image: image
      });
      // NOTE: the code above works like below, but the difference is change detection
      // state.attachedImages[image.alias] = {
      //   uploaded: uploaded,
      //   registered: false,
      //   registeredId: null,
      //   image: image
      // };
      console.debug('on attatchImage(): ', state.attachedImages);
    },
    updateImage(state, {
      alias,
      registered,
      registeredId,
      uploaded
    }) {
      console.debug('updateImage()')
      console.debug(alias, registered, uploaded);
      // const image = state.attachedImages.filter(key =>
      //   key.alias === alias
      // )[0]
      const image = state.attachedImages[alias];
      console.debug('image: ', image)
      if (uploaded)
        image.uploaded = uploaded;
      if (registered)
        image.registered = registered;
      if (registeredId)
        image.registeredId = registeredId;

      console.debug("attachedImages on update(): ", state.attachedImages)
    },
    imageToContent(state, val) {
      /* NOTE: process works in a writer component  */
      return;
    },
    setVideoState(state, val) {
      state.playVideo = val;
    },
    setIsPostEditing(state, val) {
      console.debug('setIsPostEditing on store: ', val)
      state.adminStatus.isPostEditing = val;
    },
    pushEditRequest(state, val) {
      state.adminStatus.editRequest.push(val)
    },
    setTreeviewSelected(state, val) {
      state.treeview.selected = val;
    }
  },
  actions: {
    focusTopic({
      commit
    }, {
      newVal
    }) {
      commit("focusTopic", newVal);
    },
    setTopic({
      commit
    }, {
      newVal
    }) {
      commit("setTopic", newVal);
    },
    loadTopicLists({
      commit
    }, {}) {
      commit("loadTopicLists");
    },
    lighten({
      commit
    }, {}) {
      commit("lighten");
    },
    setDarken({
      commit
    }, {
      newVal
    }) {
      commit("setDarken", newVal);
    },
    setPopupContentsManager({
      commit
    }, {
      newVal
    }) {
      commit("setContentsManager", newVal);
    },
    setPopupProfile({
      commit
    }, {
      newVal
    }) {
      commit("setPopupProfile", newVal);
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
    },
    setRefreshToken({
      commit
    }, {
      newVal
    }) {
      commit("setRefreshToken", setRefreshToken);
    },
    setAccessToken({
      commit
    }, {
      newVal
    }) {
      commit("setAccessToken", setAccessToken)
    },
    openPost({
      commit
    }, {
      newVal
    }) {
      commit("openPost", openPost);
    },
    loadPost({
      commit
    }, {
      newVal
    }) {
      commit("loadPost", loadPost);
    },
    closePost({
      commit
    }, {
      newVal
    }) {
      commit("closePost", closePost);
    },
    uploadImage({
      commit
    }, {
      newVal
    }) {
      commit("uploadImage", uploadImage);
    },
    loadImages({
      commit
    }, {
      newVal
    }) {
      commit("loadImages", loadImages);
    },
    attachImage({
      commit
    }, {
      newVal
    }) {
      commit("attachImage", attachImage);
    },
    updateImage({
      commit
    }, {
      newVal
    }) {
      commit("updateImage", updateImage);
    },
    imageToContent({
      commit
    }, {
      newVal
    }) {
      commit("imageToContent", imageToContent);
    },
    setVideoState({
      commit
    }, {
      newVal
    }) {
      commit("setVideoState", setVideoState);
    },
    setIsPostEditing({
      commit
    }, {
      newVal
    }) {
      commit("setIsPostEditing", setIsPostEditing);
    },
    pushEditRequest({
      commit
    }, {
      newVal
    }) {
      commit("pushEditRequest", pushEditRequest)
    },
    setTreeviewSelected({
      commit
    }, {
      newVal
    }) {
      commit("setTreeviewSelected", setTreeviewSelected);
    },
  },
  modules: {},
  getters: {
    getFocusedTopic(state) {
      return state.focusedTopic;
    },
    getTopic(state) {
      return state.topic;
    },
    getTopicList(state) {
      return state.topicList;
    },
    getPopupContentsManager(state) {
      return state.popupContentsManager;
    },
    getPopupLogin(state) {
      return state.popupLogin;
    },
    getPopupProfile(state) {
      return state.popup.profile;
    },
    getShow(state) {
      return state.show;
    },
    getPageFrom(state) {
      return state.pageFrom;
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
    // getLoginStatus(state) {
    //   return state.loginStatus;
    // },
    getIsLoggedIn(state) {
      return state.userInfo.isLoggedIn;
    },
    getUserInfo(state) {
      return state.userInfo
    },
    getUser(state) {
      return state.userInfo.user
    },
    getLorem(state) {
      return state.str;
    },
    getDarken(state) {
      return state.darken;
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
    getAttachedImages(state) {
      console.debug('getAttachedImages() executed.')
      return state.attachedImages
    },
    getImagesToUpload(state) {
      return state.imagesToUpload;
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
    },
    getVideoState(state) {
      return state.playVideo;
    },
    getIsPostEditing(state) {
      return state.adminStatus.isPostEditing;
    },
    getNumberEditRequest(state) {
      return state.adminStatus.editRequest.length
    },
    popEditRequest(state) {
      return state.adminStatus.editRequest.pop(0)
    },
    getTreeviewSelected(state) {
      return state.treeview.selected;
    }
  }
});