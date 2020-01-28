<template>
  <div>
    <transition :name="transitionName">
      <div v-if="show">
        <router-view></router-view>
      </div>
    </transition>
    <custom-subtitle></custom-subtitle>
  </div>
</template>

<script>
export default {
  name: "MainLayout",
  data: () => ({}),
  created () {
    this.$store.commit("setTopic", this.$route.params.inspiration);
  },
  computed: {
    show () {
      return this.$store.getters.getShow;
    },
    pageType () {
      return this.$store.getters.getPageType;
    },
    transitionName () {
      if (this.pageType == "post") {
        return "";
      } else if (this.pageType == "intro") {
        return "intro-move";
      } else {
        return "page-move";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
