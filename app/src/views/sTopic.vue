<template>
  <v-container id="contents-box" class="pt-0">
    <div
      id="topic-contents-column"
      :class="{'post-mode': pageTo != 'topic' || modeMorePosts, 'more-post-mode': modeMorePosts}"
    >
      <v-row>
        <v-col cols="8" class="nav-topic-box">
          <v-btn text class="mt-5 pr-2 mr-0" @click="routeTo('/')">
            Topics
            <v-icon class="ml-2">mdi-arrow-up</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8" class="title-box" :class="{'animation': titleAnimation}">
          <h2>Inspired by</h2>
          <h1 :class="{'minimize': pageTo == 'post'}">{{topic}}</h1>
        </v-col>
      </v-row>

      <v-row class="event-row my-0" no gutters>
        <v-col cols="2" />
        <v-col cols="6" class="event-box">
          <v-btn text @click="routeTo('/stopic/' + topic)">
            <v-icon>mdi-arrow-left</v-icon>
            <h3>오늘의 커버 이미지 보기</h3>
          </v-btn>
        </v-col>
        <v-col cols="4" />
        <v-col cols="2" />
        <v-col cols="6" class="event-box">
          <h4>See Projects about {{topic}}</h4>
        </v-col>
        <v-col cols="4" />
      </v-row>

      <v-row class="pa-0">
        <v-col cols="8" />
        <v-col cols="1" class="pa-0">
          <canvas id="curved1" width="100" height="200" ref="curved1"></canvas>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2" />
        <v-col cols="7" class="article-box pr-0">
          <custom-post-article :data="val" :key="key" v-for="(val, key) in posts.slice(0, 3)" />
          <v-row>
            <v-col cols="12">
              <v-btn text @click="seePosts()">
                See more posts
                <v-icon class="ml-2">mdi-arrow-down</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="8" />
        <v-col cols="1" class="pa-0">
          <canvas id="curved2" width="100" height="200" ref="curved2"></canvas>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="8" class="blank-box" />
      </v-row>

      <v-row id="more-posts-box" class="pa-0 text-right">
        <v-col cols="7" />
        <v-col cols="1" class="pa-0">
          <canvas id="curved3" width="100" height="200" ref="curved3"></canvas>
        </v-col>
        <v-col cols="4" />
        <v-col cols="7" />
        <v-col cols="4" class="with-border text-left">
          <v-btn text @click="routeTo('/')" color="grey">
            <v-icon class="mr-2">mdi-arrow-up</v-icon>Other topics
          </v-btn>
          <v-btn text @click="hidePosts()">
            <v-icon class="mr-2">mdi-arrow-up</v-icon>Go back
          </v-btn>
        </v-col>
        <v-col cols="7" />
        <v-col cols="4" id="more-posts" class="with-border text-left pl-0">
          <custom-post-article :data="val" :key="key" v-for="(val, key) in posts" detail left />
          <custom-post-article :data="sampleProjectPost" :key="1111" detail left />
        </v-col>
        <v-col cols="7" />
        <v-col cols="4" class="with-border text-left pl-0">
          <v-btn
            v-if="isLoggedIn"
            @click="toggleModeAddPost()"
            outlined
            :color="modeAddPost ? 'white' : 'rgba(255,255,255,0.22)'"
          >
            <v-icon class="mr-2">mdi-post-outline</v-icon>Add a post
          </v-btn>
          <v-btn
            v-else
            @click="$store.commit('setPopupLogin', true)"
            outlined
            :color="modeAddPost ? 'white' : 'rgba(255,255,255,0.22)'"
          >
            <v-icon class="mr-2">mdi-account-circle-outline</v-icon>Login
          </v-btn>
        </v-col>
        <v-col cols="7"></v-col>
        <v-col cols="1" class="pa-0">
          <canvas id="curved4" width="100" height="200" ref="curved4"></canvas>
        </v-col>
      </v-row>

      <v-row class="copyright-box text-center mb-3" no-gutters>
        <v-col cols="1" />
        <v-col cols="3">
          <v-card flat class="ma-0 pa-0">
            <v-card-text class="px-3 py-1">2020 ⓒ KJHRicky</v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <custom-post-loader v-model="modeAddPost" :dense="!modeMorePosts" :hide="leaveToHome" />
  </v-container>
</template>

<script>
import { getTopic } from "../queries/queryContents";
export default {
  name: "Topic",
  apollo: {
    topic: {
      client: "inspiredBy",
      query () {
        return getTopic;
      },
      variables () {
        return {
          name: this.$store.getters.getTopic
        }
      },
      update: data => {
        console.debug("getTopic: ", data);
        if (data["getTopic"] && data.getTopic.success)
          return data.getTopic.topic;
      }
    },
  },
  data: () => ({
    modeMorePosts: false,
    modeAddPost: false,
    // modePost: false,
    titleAnimation: true,
    isScrolling: false,
    leaveToHome: false,
    sampleProjectPost: {
      title: "Sample git project",
      postType: "GIT",
      summary: "Sample post",
      coverImg: "",
      series: "",
      thumbnail: {
        regular: ""
      }
    },
  }),
  computed: {
    topic () {
      return this.$store.getters.getTopic;
    },
    pageTo () {
      return this.$store.getters.getPageTo;
    },
    posts () {
      if (!this.$apolloData.data["topic"]) return [];
      return this.$apolloData.data.topic.posts;
    },
    selectedPost () {
      return this.$store.getters.getSelectedPost;
    },
    isLoggedIn () {
      return this.$store.getters.getIsLoggedIn;
    }
  },
  watch: {
    selectedPost () {
      this.modeAddPost = false;
    },
    // modeMorePosts (newVal, oldVal) {
    //   if (!newVal && oldVal) {
    //     setTimeout(() => {
    //       window.addEventListener("scroll", this.handleScroll);
    //     }, 1000);
    //   } else if (newVal) {
    //     window.removeEventListener("scroll", this.handleScroll);
    //   }
    // }
  },
  mounted () {
    this.drawCurve({
      'curved1': [0, 0, 0, 0.25, 0.5, 0.5, 1, 0.75, 1, 1],
      'curved2': [1, 0, 1, 0.25, 0.5, 0.5, 0, 0.75, 0, 1],
      'curved3': [1, 0, 1, 0.25, 0.5, 0.5, 0, 0.75, 0, 1],
      'curved4': [0, 0, 0, 0.25, 0.5, 0.5, 1, 0.75, 1, 1],
    });
    setTimeout(() => {
      window.addEventListener("scroll", this.handleScroll);
    }, 1000);
  },
  beforeDestroy () {
    // window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    drawCurve (drawer) {
      function w (val) {
        return canvas.width * val;
      }
      function h (val) {
        return canvas.height * val;
      }

      let canvas, ctx, arr
      for (let i in drawer) {
        canvas = this.$refs[i];
        ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        console.debug(`canvas size: ${canvas.width} / ${canvas.height}`);
        ctx.lineWidth = 2 * canvas.height / canvas.width;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.22)";
        ctx.beginPath();
        arr = drawer[i]
        ctx.moveTo(w(arr.shift()), h(arr.shift()));
        while (arr.length) {
          ctx.quadraticCurveTo(w(arr.shift()), h(arr.shift()), w(arr[0]), h(arr[1]));
          ctx.moveTo(w(arr.shift()), h(arr.shift()));
        }
        ctx.stroke();
      }
    },
    seePosts () {
      if (this.isScrolling) return;
      this.modeMorePosts = true;
      this.titleAnimation = false;
      this.isScrolling = true;
      // document.getElementsByTagName("html")[0].style.overflowY = "hidden";
      console.log("selectedPost: ", this.selectedPost)
      if (!this.selectedPost) this.$store.commit("setSelectedPost", { post: this.posts[0], key: 0 });
      this.$scrollTo(document.getElementById("more-posts-box"), 1000, {
        smooth: true,
        offset: 100,
      });
      // if (this.$route.name != "post")
      //   this.$router.push({ name: "post", params: { post: this.posts[0]['title'] } });
      setTimeout(() => {
        this.isScrolling = false;
      }, 1500);
    },
    hidePosts () {
      if (this.isScrolling) return;
      this.modeMorePosts = false;
      this.modeAddPost = false;
      this.isScrolling = true;
      this.$scrollTo(document.getElementById("contents-box"), 1000, {
        smooth: true,
      });
      setTimeout(() => {
        this.isScrolling = false;
        // document.getElementsByTagName("html")[0].style.overflowY = "auto";
      }, 1500);
    },
    toggleModeAddPost () {
      this.modeAddPost = !this.modeAddPost;
    },
    routeTo (path) {
      if (path === '/') {
        this.leaveToHome = true;
      }
      this.$router.push({ path: path });
    },
    handleScroll (e) {
      console.warn('doing handleScroll()', this.isScrolling);

      if (this.isScrolling) return;
      // console.log(window.top.scrollY);
      // this.isScrolling = true;

      const scrollY = window.top.scrollY;
      if (scrollY > 900) {
        // document.getElementsByTagName("html")[0].style.overflowY = "hidden";
        // window.removeEventListener("scroll", this.handleScroll);
        // this.modeMorePosts = true;
        if (!this.modeMorePosts)
          this.seePosts();
      }
      else {
        this.modeMorePosts = false;
      }
      // setTimeout(() => {
      //   this.isScrolling = false;
      // }, 1000);
    }
  }
};
</script>

<style lang="scss">
@keyframes title-box-shrinking {
  to {
    padding-top: 2em;
  }
}

#contents-box {
  #topic-contents-column {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: -200vh;
    margin-right: -10vw;
    will-change: right;
    width: 60vw;
    min-height: 300vh;
    overflow-x: visible;
    overflow-y: auto;
    transition: right 1s;
    z-index: 50;
    &:before {
      content: "";
      display: block;
      width: 67%;
      height: 200vh;
      border-right: 2px solid rgba(255, 255, 255, 0.2);
    }
    &.post-mode {
      right: 65vw;
    }
    &.more-post-mode {
      right: 80vw;
    }

    .nav-topic-box {
      border-right: 2px solid rgba(255, 255, 255, 0.2);
      text-align: right;
    }

    .title-box {
      text-align: right;
      font-weight: 600;
      padding-top: 200px;
      padding-right: 1em;
      border-right: 2px solid rgba(255, 255, 255, 0.2);
      transition: padding-top 5s;
      padding-top: 2em;
      &.animation {
        animation: title-box-shrinking 10s;
        animation-delay: 3s;
        animation-fill-mode: forwards;
      }
      h1 {
        font-family: "Finger Paint";
        font-size: 5em;
        transition: font-size 0.5s;
        will-change: font-size;
        overflow: auto;
        &.minimize {
          font-size: 3em;
        }
      }
      h2 {
        font-weight: 500;
      }
    }
    canvas {
      display: block;
      width: 100%;
    }

    .event-row {
      height: 0;
      text-align: right;
      margin-bottom: -2em;
      position: relative;
      top: 1em;
    }

    .article-box {
      text-align: right;
      border-right: 2px solid rgba(255, 255, 255, 0.2);
    }

    .blank-box {
      height: 20em;
      border-right: 2px solid rgba(255, 255, 255, 0.2);
      border-left: 2px solid rgba(255, 255, 255, 0.2);
    }

    #more-posts-box {
      .with-border {
        border-left: 2px solid rgba(255, 255, 255, 0.2);
      }
      #more-posts {
        min-height: calc(100vh - 15em);
        max-height: calc(100vh - 15em);
        overflow: auto;
      }
      .v-btn--outlined {
        margin-left: 1em;
        transition: color 0.5s;
        &:hover {
          color: #ddd !important;
        }
        &:before {
          position: absolute;
          display: block;
          content: "";
          margin-left: -1em;
          width: 1em;
          height: 50%;
          background: none;
          opacity: 1;
          border-bottom: 1px solid rgba(255, 255, 255, 0.22);
        }
      }
    }

    .copyright-box {
      display: flex;
      align-items: right;
      flex-direction: row-reverse;
      .v-card {
        background: transparent !important;
        border: 2px solid rgba(255, 255, 255, 0.22);
        border-radius: 1em 0 1em 1em;
      }
    }
  }
}
#skeleton-loader {
  position: relative;
}
</style>

<style lang="scss">
#post-loader {
  transition: all 1s;
}
#post-loader.leaveToHome {
  // transform: translateY(200vh);
  opacity: 0;
}
// NOTE: replaced from .v-btn--outlined
.v-btn--text,
.v-btn--outlined {
  border-radius: 2em;
}
</style>
