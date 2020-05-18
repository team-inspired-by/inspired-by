import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import sigma from "./plugins/sigma";
import VueMarkdown from "vue-markdown";
import VueScrollTo from "vue-scrollto";
// import axios from "axios";
import vuePlayer from "@algoz098/vue-player";
import VScrollLock from "v-scroll-lock";
// import imagesLoaded from "vue-images-loaded";
import {
  component as VueCodeHighlight
} from 'vue-code-highlight';
import {
  createProvider
} from "./vue-apollo";


import Longpress from 'vue-longpress';
import AppBar from "./components/AppBar";
import Subheader from "./components/Subheader.vue";
import Startitle from "./components/Startitle.vue";
import Writer from "./components/Writer.vue";
import Reviewer from "./components/Reviewer.vue";
import PostCard from "./components/PostCard.vue";
import Event from "./components/Event.vue";
import AuthorCard from "./components/AuthorCard.vue";
import PostManagingCard from "./components/PostManagingCard.vue"

Vue.config.productionTip = false;
Vue.component("Longpress", Longpress);
Vue.component("vue-markdown", VueMarkdown);
Vue.component("vue-scroll-to", VueMarkdown);
Vue.component(vuePlayer);
Vue.component("vue-code-highlight", VueCodeHighlight);
Vue.component("custom-appbar", AppBar);
Vue.component("custom-subheader", Subheader);
Vue.component("custom-startitle", Startitle);
Vue.component("custom-writer", Writer);
Vue.component("custom-reviewer", Reviewer);
Vue.component("custom-post-card", PostCard);
Vue.component("custom-event", Event);
Vue.component("custom-author-card", AuthorCard);
Vue.component("custom-post-managing-card", PostManagingCard);

Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: -80,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
});

// Vue.use(imagesLoaded);
Vue.use(VScrollLock);
Vue.use(sigma);


var AppInstance = new Vue({
  router,
  store,
  vuetify,
  // axios,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");

// console.log("sm: ", AppInstance.$vuetify.breakpoint.thresholds.sm)
// AppInstance.$vuetify.breakpoint.thresholds.sm = 340;
// console.log("sm: ", AppInstance.$vuetify.breakpoint.thresholds.sm)
// NOTE: moved to plugins/vuetify.js
// AppInstance.$vuetify.theme.dark = true;
// AppInstance.$vuetify.theme.themes.dark = {
//   primary: "#12FFFF",
//   secondary: "#333333",
//   accent: "#8c9eff",
//   error: "#b71c1c"
// };