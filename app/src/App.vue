<template>
  <v-app>
    <v-content :class="{ blurred: isPoppedUp }">
      <router-view></router-view>
    </v-content>
    <Login />
    <Background />
    <ContentsManager />
    <Profile />
    <Subtitle />
    <!-- <v-btn color="blue" dark @click="popupLogin()">Open Usage</v-btn> -->
    <transition name="scrim" mode="out-in">
      <div id="scrim" v-show="darken" role="document" tabindex="0" @click="lighten()" />
    </transition>
  </v-app>
</template>

<script>
import Background from "./components/Background";
import Login from "./components/Login";
import ContentsManager from "./components/ContentsManager";
import Profile from "./components/Profile";
import Subtitle from "./components/Subtitle";

import "vue-code-highlight/themes/duotone-sea.css";
// import "vue-code-highlight/themes/window.css";

export default {
  name: "App",

  components: {
    Background,
    Login,
    ContentsManager,
    Profile,
    Subtitle
  },
  mounted () {
    this.$store.commit("setVideoState", true);
  },

  methods: {
    popupLogin () {
      this.$store.commit("setPopupLogin", true);
      // console.log(this.$store.getters.getPopupLogin);
    },
    lighten () {
      this.$store.commit("lighten");
    }
  },

  computed: {
    isPoppedUp () {
      return this.$store.getters.getPopupLogin;
    },
    darken () {
      return this.$store.getters.getDarken;
    }
  },

  data: () => ({})
};
</script>

<style lang="scss" scoped>
#scrim {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.7);
  will-change: opacity;
  pointer-events: auto;
  -ms-touch-action: none;
  touch-action: none;
  z-index: 10;
}
</style>
<style lang="scss">
@font-face {
  font-family: "GmarketSansLight";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansLight.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

::-webkit-scrollbar {
  width: 0px;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.blurred {
  opacity: 0.2;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-10px);
  opacity: 0;
}

.treeview-any-enter-active {
  transition: all 1s ease;
  will-change: opacity;
}
.treeview-any-leave-active {
  transition: all 1s ease;
}
.treeview-any-enter,
.treeview-any-leave-to {
  transform: scale(1.5, 1.5);
  opacity: 0;
}

.topic-intro-enter-active {
  transition: all 1s ease;
}
.topic-intro-leave-active {
  transition: all 1s ease;
}
.topic-intro-enter,
.topic-intro-leave-to {
  transform: translateY(130vh);
}

.topic-admin-enter-active {
  transition: all 1s ease;
}
.topic-admin-leave-active {
  transition: all 1s ease;
}
.topic-admin-enter,
.topic-admin-leave-to {
  transform: translate(130vw);
}

.topic-treeview-enter-active {
  transition: all 1s ease;
}
.topic-treeview-leave-active {
  transition: all 1s ease;
}
.topic-treeview-enter,
.topic-treeview-leave-to {
  transform: scale(0.5, 0.5);
  opacity: 0;
}

.topic-any-enter-active {
  transition: all 1s ease;
}
.topic-any-leave-active {
  transition: all 1s ease;
}
.topic-any-enter,
.topic-any-leave-to {
  transform: translate(-130vw, 130vh);
}

.admin-topic-enter-active {
  transition: all 1s ease;
}
.admin-topic-leave-active {
  transition: all 1s ease;
}
.admin-topic-enter {
  transform: translate(-130vw, 400vh);
}
.admin-topic-leave-to {
  transform: translateX(-130vw);
}

.admin-post-enter-active {
  transition: all 1s ease;
}
.admin-post-leave-active {
  transition: all 1s ease;
}
.admin-post-enter {
  transform: translate(-130vw, 400vh);
}
.admin-post-leave-to {
  transform: translateX(-130vw);
}

.admin-any-enter-active {
  transition: all 1s ease;
}
.admin-any-leave-active {
  transition: all 1s ease;
}
.admin-any-enter,
.admin-any-leave-to {
  transform: translate(-130vw, 130vh);
}

.project-move-enter-active {
  transition: all 1s ease;
}
.project-move-leave-active {
  transition: all 1s ease;
  // transition: all 0.8s cubic-bezier(1, 1, 0.2, 1);
}
.project-move-enter, .project-move-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  // transform: translateY(50vh);
  transform: translate(100vw);
}

.post-detail-enter-active {
  transition: all 0s;
}
.post-detail-leave-active {
  transition: all 0s;
  // transition: all 0.8s cubic-bezier(1, 1, 0.2, 1);
}
.post-detail-enter, .post-detail-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  // transform: translateY(50vh);
  // transform: translate(100vw);
}

.loader-enter-active {
  transition: all 0.8s ease;
  transition-delay: 0.3s;
}
.loader-leave-active {
  transition: all 0.8s cubic-bezier(1, 1, 0.2, 1);
}
.loader-enter, .loader-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(100vw);
}

// .post-fade-enter-active,
// .post-fade-leave-active {

// }

// .fade-enter-active {
//   transition-delay: 2s;
//   transition-duration: 0.5s;
//   transition-property: opacity;
//   transition-timing-function: ease;
// }

// .fade-enter,
// .fade-leave-active {
//   opacity: 0;
// }

.post-fade-enter-active {
  transition-delay: 2s;
  transition-duration: 0.5s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.post-fade-enter-active,
.post-fade-leave-active {
  opacity: 1;
}

.item-fade-enter-active {
  animation-name: fade-in;
  animation-duration: 0.5s;
  animation-timing-function: ease-in;
  animation-fill-mode: forwards;
}
.item-fade-leave-active {
  animation-name: fade-out;
  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-fill-mode: forwards;
}

// NOTE: Writing Order-variant
.scrim-enter-active,
.scrim-leave-to {
  opacity: 0;
}
.scrim-enter-to {
  opacity: 1;
}

.scrim-enter-active,
.scrim-leave-to {
  transition-duration: 0.5s;
  transition-property: opacity;
}

.left-edge {
  border-left: 2px solid rgba(255, 255, 255, 0.22);
}
.right-edge {
  border-right: 2px solid rgba(255, 255, 255, 0.22);
}

.v-menu__content {
  box-shadow: none !important;
  &.v-autocomplete__content {
    border-radius: 1em !important;
  }
}
</style>
