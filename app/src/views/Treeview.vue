<template>
  <div>
    <div id="map-box">
      <h1 class="ma-5">All Topics</h1>
      <div id="sigma-container"></div>
    </div>
    <transition name="item-fade" appeat>
      <v-row id="contents-box" class="mx-5 my-0" v-if="selected">
        <v-col
          cols="12"
          class="page px-3 text-center"
          @click="routeTo('/topic/' + selected)"
        >
          <h2 class="mb-5">
            Inspired by <span class="topic ml-2">{{ selected }}</span>
          </h2>
          <v-subheader>Recent Posts</v-subheader>
          <v-list-item 
            :key="test.id"
            v-for="(test, key) in [
              {
                id: 1,
                title: 'Test post',
              },
            ]"
          >
            <v-list-item-content>
              {{ test.title }}
            </v-list-item-content>
          </v-list-item>
        </v-col>
      </v-row>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Treeview",
  mounted() {
    this.$store.commit("setTreeviewSelected", this.topic);
    this.$sigma.create("sigma-container", this.topicList);
  },
  methods: {
    routeTo(path) {
      this.$router.push({ path: path });
    },
  },
  computed: {
    topic() {
      return this.$store.getters.getTopic;
    },
    topicList() {
      return this.$store.getters.getTopicList;
    },
    selected() {
      return this.$store.getters.getTreeviewSelected;
    },
  },
};
</script>

<style lang="scss" scoped>
#map-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  h1 {
    position: fixed;
    top: 1em;
    left: 1em;
  }
  #sigma-container {
    width: 100%;
    height: 100%;
  }
}
#contents-box {
  position: fixed;
  top: 0;
  right: 0;
  width: 25vw;
  min-width: 400px;
  height: 100vh;
  border: 2px solid rgba(255, 255, 255, 0.22);
  border-top: 2px solid transparent;
  border-bottom: 2px solid transparent;
  backdrop-filter: blur(5px);
  .page {
    width: 100%;
    height: 100%;
    padding-top: 4em;
    // min-height: 30em;
    // background: rgba(100, 100, 100, 0.22);
    // border-radius: 2em;

    transition: background 0.5s;
    z-index: 1;

    span.topic {
      font-size: 150%;
      font-family: "Finger Paint";
      color: #f7f473;
    }

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  }
}
</style>
