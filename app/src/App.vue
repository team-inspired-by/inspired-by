<template>
  <v-app>
    <v-content :class="{ blurred: isPoppedUp }">
      <router-view></router-view>
      <transition name="fade" mode="out-in">
        <router-view name="postcard"></router-view>
      </transition>
    </v-content>
    <Login></Login>
    <Background></Background>
    <!-- <v-btn color="blue" dark @click="popupLogin()">Open Usage</v-btn> -->
  </v-app>
</template>

<script>
import Background from "./components/Background";
import Login from "./components/Login";

export default {
  name: "App",

  components: {
    Background,
    Login
  },

  methods: {
    popupLogin () {
      this.$store.commit("setPopupLogin", true);
      console.log(this.$store.getters.getPopupLogin);
    }
  },

  computed: {
    isPoppedUp () {
      return this.$store.getters.getPopupLogin;
    }
  },

  data: () => ({})
};
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 0px;
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

.intro-move-enter-active {
  transition: all 1s ease;
}
.intro-move-leave-active {
  transition: all 1s ease;
  // transition: all 0.8s cubic-bezier(1, 1, 0.2, 1);
}
.intro-move-enter, .intro-move-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  // transform: translateY(50vh);
  transform: translateY(100vh);
}

.page-move-enter-active {
  transition: all 1s ease;
}
.page-move-leave-active {
  transition: all 1s ease;
  // transition: all 0.8s cubic-bezier(1, 1, 0.2, 1);
}
.page-move-enter, .page-move-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  // transform: translateY(50vh);
  transform: translate(-85vw, 110vh);
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

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}

.left-edge {
  border-left: 2px solid rgba(255, 255, 255, 0.12);
}
.right-edge {
  border-right: 2px solid rgba(255, 255, 255, 0.12);
}
</style>
