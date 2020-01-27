<template>
  <div>
    <custom-startitle :key="key" :topic="topic" v-for="(topic, key) in topics" />
    <transition name="slide-fade">
      <div v-if="!selectedTopic">
        <div id="bg-container" :style="{'background-position-y':backPosY}"></div>
        <div v-if="focusedTopic" id="descriptor">
          <p>{{focusedTopic.description}}</p>
          <v-btn class="ma-2" outlined color="grey">See this story ></v-btn>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "IntroLayout",
  data: () => ({
    showDescription: false,
    topics: [
      {
        title: "OpenCV",
        description: "Image processing with the representative framework, OpenCV"
      },
      {
        title: "ROS"
      },
      {
        title: "Philosophy",
        description:
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
    ],
    backPosY: 0,
  }),
  created () {
    for (let i in this.topics) {
      this.topics[i]["y"] = this.randomPosY() + "vh";
      this.topics[i]["x"] = this.randomPosX() + "vw";
    }
    this.$store.commit('focusTopic', '')
    this.$store.commit('setTopic', '')
  },
  mounted () {
    setTimeout(() => {
      this.backPosY = 'bottom';
    }, 500);
  },
  methods: {
    randomPosX () {
      return Math.floor(Math.random() * 90, 90) + 5;
    },
    // randomPosY () {
    //   var val = Math.floor(Math.random() * 50, 50) + 5;
    //   return val > 25 ? val + 35 : val;
    // },
    randomPosY () {
      return Math.floor(Math.random() * 60, 60);
    }
  },
  computed: {
    focusedTopic () {
      var title = this.$store.getters.getFocusedTopic
      return this.topics.filter(obj => { return obj.title == title })[0]
    },
    selectedTopic () {
      return this.$store.getters.getTopic;
    },
    isTopicSelected () {
      return this.selectedTopic != ''
    }
  },
}
</script>

<style lang="scss" scoped>
#bg-container {
  position: fixed;
  width: 100vw;
  height: 100vh;
  max-width: 100vw;
  max-height: 100vh;
  background-color: #333;
  background-image: url("../assets/bg_space.jpg");
  background-size: cover;
  transition: background-position 2s;
  filter: brightness(0.5);
  z-index: 0;
}
#descriptor {
  position: fixed;
  max-width: 50vw;
  bottom: 2em;
  right: 5.5rem;
  font-size: x-large;
  color: #aaa;
  text-align: right;
  z-index: 5;
  * {
    font-family: "Times New Roman", Times, serif !important;
  }
}
</style>