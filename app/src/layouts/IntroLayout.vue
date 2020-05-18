<template>
  <div>
    <custom-startitle :key="key" :topic="topic" v-for="(topic, key) in topics" />
    <transition name="slide-fade">
      <div v-if="!selectedTopic">
        <div id="bg-container" :style="{ 'background-position-y': backPosY }"></div>
        <div v-if="focusedTopic" id="descriptor">
          <p>{{ focusedTopic.coverDescription }}</p>
          <v-btn class="ma-2" outlined color="grey" @click="routeToTopic()">See this story ></v-btn>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { getTopicList } from "../queries/queryContents";

export default {
  name: "IntroLayout",
  apollo: {
    topics: {
      client: "inspiredBy",
      query () {
        return getTopicList;
      },
      update: data => {
        if (data["getTopicList"] && data.getTopicList.success) {
          const topics = data.getTopicList.topics;
          for (let i in topics) {
            topics[i]['y'] = Math.floor(Math.random() * 60, 60) + "vh";
            topics[i]['x'] = Math.floor(Math.random() * 90, 90) + 5 + "vw";
          }
          console.debug(topics);
          return topics;
        } else {
          console.error("Error occurred when updating getTopicList, data:");
          console.error(data);
        }
      }
    }
  },
  data: () => ({
    showDescription: false,
    // topics: [],
    positions: [],
    backPosY: 0
  }),
  created () {
    // for (let i in this.topics) {

    //   this.positions[i]["y"] = Math.floor(Math.random() * 60, 60) + "vh";
    //   this.positions[i]["x"] = Math.floor(Math.random() * 90, 90) + 5 + "vw";
    // }
    this.$store.commit("focusTopic", "");
    this.$store.commit("setTopic", "");
  },
  mounted () {
    setTimeout(() => {
      this.backPosY = "bottom";
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
    },
    routeToTopic () {
      // console.log(this.focusedTopic)
      this.$store.commit("setTopic", this.focusedTopic);
      this.$router.push("/topic/" + this.focusedTopic);
    }
  },
  computed: {
    topics () {
      return this.$apolloData.data.topics;
    },
    focusedTopic () {
      // var title = this.$store.getters.getFocusedTopic
      // return this.topics.filter(obj => { return obj.title == title })[0]
      return this.$store.getters.getFocusedTopic;
    },
    selectedTopic () {
      return this.$store.getters.getTopic;
    },
    isTopicSelected () {
      return this.selectedTopic != "";
    }
  }
};
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
    // font-family: "Times New Roman", Times, serif !important;
  }
}
</style>
