<template>
  <div>
    <transition name="item-fade" appear>
      <div id="container-background">
        <!-- <img id="image-sample" :style="{top: -905 + top + 'px'}" src="../assets/samplacam2.png" /> -->
        <!-- <div
      id="background"
      :style="{ top: -scrollY / 5 + 'px', 'background-image': 'url(\'' + image[selectedImage] + '\')' }"
        ></div>-->
        <div id="gradient-container">
          <img src="../assets/topic_main_bg.jpg" />
        </div>
        <!-- <img id="backgroundImg" :src="image[selectedImage]" /> -->

        <!-- <div id="video-container" :class="viewpoint"> -->
        <!-- <video ref="video" src="../assets/mv-bg-teal.mp4" loop muted="muted"></video> -->
        <!-- </div> -->
        <transition name="item-fade">
          <div
            id="topic-intro-bg-column"
            v-show="loaded['bg'] && currentPage == 'topic' && isShowing"
          >
            <img id="bg" @load="loaded.bg = true;" src="../assets/topic_opencv_bg.jpg" />
          </div>
        </transition>
      </div>
    </transition>
  </div>
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
    viewpoint: 'normal',
    loaded: {
      'bg': false
    },
    currentPage: '',
  }),
  mounted () {
    // this.handleDebouncedScroll = debounce(this.handleScroll, 30);
    // window.addEventListener("scroll", this.handleDebouncedScroll);
    this.currentPage = this.$route.name;
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
    isShowing () {
      return this.$store.getters.getShow;
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
        if (this.$refs['video'])
          var playState = this.$refs['video'].play();
    },
    pageTo (newVal, oldVal) {
      if (newVal == oldVal) return;
      this.currentPage = newVal;
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
@keyframes topic-intro {
  from {
    width: 100vw;
    left: 100vw;
  }
  50% {
    width: 40vw;
  }
  to {
    width: 70vw;
    left: 0;
  }
}

@keyframes topic-bg-intro {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
    width: 100vw;
    height: 90vh;
    right: 15vw;
    bottom: 10vh;
  }
}

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
  #gradient-container {
    position: fixed;
    overflow: hidden;
    width: 100vw;
    height: 100vh;
    top: 0;
    background: linear-gradient(45deg, #000, #333);
    z-index: 0;
    & > img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      mix-blend-mode: overlay;
    }
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

  #topic-intro-bg-column {
    position: fixed;
    overflow: hidden;
    width: 120vw;
    height: 100vh;
    bottom: 0;
    right: 0;
    opacity: 0;
    z-index: 10;
    // transition: opacity 1s 1s, right 1s;
    transition: all 1s;
    background: url("../assets/mask-painting.png");
    background-color: black;
    background-size: contain;
    background-repeat: no-repeat;
    background-position-y: bottom;
    mix-blend-mode: screen;
    animation: topic-bg-intro 3s normal;
    animation-fill-mode: forwards;
    // animation-delay: 1s;
    #bg {
      width: 100%;
      object-fit: cover;
      mix-blend-mode: multiply;
      z-index: 110;
    }
  }
}
</style>
