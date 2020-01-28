import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import VueMarkdown from "vue-markdown";
import VueScrollTo from "vue-scrollto";
// import axios from "axios";
import vuePlayer from "@algoz098/vue-player";
import {
  createProvider
} from "./vue-apollo";

import AppBar from "./components/AppBar";
import Subtitle from "./components/Subtitle";
import Subheader from "./components/Subheader.vue";
import Startitle from "./components/Startitle.vue";

Vue.config.productionTip = false;
Vue.component("vue-markdown", VueMarkdown);
Vue.component("vue-scroll-to", VueMarkdown);
Vue.component(vuePlayer);
Vue.component("custom-appbar", AppBar);
Vue.component("custom-subtitle", Subtitle);
Vue.component("custom-subheader", Subheader);
Vue.component("custom-startitle", Startitle);

Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: -100,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
});

var AppInstance = new Vue({
  router,
  store,
  vuetify,
  // axios,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount("#app");

AppInstance.$vuetify.theme.dark = true;
AppInstance.$vuetify.theme.themes.dark = {
  primary: "#12FFFF",
  secondary: "#333333",
  accent: "#8c9eff",
  error: "#b71c1c"
};