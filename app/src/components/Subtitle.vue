<template>
  <div id="subtitle" :class="[pageType, isMoving ? 'isMoving' : '']">
    <div v-if="pageType == 'git'">
      <v-row>
        <v-col cols="12">
          <div
            id="line-box"
            :style="{top: valPosY + 'vh', left: valPosX + 'vw', transform: 'rotate(' + valRotate + 'deg)'}"
          ></div>
          <div id="title"></div>
        </v-col>
      </v-row>
      <v-row class="subheader-box" align="end">
        <v-col class="pa-0 mt-0" cols="4">
          <div class="leftside edge"></div>
          <div id="title-subheader"></div>
        </v-col>
        <v-col class="title-box pa-0 mt-0" cols="4">
          <v-row align="center">
            <v-col cols="5" class="justify-end">
              <img src="../assets/GitHub-Mark-Light-120px-plus.png" />
            </v-col>
            <v-col cols="7" class="justify-left">
              <div>
                <h1>{{ titleText[pageType] }}</h1>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="pa-0 mt-0" cols="4">
          <div id="title-subheader"></div>
        </v-col>
      </v-row>
      <v-row class="blank-row">
        <v-col class="pa-0 ma-0" cols="12"></v-col>
      </v-row>
    </div>
    <!-- <v-container class="intro-container" v-if="pageType=='intro'"></v-container> -->
    <div v-if="pageType=='intro'">
      <custom-startitle :topic="{'title': topic, 'x': '50vw', 'y': '50vh'}" selected />
      <transition name="fade">
        <v-container id="intro-container" class="pa-0">
          <canvas
            id="curved"
            class="selected"
            width="500"
            :height="4600 + windowHeight"
            ref="curved"
          ></canvas>
        </v-container>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "custom-subtitle",
  // props: ['', 'isInspiration'],
  data: () => ({
    valPosX: 0,
    valPosY: 50,
    valRotate: 0,
    titleText: {
      'home': "Inspired by",
      'git': "Git Project",
      'inspiration': "Inspiration",
      'post': null,
    },
    windowHeight: window.innerHeight
  }),
  created () {
  },
  computed: {
    pageType () {
      return this.$store.getters.getPageType;
    },
    isMoving () {
      return !(this.$store.getters.getShow);
    },
    topic () {
      return this.$store.getters.getTopic;
    }
  },
  mounted () {
    if (this.pageType == 'intro') {
      var canvas = this.$refs['curved']
      var ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 3;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
      ctx.beginPath();
      ctx.moveTo(250, 0);
      ctx.quadraticCurveTo(250, 700, 250, 1400);
      ctx.moveTo(250, 1400);
      ctx.quadraticCurveTo(250, 1800, 125, 2200);
      ctx.moveTo(125, 2200);
      ctx.quadraticCurveTo(0, 2600, 0, 3000);
      ctx.moveTo(0, 3000);
      ctx.quadraticCurveTo(0, 3400, 250, 3800);
      ctx.moveTo(250, 3800);
      ctx.quadraticCurveTo(500, 4200, 500, 4600);
      ctx.moveTo(500, 4600);
      ctx.quadraticCurveTo(500, 4700, 500, 4600 + this.windowHeight);
      ctx.stroke();
    }
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
@keyframes slideout {
  to {
    top: -4600px;
  }
}

#subtitle {
  // &.home {
  //   transform: translate(-100vw, 100vh);
  // }
  & {
    transform: translateX(100vw);
  }
  &.intro {
    width: 100vw;
    height: 100vh;
    transform: translateY(-100vh);
    // transform: translate(0, 0);
    margin-bottom: -2px;
  }
  &.git {
    width: 117vw;
    height: 70vh;
    margin-top: 40vh;
    padding-left: 7vw;
    transform: translateX(-100vw);
  }
  &.inspiration {
    transform: translate(85vw, -110vh);
  }
  &.isMoving {
    transform: translate(0, 0);
  }
  top: 0;
  left: 0;
  position: absolute;
  transition: transform 1s;
  z-index: 0;
  overflow: hidden;

  .col {
    padding-top: 0;
    padding-bottom: 0;
  }

  .title-box {
    position: relative;
    top: 1em;
    width: 100%;
    height: 100px;
    border: 2px solid rgba(255, 255, 255, 0.12);
    border-radius: 2em;
    color: rgba(255, 255, 255, 0.5);
    background: rgb(23, 21, 22);
    img {
      width: 5em;
      object-fit: cover;
      opacity: 0.13;
    }
  }
  .subheader-box {
    .col {
      display: flex;
      #title-subheader {
        flex: 1;
        text-align: center;
        padding-top: 0;
        border-top: 2px solid rgba(255, 255, 255, 0.12);
        margin-bottom: 2em;
        span {
          position: relative;
          top: 1.2em;
          background: #424242;
          border-radius: 0.5em;
          color: #999;
          font-size: medium;
          padding: 0.25em 0.5em;
        }
      }
      .edge {
        display: block;
        width: 2em;
        height: 2em;
        // margin-top: -0.9em;
        // margin-bottom: -2em;
        border: 2px solid rgba(255, 255, 255, 0.12);
        &.leftside {
          position: relative;
          top: 0;
          border-bottom: none;
          border-right: none;
          border-top-left-radius: 2em;
        }
        &.rightside {
          position: relative;
          top: 0;
          border-bottom: none;
          border-left: none;
          border-top-right-radius: 2em;
        }
      }
    }
  }
  .blank-row {
    height: 50vh;
    border-left: 2px solid rgba(255, 255, 255, 0.12);
  }
  #intro-container {
    z-index: 1;
    text-align: right;
    margin-bottom: -2px;
    #curved {
      position: relative;
      top: 45vh;
      // opacity: 0;
      &.selected {
        animation-name: slideout;
        animation-delay: 1s;
        animation-duration: 2s;
        animation-timing-function: ease-in;
        animation-fill-mode: forwards;
      }
    }
  }
}
</style>
