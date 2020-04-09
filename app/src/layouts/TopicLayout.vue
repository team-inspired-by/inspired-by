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
  data: () => ({
    transitionName: "topic-any",
  }),
  created () {
    this.$store.commit("setTopic", this.$route.params.inspiration);
    // this.$store.commit("setVideoState", true);
  },
  async mounted () {
    await this.setTransitionName();
  },
  async beforeRouteLeave (to, from, next) {
    // console.log("before Routing:");
    // console.log(to, from);
    await this.setTransitionName(to.name);
    next();
  },
  methods: {
    closePost () {
      this.$store.commit("closePost")
      this.$router.back();
    },
    setTransitionName (to) {
      return new Promise(resolve => {
        let target;
        if (to)
          target = to
        else
          target = (this.pageFrom == "topic") ? this.pageTo : this.pageFrom
        if (target == "post") {
          this.transitionName = "";
        } else if (target == "intro") {
          this.transitionName = "topic-intro";
        } else if (target == "admin" || target == "writer") {
          this.transitionName = "topic-admin";
        } else if (target == "treeview") {
          this.transitionName = "topic-treeview";
        } else {
          this.transitionName = "topic-any";
        }
        console.log("transitionName:");
        console.log(this.transitionName);
        resolve();
      });
    }
  },
  computed: {
    isPostOpened () {
      return this.$store.getters.getIsPostOpened;
    },
    isShowing () {
      return this.$store.getters.getShow;
    },
    pageFrom () {
      return this.$store.getters.getPageFrom;
    },
    pageTo () {
      return this.$store.getters.getPageTo;
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
