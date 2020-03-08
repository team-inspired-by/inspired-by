<template>
  <transition name="item-fade" appear>
    <div id="container-background">
      <!-- <img id="image-sample" :style="{top: -905 + top + 'px'}" src="../assets/samplacam2.png" /> -->
      <!-- <div
      id="background"
      :style="{ top: -scrollY / 5 + 'px', 'background-image': 'url(\'' + image[selectedImage] + '\')' }"
      ></div>-->

      <img id="backgroundImg" :src="image[selectedImage]" />

      <!-- <div id="video-container">
      <video
        width="500"
        height="400"
        src="../assets/result.mp4"
        controls
        autoplay
        loop
      ></video>
      </div>-->
    </div>
  </transition>
</template>

<script>
import debounce from "lodash/debounce";

export default {
  data: () => ({
    image: {
      'dark': '',
      'default': require("../assets/bg_winter.jpg"),
    },
    // selectedImage: 'dark',
    scrollY: 0,
    isMoving: false
  }),
  mounted () {
    this.handleDebouncedScroll = debounce(this.handleScroll, 30);
    window.addEventListener("scroll", this.handleDebouncedScroll);
  },
  methods: {
    handleScroll (e) {
      if (this.isMoving) return;
      this.isMoving = true
      this.isUserScrolling = window.scrollY > 0;
      this.scrollY = window.top.scrollY;
      setTimeout(() => {
        this.isMoving = false
      }, 500);
    }
  },
  computed: {
    selectedImage () {
      return "default"

      // var topic = this.$store.getters.getTopic
      // if (topic != '') {
      //   return "default"
      // }
      // return "dark"
    }
  },
  beforeDestroy () {
    window.removeEventListener("scroll", this.handleDebouncedScroll);
  }
};
</script>
<style lang="scss">
.v-application {
  background: transparent !important;
}
body {
  background-color: #111;
}
#container-background {
  position: fixed;
  max-height: 100vh;
  overflow: hidden;
  z-index: -1;
  #backgroundImg {
    position: relative;
    width: 110vw;
    height: 120vh;
    background-color: black;
    filter: blur(15px) brightness(0.8);
    transition: top 1s;
    z-index: 0;
  }
  #background {
    position: relative;
    width: 110vw;
    height: 120vh;
    // background: rgb(38, 38, 38);
    background-color: black;
    background-image: url("../assets/bg_winter.jpg");
    background-size: cover;
    left: -5vw;
    filter: blur(15px) brightness(0.8);
    transition: top 1s;
    z-index: 0;
  }
  #image-sample {
    position: relative !important;
    z-index: 0;
    top: -1056px;
    left: 52vw;
    width: 450px;
    height: 290px;
    margin-bottom: -400px;
    filter: brightness(1.5) contrast(1.2);
  }
  #video-container {
    position: absolute;
    overflow: hidden;
    top: 5em;
    left: 50vw;
    width: 450px;
  }
}
</style>
