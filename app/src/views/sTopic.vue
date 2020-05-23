<template>
  <v-container id="contents-box" class="pt-0">
    <v-row>
      <v-col cols="10" class="nav-topic-box">
        <v-btn text class="pr-0" @click="routeTo('/')">
          Topics
          <v-icon class="ml-2">mdi-arrow-up</v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="10" class="title-box">
        <h2>Inspired by</h2>
        <h1 :class="{'minimize': pageTo == 'post'}">{{topic}}</h1>
      </v-col>
    </v-row>

    <v-row class="event-row my-0">
      <v-col cols="3" />
      <v-col cols="7" class="event-box">
        <h4>See Projects about {{topic}}</h4>
      </v-col>
      <v-col cols="2" />
    </v-row>

    <v-row class="pa-0">
      <v-col cols="10" />
      <v-col cols="1" class="pa-0">
        <canvas id="curved1" width="100" height="200" ref="curved1"></canvas>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="5" />
      <v-col cols="6" class="article-box">
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
      <v-col cols="10" />
      <v-col cols="1" class="pa-0">
        <canvas id="curved2" width="100" height="200" ref="curved2"></canvas>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="10" class="blank-box" />
    </v-row>

    <v-row class="pa-0" v-show="showMorePosts">
      <v-col cols="9" />
      <v-col cols="1" class="pa-0">
        <canvas id="curved3" width="100" height="200" ref="curved3"></canvas>
      </v-col>
      <v-col id="posts-box" ref="posts-box" cols="9" class="blank-box" />
      <v-col cols="9">
        <v-row></v-row>
        <v-row>
          <v-col cols="12">
            <v-btn text @click="hidePosts()">
              Go back
              <v-icon class="ml-2">mdi-arrow-up</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="1" class="pa-0">
        <canvas id="curved4" width="100" height="200" ref="curved4"></canvas>
      </v-col>
    </v-row>

    <v-row class="article-box"></v-row>

    <v-row class="copyright-box align-center mb-3">
      <v-card flat class="ma-0 pa-0">
        <v-card-text class="px-3 py-1">2020 ⓒ KJHRicky</v-card-text>
      </v-card>
    </v-row>
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
        console.warn("topic: ", this.$store.getters.getTopic)
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
    showMorePosts: false
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
  },
  mounted () {
    this.drawCurve({
      'curved1': [0, 0, 0, 0.25, 0.5, 0.5, 1, 0.75, 1, 1],
      'curved2': [1, 0, 1, 0.25, 0.5, 0.5, 0, 0.75, 0, 1],
      'curved3': [1, 0, 1, 0.25, 0.5, 0.5, 0, 0.75, 0, 1],
      'curved4': [0, 0, 0, 0.25, 0.5, 0.5, 1, 0.75, 1, 1],
    });
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
      this.showMorePosts = true;
      setTimeout(() => {
        this.$scrollTo(document.getElementById("posts-box"), 1000, {
          smooth: true,
          offset: 100
        });
      }, 100);
    },
    hidePosts () {
      this.showMorePosts = false;
      setTimeout(() => {
        this.$scrollTo(document.getElementById("contents-box"), 1000, {
          smooth: true,
          offset: 100
        });
      }, 100);
    },
    routeTo (path) {
      this.$router.push({ path: path });
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
    animation: title-box-shrinking 10s;
    animation-delay: 3s;
    animation-fill-mode: forwards;
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
    .event-box {
      text-align: right;
      margin-bottom: -2em;
      h2 {
        position: relative;
        top: 1em;
      }
    }
  }

  .article-box {
    text-align: right;
    border-right: 2px solid rgba(255, 255, 255, 0.2);
  }

  .blank-box {
    height: 20em;
    border-right: 2px solid rgba(255, 255, 255, 0.2);
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
#skeleton-loader {
  position: relative;
}
</style>
