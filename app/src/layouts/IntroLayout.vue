<template>
  <transition name="page-move">
    <v-parallax
      v-if="show"
      id="title-parallax"
      class="text-center px-5"
      src="../../src/assets/bg_black.jpeg"
    >
      <div class="flexbox">
        <h1 id="logo" class="logo mr-3 display-3 shadow" @click="expandTopic()">Inspired by</h1>
        <v-expand-transition class="d-inli2ne-block">
          <h1
            :style="{ width: true ? '300' : '0' }"
            class="expansion logo"
          >{{ selectedTopic.title }}</h1>
          <!-- <h2 v-show="expand" id="expansion">{</h2> -->
        </v-expand-transition>
        <p>{{ selectedTopic.contents }}</p>
      </div>
      <v-btn
        v-show="isTopicSelected"
        class="ma-2 flex-grow-0"
        outlined
        color="white"
        @click="goToTopicPage"
      >Explore ></v-btn>
      <h2
        v-bind:key="topic.title"
        class="topic shadow"
        v-for="topic in topics"
        :style="{ top: topic.top, left: topic.left }"
        @click="selectTopic(topic)"
      >{{ topic.title }}</h2>
    </v-parallax>
  </transition>
</template>

<script>
import gql from "graphql-tag";

export default {
  name: "HelloWorld",
  data: () => ({
    show: true,
    expand: true,
    widthExpand: 0,
    selectedTopic: {},
    isTopicSelected: false,
    topics: [
      {
        title: "OpenCV"
      },
      {
        title: "ROS"
      },
      {
        title: "Philosophy",
        contents:
          "“Is man merely a mistake of God's? Or God merely a mistake of man's?” – Friedrich Nietzsche"
      },
      {
        title: "Memory"
      },
      {
        title: "Indonesian"
      },
      {
        title: "English"
      }
    ]
  }),
  created () {
    for (let i in this.topics) {
      this.topics[i]["top"] = this.randomPosY() + "vh";
      this.topics[i]["left"] = this.randomPosX() + "vw";
    }
  },
  computed: {},
  mounted () {
    console.log(this.sample);
  },
  methods: {
    expandTopic () {
      this.expand = !this.expand;
    },
    selectTopic (key) {
      this.selectedTopic = key;
      this.isTopicSelected = true;
      this.$store.dispatch("setTopic", { newTopic: key.title });
    },
    randomPosX () {
      return Math.floor(Math.random() * 80, 80) + 10;
    },
    randomPosY () {
      var val = Math.floor(Math.random() * 50, 50) + 5;
      return val > 25 ? val + 35 : val;
    },
    goToTopicPage () {
      this.show = false;
      setTimeout(() => {
        this.$store.commit("setIsMain", false);
        this.$router.push('/' + this.selectedTopic.title);
      }, 1000)
    }
  }
};
</script>

<style lang="scss" scoped>
#title-parallax {
  background-color: #111;
  font-family: "Times New Roman", Times, serif;
  min-height: 100vh;
  cursor: default;
  .flexbox {
    flex: 1;
    display: flex;
    // line-height: 30vw;
    flex-wrap: wrap;
    align-items: baseline;
    align-content: center;
    text-align: center;
    align-self: center;
    h1 {
      display: inline-block;
      // line-height: 100vh;
      font-weight: 500;
      font-family: "Times New Roman", Times, serif !important;
      transition: width 1s;
      overflow: hidden;
      z-index: 10;
    }
    .expansion {
      display: inline-block;
      // line-height: 100vh;
      font-size: 10vw;
      color: #999;
    }
    p {
      font-size: larger;
    }
  }
}

.topic {
  font-size: x-large;
  color: #999;
  position: absolute;
  font-weight: 300;
  top: 10vw;
  left: 30vw;
}

.shadow {
  text-shadow: 0 0 10px #111, 0 0 20px #111, 0 0 30px #222, 0 0 40px #222,
    0 0 50px #222, 0 0 60px #222, 0 0 70px #222;
}

.glow {
  -webkit-animation: glow 5s ease-in-out infinite alternate;
  -moz-animation: glow 5s ease-in-out infinite alternate;
  animation: glow 5s ease-in-out infinite alternate;
}

@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #111, 0 0 20px #111, 0 0 30px #222, 0 0 40px #222,
      0 0 50px #222, 0 0 60px #222, 0 0 70px #222;
  }
  to {
    text-shadow: 0 0 20px #fff, 0 0 30px #eee, 0 0 40px #eee, 0 0 50px #eee,
      0 0 60px #eee, 0 0 70px #eee, 0 0 80px #eee;
  }
}
</style>
