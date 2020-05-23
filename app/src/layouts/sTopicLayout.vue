<template>
  <div>
    <transition :name="transitionName">
      <div v-if="isShowing" id="topic-layout">
        <div id="topic-contents-column" :class="{'post-mode': pageTo != 'topic'}">
          <router-view />
        </div>
        <transition name="item-fade">
          <div id="topic-intro-column" v-if="pageTo == 'topic'">
            <img id="fg" src="../assets/topic_opencv_fg_2.png" />
            <img id="shade" src="../assets/topic_opencv_shade.png" />
          </div>
        </transition>
        <div id="topic-contents-bg"></div>
      </div>
    </transition>
    <custom-post-loader />
    <!-- <custom-general-post :data="{'title': 'test'}"></custom-general-post> -->

    <transition name="item-fade" mode="out-in">
      <div v-if="isPostOpened">
        <div id="scrim" role="document" tabindex="0" @click="closePost()" />
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "TopicLayout",
  data: () => ({
    transitionName: "topic-any",
    state: 'topic',
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
    },
  },
  computed: {
    topic () {
      return this.$store.getters.getTopic;
    },
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
#topic-layout {
  #topic-contents-column {
    position: absolute;
    top: 0;
    right: 0;
    will-change: right;
    width: 50vw;
    min-height: 100vh;
    overflow: auto;
    transition: right 1s;
    z-index: 500;
    &.post-mode {
      right: 70vw;
    }
  }

  #topic-intro-column {
    position: fixed;
    overflow: hidden;
    width: 60vw;
    height: 100vh;
    // animation: topic-intro 1s ease-in 0.5s;
    // animation-fill-mode: forwards;
    opacity: 1;
    transition: opacity 0.5s;
    z-index: 100;
    background: linear-gradient(0 deg, 0%#000, 10% #333, 100% #fff);
    #fg {
      position: absolute;
      width: 55vw;
      bottom: 0;
      transform: rotate(-5deg);
      margin-left: 50px;
      margin-bottom: 10vh;
      mix-blend-mode: overlay;
      object-fit: contain;
      z-index: 200;
    }
    #shade {
      position: absolute;
      width: 170%;
      bottom: 0;
      margin-left: 5vw;
      margin-bottom: -5vh;
      object-fit: cover;
      z-index: 610;
    }
  }

  #topic-contents-bg {
    position: fixed;
    top: 0;
    right: 0;
    overflow: hidden;
    width: 0;
    height: 100vh;
    backdrop-filter: brightness(2);
    animation: contents-column-intro 1s ease-in-out 1.5s;
    animation-fill-mode: forwards;
  }
}
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
