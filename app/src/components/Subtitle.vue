<template>
  <div id="subtitle" :class="[title, isMoving ? 'isMoving' : '']">
    <div v-if="title == 'git'">
      <v-row class="subheader-box" align="end">
        <v-col class="pa-0 mt-0" cols="2">
          <div class="leftside edge"></div>
          <div id="title-subheader"></div>
        </v-col>
        <v-col class="title-box pa-0 mt-0" cols="7">
          <v-row align="center">
            <v-col cols="5" class="justify-end">
              <img src="../assets/GitHub-Mark-Light-120px-plus.png" />
            </v-col>
            <v-col cols="7" class="justify-left">
              <div>
                <h1>{{ titleText[title] }}</h1>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="pa-0 mt-0" cols="2">
          <div id="title-subheader"></div>
        </v-col>
      </v-row>
      <v-row class="blank-row left-line">
        <v-col class="pa-0 ma-0" cols="12"></v-col>
      </v-row>
    </div>
    <div v-if="title == 'writer' || title == 'admin'">
      <v-row class="subheader-box" align="end">
        <v-col class="pa-0 mt-0" cols="3">
          <div id="title-subheader"></div>
        </v-col>
        <v-col class="title-box pa-0 mt-0" cols="6">
          <v-row align="center">
            <v-col cols="5" class="justify-end">
              <v-icon size="4em" color="grey">mdi-pencil</v-icon>
            </v-col>
            <v-col cols="7" class="justify-left text-center">
              <div>
                <h1>{{ titleText[title] }}</h1>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="pa-0 mt-0" cols="3">
          <div id="title-subheader"></div>
          <div class="rightside edge"></div>
        </v-col>
      </v-row>
      <v-row class="blank-row right-line">
        <v-col class="pa-0 ma-0" cols="12"></v-col>
      </v-row>
    </div>
    <!-- <v-container class="intro-container" v-if="title=='intro'"></v-container> -->
    <!-- <div> -->
    <div v-if="title == 'topic-intro'">
      <custom-startitle ref="startitle" :topic="{ name: topicName, x: '50vw', y: '50vh' }" isIntro />
      <!-- </div>
      <div>-->
      <v-container id="intro-container" class="pa-0">
        <canvas
          id="curved"
          :class="{ intro: title == 'topic-intro' }"
          width="500"
          :height="4600 + windowHeight"
          ref="curved"
        ></canvas>
      </v-container>
    </div>
    <div v-if="title == 'topic-any'">
      <!-- <custom-startitle ref="startitle" :topic="{ name: topicName, x: '50vw', y: '50vh' }" isIntro /> -->
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
      home: "Inspired by",
      git: "Git Project",
      writer: "Writer",
      admin: "Settings",
      inspiration: "Inspiration",
      post: null
    },
    windowHeight: window.innerHeight
  }),
  created () { },
  computed: {
    pageFrom () {
      return this.$store.getters.getPageFrom;
    },
    pageTo () {
      return this.$store.getters.getPageTo;
    },
    title () {
      if (this.pageTo == "topic") {
        if (this.pageFrom == "intro") {
          return "topic-intro"
          // } else if (this.pageFrom == "writer" || this.pageFrom == "admin") {
          //   return "topic-any"
        } else {
          return "topic-any"
        }
      } else {
        return this.pageTo;
      }
    },
    isMoving () {
      // return true;
      return !this.$store.getters.getShow;
    },
    topicName () {
      return this.$store.getters.getTopic;
    }
  },
  watch: {
    pageTo (newVal) {
      if (newVal == "topic" && (this.pageFrom == "" || this.pageFrom == "intro")) {
        setTimeout(() => {
          var left = this.$refs["startitle"].$el.offsetLeft;
          console.log(this.$refs["startitle"]);
          var canvas = this.$refs["curved"];
          var ctx = canvas.getContext("2d");
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.lineWidth = 3;
          ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
          ctx.beginPath();
          ctx.moveTo(left, 0);
          ctx.quadraticCurveTo(250, 700, 250, 1400);
          // ctx.moveTo(250, 0);
          // ctx.quadraticCurveTo(250, 700, 250, 1400);
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
        }, 1000);
      }
    }
  },
};
</script>

<style lang="scss" scoped>
@keyframes slideout {
  to {
    top: -4600px;
  }
}

@keyframes test {
  from {
    transform: translateX(-100vw);
  }
  20% {
    transform: translateX(0);
  }
  70% {
    transform: translateX(0);
  }
  90% {
    transform: translateX(130vw);
  }
}

#subtitle {
  // &.home {
  //   transform: translate(-100vw, 100vh);
  // }
  & {
    transform: translateX(-100vw);
  }
  &.topic-intro {
    width: 100vw;
    height: 100vh;
    // opacity: 0;
    // transform: translate(0, 0);
    transform: translateY(-130vh);
    // transform: translateX(-50vw);
    // transform: translate(0, 0);
    margin-bottom: -2px;
  }
  &.topic-any {
    width: 100vw;
    height: 100vh;
    transform: translateX(130vw);
  }
  &.git {
    width: 117vw;
    height: 70vh;
    margin-top: 40vh;
    padding-left: 7vw;
    transform: translateX(-130vw);
  }
  &.writer,
  &.admin {
    width: 93vw;
    height: 70vh;
    margin-top: 45vh;
    padding-right: 7vw;
    transform: translateX(130vw);
    // animation-name: test;
    // animation-duration: 3s;
    // animation-timing-function: ease-out;
    // animation-fill-mode: forwards;
  }
  &.inspiration {
    transform: translate(100vw, -130vh);
  }
  &.isMoving {
    // opacity: 1;
    transform: translate(0, 0);
  }
  top: 0;
  left: 0;
  position: absolute;
  transition: transform 0.5s;
  transition-timing-function: ease-in;
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
    border: 2px solid rgba(255, 255, 255, 0.22);
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
        border-top: 2px solid rgba(255, 255, 255, 0.22);
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
        border: 2px solid rgba(255, 255, 255, 0.22);
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
    &.left-line {
      border-left: 2px solid rgba(255, 255, 255, 0.22);
    }
    &.right-line {
      border-right: 2px solid rgba(255, 255, 255, 0.22);
    }
  }
  #intro-container {
    z-index: 1;
    text-align: right;
    margin-bottom: -2px;
    #curved {
      position: relative;
      top: 45vh;
      &.intro {
        animation-name: slideout;
        animation-delay: 1s;
        animation-duration: 2s;
        animation-timing-function: ease-in;
        // animation-fill-mode: initial;
        animation-fill-mode: forwards;
      }
    }
  }
}
</style>
