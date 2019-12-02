import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";
import vuetify from "./plugins/vuetify";
import VueMarkdown from "vue-markdown";

Vue.config.productionTip = false;
Vue.component('vue-markdown', VueMarkdown);

var AppInstance = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

AppInstance.$vuetify.theme.dark = true;
AppInstance.$vuetify.theme.themes.dark = {
  primary: '#12FFFF',
  secondary: '#333333',
  accent: '#8c9eff',
  error: '#b71c1c',
}