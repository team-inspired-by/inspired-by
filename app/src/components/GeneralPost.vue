<template>
  <transition name="item-fade">
    <v-row id="general-post" :class="[posName, intro ? 'intro' : '', 'detail']" v-if="post">
      <v-col cols="auto" class="pa-0 pr-3">
        <transition name="item-fade">
          <div class="thumb">
            <img :src="post && post['thumbnail'] ? post['thumbnail']['regular'] : ''" />
          </div>
        </transition>
      </v-col>
      <v-col cols="auto" class="pr-5">
        <h4 class="mt-4">{{post['postType']}}</h4>
        <h2>{{post['title']}}</h2>
      </v-col>
    </v-row>
  </transition>
</template>

<script>
export default {
  name: "custom-general-post",
  props: {
    'position': Number,
    'post': Object,
    'intro': Boolean
  },
  data () {
    return {
      active: false,
      showDetail: false,
    }
  },
  mounted () {
    setTimeout(() => {
      this.showDetail = true;
    }, 3000);
    // this.post = this.data;
    // console.debug('post on GeneralPost: ', this.post);
    // if (this.post['title']) {
    // this.data = this.post
    // }
    // if (!this.post.title && this.$route.params.post) {
    //   console.warn('no post data found')
    //   // this.$store.commit("setSelectedPost", )
    // }
  },
  computed: {
    pageTo () {
      return this.$store.getters.getPageTo;
    },
    posName () {
      const posName = [
        'ttop',
        'top',
        'center',
        'bottom',
        'bbottom'
      ]
      return posName[this.position]
    },
  },
  watch: {
    pageTo (newVal, oldVal) {
      if (oldVal == 'post' && newVal != 'post') {
        this.showDetail = false;
        this.$store.commit('setSelectedPost', {});
      }
    },
    post (newVal) {
      // if (!this.active) {
      //   this.active = true;
      // }
    }
  },

}
</script>

<style lang="scss" scoped>
@keyframes intro {
  from {
    background: transparent;
    height: 9em;
    // opacity: 0;
  }
  50% {
    // border: 1px solid rgba(255, 255, 255, 0.7);
  }
  to {
    height: 80vh;
    border: 1px solid transparent;
    border-color: transparent;
    background: rgb(230, 230, 230);
    color: black;
    // opacity: 1;
  }
}
@keyframes intro-thumb {
  from {
    margin-top: -3em;
    margin-left: -7em;
  }

  to {
    margin-top: 0em;
    margin-left: 0em;
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

#general-post {
  position: absolute;
  top: 130vh;
  right: 0;
  color: white;
  min-width: 37em;
  height: 80vh;
  transition: all 1s, top 1.5s;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 2em;
  background-size: cover;
  background-blend-mode: hue;
  will-change: top;
  z-index: 400;

  &.detail {
    min-width: 65vw;
    max-width: 65vw;
    background: rgb(100, 100, 100);

    .thumb {
      width: 20vw;
      height: 25rem;
    }
  }

  &.ttop {
    min-width: 60vw;
    max-width: 60vw;
    top: 0vh;
    right: 2.5vw;
    background: rgb(100, 100, 100);
    color: black;
    opacity: 0;
    filter: blur(5px);
    animation: fade-in 1s normal 2s;
    animation-fill-mode: forwards;
  }
  &.top {
    min-width: 60vw;
    max-width: 60vw;
    top: 29vh;
    right: 2.5vw;
    background: rgb(100, 100, 100);
    color: black;
    filter: blur(5px);
  }
  &.bottom {
    min-width: 60vw;
    max-width: 60vw;
    top: 191vh;
    right: 2.5vw;
    background: rgb(100, 100, 100);
    color: black;
    filter: blur(5px);
  }
  &.bbottom {
    min-width: 60vw;
    max-width: 60vw;
    top: 250vh;
    right: 2.5vw;
    background: rgb(100, 100, 100);
    color: black;
    opacity: 0;
    filter: blur(5px);
    animation: fade-in 1s normal 1s;
    animation-fill-mode: forwards;
  }

  &.center {
    top: 110vh;
    color: black;
    background: rgb(230, 230, 230);
    .thumb {
      img {
        opacity: 1;
      }
    }
    z-index: 450;
  }

  &.intro {
    opacity: 0;
  }
  &.intro.center {
    opacity: 1;
    animation-name: intro;
    animation-duration: 0.5s;
    animation-timing-function: ease-in;
    animation-delay: 3s;
    animation-fill-mode: forwards;
  }

  h4 {
    margin-top: 1.5rem;
    font-size: 1.4rem;
  }
  h2 {
    display: inline;
    font-size: 2.2rem;
    font-weight: 600;
    text-overflow: ellipsis;
  }
  .thumb {
    margin-top: 0em;
    margin-left: 0em;
    width: 9em;
    height: 9em;
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 2em;
    transition: margin 2s, width 1s, height 1s;
    overflow: hidden;
    // &:before {
    //   display: block;
    //   position: absolute;
    //   content: "";
    //   width: 8em;
    //   height: 8em;
    //   backdrop-filter: grey(0.5);
    //   border-radius: 2em;
    //   background: linear-gradient(
    //     60deg,
    //     rgba(255, 255, 255, 0),
    //     rgba(255, 255, 255, 0.5)
    //   );
    // }
    img {
      width: 100%;
      height: 100%;
      opacity: 0.5;
      transition: opacity 1s;
      object-fit: cover;
    }
  }
}
</style>
