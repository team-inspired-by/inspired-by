<template>
  <v-app>
    <v-content>
      <router-view></router-view>
    </v-content>
    <Background></Background>
  </v-app>
</template>

<script>
import Background from "./components/Background";

export default {
  name: "App",

  components: {
    Background
  },

  data: () => ({})
};
</script>

<style lang="scss">
::-webkit-scrollbar {
  width: 0px;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(10px);
  opacity: 0;
}

.page-move-enter-active {
  transition: all 0.3s ease;
}
.page-move-leave-active {
  transition: all 0.8s cubic-bezier(1, 1, 0.2, 1);
}
.page-move-enter, .page-move-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateX(-100vw);
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
</style>
