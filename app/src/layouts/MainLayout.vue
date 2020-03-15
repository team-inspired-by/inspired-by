<template>
  <transition name="page-move">
    <div v-if="show" id="page-container">
      <v-container id="app-bar-container">
        <v-app-bar
          color="transparent"
          scroll-target="#route-container"
          dark
          flat
          prominent
          shrink-on-scroll
        >
          <!-- <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
          </template>-->
          <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
          <v-btn icon @click="routeBack()">
            <v-icon>mdi-arrow-left</v-icon>
          </v-btn>

          <v-toolbar-title class="d-flex align-center">
            <span id="logo">Inspired by</span>
            <span id="topic" class="topic ml-2">{{ topic }}</span>
          </v-toolbar-title>

          <v-spacer></v-spacer>

          <!-- <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Credit</span>
        <v-icon>mdi-open-in-new</v-icon>
          </v-btn>-->
        </v-app-bar>
      </v-container>
      <div
        ref="routeContainer"
        id="route-container"
        @scroll.passive="handleScroll"
      >
        <router-view></router-view>
      </div>
    </div>
  </transition>
</template>

<script>
import gql from "graphql-tag";
import { RecentRepo, RecentRepo2, Topics } from "../queries/repo";

export default {
  name: "MainLayout",
  apollo: {
    clients: {
      query() {
        return Topics;
      },
      update: data => data
    }
  },
  inject: ["theme"],
  VBoilerplate: {
    functional: true,

    render(h, { data, props, children }) {
      return h(
        "v-skeleton-loader",
        {
          ...data,
          props: {
            boilerplate: true,
            elevation: 2,
            ...props
          }
        },
        children
      );
    }
  },
  data: () => ({
    show: false
  }),
  created() {
    this.$store.commit("setTopic", this.$route.params.inspiration);
  },
  computed: {
    topic() {
      return this.$store.getters.getTopic;
    },
    isMain() {
      return this.$store.getters.getIsMain;
    },
    sampleText() {
      console.log("client", this.clients);
      // if (this.client.viewer.properties[0].name != '') {
      //   return this.client.viewer.properties[0].name
      // }
      if (this.clients) return this.clients;
      return "";
    }
  },
  mounted() {
    console.log(this.sample);
    this.show = true;
    this.video = this.$refs.video;
    // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //   navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    //     console.log(stream);
    //     // this.video.src = window.URL.createObjectURL(stream);
    //     this.video.src = HTMLMediaElement.srcObject = stream;
    //     // this.video.play();
    //   });
    // }

    function hasGetUserMedia() {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    if (hasGetUserMedia()) {
      // Good to go!
    } else {
      alert("getUserMedia() is not supported by your browser");
    }
  },
  methods: {
    expandTopic() {
      this.expand = !this.expand;
    },
    expandCarousel() {
      this.isCarouselOpen = !this.isCarouselOpen;
      if (this.isCarouselOpen) {
        this.carouselHeight = 700;
      } else {
        this.carouselHeight = 250;
      }
    },
    selectTopic(key) {
      this.selectedTopic = key;
      this.isTopicSelected = true;
    },
    routeBack() {
      this.show = false;
      setTimeout(() => {
        // this.$router.go(-1);
        this.$router.back();
      }, 1000);
    },
    handleScroll() {
      this.$store.commit("setPosY", this.$refs.routeContainer.scrollTop);
    }
  }
};
</script>

<style lang="scss" scoped>
#page-container {
  flex-direction: column;
  overflow: hidden;
  #app-bar-container {
    flex: none;
    span {
      font-family: "Times New Roman", Times, serif !important;
      font-weight: 500;
    }
    #topic {
      color: #999;
    }
  }
  #route-container {
    flex: 1;
    height: calc(100vh - 80px);
    overflow-y: scroll;
  }
}
</style>
