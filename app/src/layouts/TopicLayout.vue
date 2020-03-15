<template>
  <div>
    <transition :name="transitionName">
      <div v-if="isShowing">
        <router-view></router-view>
      </div>
    </transition>

    <transition name="item-fade" mode="out-in">
      <div v-if="isPostOpened">
        <div id="scrim" role="document" tabindex="0" @click="closePost()" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "MainLayout",
  data: () => ({}),
  created () {
    this.$store.commit("setTopic", this.$route.params.inspiration);
  },
  methods: {
    closePost () {
      this.$store.commit("closePost")
      this.$router.back();
    }
  },
  computed: {
    isPostOpened () {
      return this.$store.getters.getIsPostOpened;
    },
    isShowing () {
      return this.$store.getters.getShow;
    },
    pageType () {
      return this.$store.getters.getPageType;
    },
    transitionName () {
      if (this.pageType == "post") {
        return "";
      } else if (this.pageType == "intro") {
        return "intro-to-topic-move";
      } else {
        return "any-to-topic-move";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#scrim {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: black;
  opacity: 0.5;
  will-change: opacity;
  pointer-events: auto;
  -ms-touch-action: none;
  touch-action: none;
}
</style>
