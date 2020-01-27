<template>
  <div>
    <transition name="project-move">
      <div v-if="show">
        <!-- <div id="line"></div> -->
        <router-view></router-view>
      </div>
    </transition>
    <custom-subtitle></custom-subtitle>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { RecentRepo, RecentRepo2, Topics } from "../queries/repo";

export default {
  name: "MainLayout",
  apollo: {
    clients: {      query () {
        return Topics;
      },
      update: data => data
    }
  },
  inject: ["theme"],
  VBoilerplate: {
    functional: true,

    render (h, { data, props, children }) {
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
  }),
  created () {
    this.$store.commit("setTopic", this.$route.params.inspiration);
  },
  computed: {
    // topic () {
    //   return this.$store.getters.getTopic;
    // },
    show () {
      return this.$store.getters.getShow;
    },
    sampleText () {
      // console.log("client", this.clients);
      // if (this.client.viewer.properties[0].name != '') {
      //   return this.client.viewer.properties[0].name
      // }
      if (this.clients) return this.clients;
      return "";
    }
  },

  mounted () {
    // console.log(this.sample);
    this.video = this.$refs.video;
    // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //   navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    //     console.log(stream);
    //     // this.video.src = window.URL.createObjectURL(stream);
    //     this.video.src = HTMLMediaElement.srcObject = stream;
    //     // this.video.play();
    //   });
    // }

    // function hasGetUserMedia() {
    //   return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    // }

    // if (hasGetUserMedia()) {
    //   // Good to go!
    // } else {
    //   alert("getUserMedia() is not supported by your browser");
    // }
  },
  methods: {
    expandTopic () {
      this.expand = !this.expand;
    },
    expandCarousel () {
      this.isCarouselOpen = !this.isCarouselOpen;
      if (this.isCarouselOpen) {
        this.carouselHeight = 700;
      } else {
        this.carouselHeight = 250;
      }
    },
    selectTopic (key) {
      this.selectedTopic = key;
      this.isTopicSelected = true;
    },
    handleScroll () {
      this.$store.commit("setPosY", this.$refs.routeContainer.scrollTop);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
