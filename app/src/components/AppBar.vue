<template>
  <div class="app-box">
    <div id="shadow" :class="{ active: isScrolled }"></div>
    <v-container>
      <v-app-bar ref="appBar" color="transparent" dark flat prominent shrink-on-scroll>
        <!-- <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
        </template>-->
        <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
        <v-btn icon @click="routeBack()">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <v-toolbar-title class="align-center">
          <span id="logo">Inspired by</span>
          <span id="topic" class="topic ml-2">{{ topic }}</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>

        <!-- <v-btn icon href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
          <v-icon>mdi-open-in-new</v-icon>
        </v-btn>-->
        <v-btn icon @click="routeTo('admin')" target="_blank" text>
          <v-icon>mdi-wrench-outline</v-icon>
        </v-btn>
        <v-btn
          icon
          href="https://github.com/vuetifyjs/vuetify/releases/latest"
          target="_blank"
          text
        >
          <v-icon>mdi-graph-outline</v-icon>
        </v-btn>
      </v-app-bar>
    </v-container>
  </div>
</template>

<script>
import debounce from "lodash/debounce";

export default {
  name: "custom-appbar",
  props: ["topic"],
  data: () => ({
    contentsBox: null,
    isScrolled: false,
    debouncedScroller: null
  }),
  mounted () {
    this.contentsBox = document.querySelector("#contents-box");
    this.debouncedScroller = debounce(this.handleScroll, 30);
    window.addEventListener("scroll", this.debouncedScroller);
  },
  destroyed () {
    window.removeEventListener("scroll", this.debouncedScroller);
  },
  methods: {
    routeBack () {
      // this.$store.commit("movePageTo", "inspiration");
      // window.scrollTo({
      //   top: 0,
      //   left: 0,
      //   behavior: "smooth"
      // });
      this.$router.back();
      // setTimeout(() => {
      //   // this.$router.go(-1);
      //   this.$router.back();
      // }, 1000);
    },
    routeTo (path) {
      // this.$store.commit("movePageTo", "admin");
      // setTimeout(() => {
      this.$router.push("/admin");
      // }, 1000);
    },
    handleScroll () {
      if (window.scrollY > 0) this.isScrolled = true;
      else this.isScrolled = false;
    },

  }
};
</script>
<style lang="scss" scoped>
.app-box {
  position: fixed;
  z-index: 10;
  #shadow {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 5em;
    background: linear-gradient(
      rgba(0, 0, 0, 0.8),
      rgba(0, 0, 0, 0.6),
      rgba(0, 0, 0, 0)
    );
    transition: opacity 0.5s;
    z-index: -1;
    opacity: 0;

    &.active {
      opacity: 1;
    }
  }
  .v-app-bar {
    margin-top: 1em;
    padding-left: 0.4em;
    padding-right: 1.5em;
    width: 100vw;
    .v-toolbar__content {
      span {
        text-shadow: 0 0 0.5em black;
        font-family: "Times New Roman", Times, serif !important;
        font-weight: 500;
      }
      #topic {
        color: #999;
      }
    }
  }
}
</style>
