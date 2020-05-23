<template>
  <transition name="item-fade">
    <div v-if="$route.name=='post' && active" id="post-loader">
      <!-- <custom-general-post :position="posListedPosts[0]" :post="loadedPosts[idxListedPosts[0]]" />
      <custom-general-post :position="posListedPosts[1]" :post="loadedPosts[idxListedPosts[1]]" />
      <custom-general-post :position="posListedPosts[2]" :post="loadedPosts[idxListedPosts[2]]" />
      <custom-general-post :position="posListedPosts[3]" :post="loadedPosts[idxListedPosts[3]]" />
      <custom-general-post :position="posListedPosts[4]" :post="loadedPosts[idxListedPosts[4]]" />-->
      <custom-general-post
        :key="i"
        v-for="i in [0,1,2,3,4]"
        :position="posListedPosts[i]"
        :post="loadedPosts[idxListedPosts[i]]"
        :intro="intro"
      />
      <!-- <custom-general-post
        v-for="(val, key) in idxListedPosts"
        :key="key"
        :position="posListedPosts[key]"
        :post="loadedPosts[val]"
      />-->
    </div>
  </transition>
</template>

<script>
import GeneralPost from "./GeneralPost";

export default {
  name: "custom-post-loader",
  components: {
    GeneralPost
  },
  data () {
    return {
      intro: true,
      active: false,
      positionName: ['', '', '', '', ''],
      currentKey: -1,
      currentIdx: -1,
      posListedPosts: [0, 1, 2, 3, 4],
      idxListedPosts: [-1, -1, -1, -1, -1],
      loadedPosts: [],
      keyLoadedPosts: [],
    }
  },
  mounted () {
    setTimeout(() => {
      this.intro = false;
    }, 3000);
  },
  computed: {
    selectedPost () {
      return this.$store.getters.getSelectedPost
    },
  },
  watch: {
    selectedPost (newVal, oldVal) {
      // if (newVal == oldVal) return;
      if (!this.active) {
        this.active = true;
        this.loadedPosts.push(newVal.post);
        this.keyLoadedPosts.push(newVal.key);
        this.currentKey = newVal.key;
        this.currentIdx = 2;
        this.idxListedPosts[this.currentIdx] = 1;
      }
      if (newVal['post']) {
        if (!(newVal.key in this.keyLoadedPosts)) {
          console.debug("key: ", newVal.key)
          this.loadedPosts.push(newVal.post);
          this.keyLoadedPosts.push(newVal.key);
        }
        console.debug((newVal.key in this.keyLoadedPosts));
        const idxLoadedPost = this.keyLoadedPosts.indexOf(newVal.key);
        const movingStep = Math.min(2, Math.max(-2, this.currentKey - newVal.key));

        console.debug("idxLoadedPost: ", idxLoadedPost, "movingStep: ", movingStep, this.keyLoadedPosts);

        // if (movingStep <= -2 || movingStep >= 2) {
        //   this.idxListedPosts[2 + movingStep] = idxLoadedPost;
        // }
        this.currentIdx = Math.min(4, Math.max(0, this.currentIdx - movingStep));

        this.idxListedPosts[this.currentIdx] = idxLoadedPost;
        console.debug("idxListedPosts: ", this.idxListedPosts, this.currentIdx)

        for (let i in this.posListedPosts) {
          this.posListedPosts[i] += movingStep;
          if (this.posListedPosts[i] > 4)
            this.posListedPosts[i] -= 5;
          else if (this.posListedPosts[i] < 0)
            this.posListedPosts[i] += 5;
        }
        this.currentKey = newVal.key;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#post-loader {
  position: fixed;
  bottom: 0;
  right: 3em;
  width: 70vw;
  height: 200vh;
}
</style>