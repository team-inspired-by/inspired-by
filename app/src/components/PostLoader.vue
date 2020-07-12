<template>
  <transition name="item-fade">
    <div
      v-if="$route.name=='post' && active && isShowing"
      id="post-loader"
      :class="{'dense': dense, 'hide': hide, 'wide': $vuetify.breakpoint.name === 'lg'}"
      class="align-center"
    >
      <!-- <custom-general-post :position="posListedPosts[0]" :post="loadedPosts[idxListedPosts[0]]" />
      <custom-general-post :position="posListedPosts[1]" :post="loadedPosts[idxListedPosts[1]]" />
      <custom-general-post :position="posListedPosts[2]" :post="loadedPosts[idxListedPosts[2]]" />
      <custom-general-post :position="posListedPosts[3]" :post="loadedPosts[idxListedPosts[3]]" />
      <custom-general-post :position="posListedPosts[4]" :post="loadedPosts[idxListedPosts[4]]" />-->
      <div id="read-container" :key="i" v-for="i in [0,1,2,3,4]">
        <template
          v-if="loadedPosts[idxListedPosts[i]] && loadedPosts[idxListedPosts[i]].postType == 'GENERAL'"
        >
          <custom-general-post
            :position="posListedPosts[i]"
            :post="loadedPosts[idxListedPosts[i]]"
            :intro="intro"
            :hide="value"
          />
        </template>
        <template
          v-if="loadedPosts[idxListedPosts[i]] && loadedPosts[idxListedPosts[i]].postType == 'GIT'"
        >
          <custom-git-post
            :position="posListedPosts[i]"
            :post="loadedPosts[idxListedPosts[i]]"
            :intro="intro"
            :hide="value"
          />
        </template>
      </div>
      <transition name="add-post-fade">
        <div id="add-container" v-show="value">
          <custom-new-post
            v-model="selectedAddPostBox"
            :type="val"
            v-for="val in writingTypes"
            :key="val.key"
          />
        </div>
      </transition>
      <!-- <custom-general-post
        v-for="(val, key) in idxListedPosts"
        :key="key"
        :position="posListedPosts[key]"
        :post="loadedPosts[val]"
      />-->
      <div
        v-if="value"
        id="scrim-transparent"
        @click="selectedAddPostBox ? selectedAddPostBox = '' : $emit('input', false)"
      />
    </div>
  </transition>
</template>

<script>
import GeneralPost from "./GeneralPost";
import GitPost from "./GitPost";

export default {
  name: "custom-post-loader",
  components: {
    GeneralPost,
    GitPost
  },
  props: {
    dense: Boolean,
    hide: Boolean,
    value: Boolean,
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
      selectedAddPostBox: '',
      writingTypes: [
        {
          postType: "General Post",
          key: "GENERAL",
          icon: "newspaper",
          description: "normal posts",
        },
        {
          postType: "Git Post",
          key: "GIT",
          icon: "git",
          description: "link your git project",
        },
        {
          postType: "Book Post",
          key: "BOOK",
          icon: "book",
          description: "for book review",
        },
        {
          postType: "Series",
          key: "SERIES",
          icon: "ballot",
          description: "sum up the posts",
        },
      ],
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
    isShowing () {
      return this.$store.getters.getShow;
    }
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
        this.idxListedPosts[this.currentIdx] = 0;
      }
      if (newVal['post']) {
        if (this.keyLoadedPosts.indexOf(newVal.key) == -1) {
          console.debug("key: ", newVal.key)
          this.loadedPosts.push(newVal.post);
          this.keyLoadedPosts.push(newVal.key);
        }
        // console.debug((newVal.key in this.keyLoadedPosts));
        const idxLoadedPost = this.keyLoadedPosts.indexOf(newVal.key);
        const movingStep = Math.min(2, Math.max(-2, this.currentKey - newVal.key));

        console.debug("idxLoadedPost: ", idxLoadedPost, "movingStep: ", movingStep, this.keyLoadedPosts);
        console.debug("loadedPosts: ", this.loadedPosts);

        // if (movingStep <= -2 || movingStep >= 2) {
        //   this.idxListedPosts[2 + movingStep] = idxLoadedPost;
        // }
        this.currentIdx = (this.currentIdx - movingStep + 5) % 5;

        this.idxListedPosts[this.currentIdx] = idxLoadedPost;
        console.debug("idxListedPosts: ", this.idxListedPosts, "currentIdx: ", this.currentIdx)

        for (let i in this.posListedPosts) {
          this.posListedPosts[i] = (this.posListedPosts[i] + movingStep + 5) % 5;
        }
        this.currentKey = newVal.key;
      }
    },
    value (newVal) {
      console.debug("value on PostLoader: ", newVal)
    }
  },
}
</script>

<style lang="scss" scoped>
#post-loader {
  position: fixed;
  bottom: 0;
  right: 3em;
  width: 70vw;
  height: 200vh;
  transition: right 0.5s transform 1s;
  &.wide {
    right: calc(-5em + 15vw);
  }
  &.dense {
    right: 1em;
  }
  &.wide.dense {
    right: calc(-5em + 10vw);
  }
  &.hide {
    transform: translateY(200vh);
  }
  #read-container {
    z-index: 110;
  }
  #add-container {
    * {
      z-index: 71;
    }
  }
  #scrim-transparent {
    position: fixed;
    width: 100vw;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 99;
  }
}
</style>