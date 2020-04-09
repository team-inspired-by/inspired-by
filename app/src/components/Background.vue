<template>
  <transition name="item-fade" appear>
    <div id="container-background">
      <!-- <img id="image-sample" :style="{top: -905 + top + 'px'}" src="../assets/samplacam2.png" /> -->
      <!-- <div
      id="background"
      :style="{ top: -scrollY / 5 + 'px', 'background-image': 'url(\'' + image[selectedImage] + '\')' }"
      ></div>-->

      <!-- <img id="backgroundImg" :src="image[selectedImage]" /> -->

      <div id="video-container" :class="viewpoint">
        <video ref="video" src="../assets/mv-bg-teal.mp4" loop muted="muted"></video>
      </div>
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
    isMoving: false,
    viewpoint: 'normal'
  }),
  mounted () {
    // this.handleDebouncedScroll = debounce(this.handleScroll, 30);
    // window.addEventListener("scroll", this.handleDebouncedScroll);
  },
  methods: {
    // handleScroll (e) {
    //   if (this.isMoving) return;
    //   this.isMoving = true
    //   this.isUserScrolling = window.scrollY > 0;
    //   this.scrollY = window.top.scrollY;
    //   setTimeout(() => {
    //     this.isMoving = false
    //   }, 500);
    // }
  },
  computed: {
    selectedImage () {
      return "default"
      // var topic = this.$store.getters.getTopic
      // if (topic != '') {
      //   return "default"
      // }
      // return "dark"
    },
    videoState () {
      return this.$store.getters.getVideoState;
    },
    pageFrom () {
      return this.$store.getters.getPageFrom;
    },
    pageTo () {
      return this.$store.getters.getPageTo;
    }
  },
  watch: {
    videoState (newVal, oldVal) {
      if (newVal == true && oldVal == false)
        var playState = this.$refs['video'].play();
    },
    pageTo (newVal, oldVal) {
      if (newVal == oldVal) return;
      if (newVal == "treeview")
        this.viewpoint = 'landscape'
      else if (newVal == "writer" || newVal == "admin")
        this.viewpoint = 'leftside'
      else if (newVal == "git")
        this.viewpoint = 'rightside'
      else
        this.viewpoint = 'normal'
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
    position: fixed;
    overflow: hidden;
    width: 140vw;
    height: 100vh;
    margin-left: -20vw;
    will-change: width, margin;
    transition: width 4s, margin 4s;

    &.landscape {
      width: 100vw;
      margin-left: 0;
    }
    &.leftside {
      margin-left: 0;
    }
    &.rightside {
      margin-left: -40vw;
    }

    video {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
