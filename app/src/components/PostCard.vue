<template>
  <v-row class="mb-5 mx-0">
    <v-col v-if="type == 'book'" cols="12" sm="4">
      <div class="image-box text-center">
        <img class="git-cat-outlined" src="../assets/git_cat.png" />
      </div>
    </v-col>
    <v-col cols="12" :sm="(type == 'post') ? 12 : 8" class="pa-0">
      <v-card class="post-card" :class="{ active: active || isOpened }" :id="'card-' + key">
        <v-row class="mx-0">
          <v-col class="sub-col" cols="12" sm="4" v-if="type == 'post'">
            <div class="image-box">
              <img src="https://picsum.photos/200/300?grayscale" />
            </div>
            <!-- <video
                      width="100%"
                      src="../assets/result.mp4"
                      controls
                      autoplay
                      loop
            ></video>-->
          </v-col>
          <v-col class="d-flex flex-column pb-0">
            <div class="post-header flex-grow-0 mt-5 ml-3" :class="{'ml-5': type != 'post'}">
              <span class="mr-5">{{ type }}</span>
              <h2>{{ post['title'] }}</h2>
            </div>

            <v-divider></v-divider>
            <v-card-text
              class="flex-grow-1 ml-3 pl-0"
              :class="{'ml-5': type != 'post'}"
            >{{ post.summary }}</v-card-text>
            <v-divider></v-divider>

            <v-row class="post-buttons flex-grow-0 text-right">
              <v-col cols="12" class="py-0">
                <v-btn
                  v-if="type == 'book'"
                  text
                  class="py-5"
                  height="auto"
                  v-scroll-to="'#card-' + key"
                  @click="openPost()"
                >BUY THIS BOOK</v-btn>
                <v-btn
                  v-if="type != 'git'"
                  text
                  class="py-5"
                  height="auto"
                  v-scroll-to="'#card-' + key"
                  @click="openPost()"
                >SCRAP POST</v-btn>
                <v-btn
                  text
                  color="primary"
                  class="py-5"
                  height="auto"
                  v-scroll-to="'#card-' + key"
                  @click="openPost()"
                >SEE DETAIL</v-btn>
              </v-col>
            </v-row>

            <p class="post-author">
              <v-avatar class="mr-2" size="1rem" color="white">
                <v-icon light>mdi-account-circle</v-icon>
              </v-avatar>Kim Jihyeong, Posted in Feb 22, 2019.
            </p>

            <v-skeleton-loader
              v-if="active || isOpened"
              :loading="isLoading"
              height="11em"
              type="heading, paragraph@2"
              light
            >
              <vue-markdown class="mt-5">{{topContents}}</vue-markdown>
            </v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-if="active || isOpened" class="post-contents">
          <v-col cols="12" sm="8">
            <v-skeleton-loader
              class="mt-2"
              :loading="isLoading"
              height="20em"
              type="paragraph, heading, paragraph@3"
              light
            >
              <vue-markdown>{{post.contents}}</vue-markdown>
            </v-skeleton-loader>
          </v-col>
          <v-col class="sub-col right d-flex-column" cols="12" sm="4">
            <div class="image-box flex-grow-1"></div>
            <div class="extra-info flex-grow-1 d-flex-column">
              <div class="flex-grow-1"></div>
            </div>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col v-if="type == 'git'" cols="12" sm="4">
      <div class="image-box text-center">
        <img class="git-cat" src="../assets/git_cat_2.png" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import * as easings from "vuetify/es5/services/goto/easing-patterns";
import debounce from "lodash/debounce";

export default {
  name: "custom-post-card",
  props: {
    data: Object,
    postType: String,
  },
  data: () => ({
    post: {
      'title': 'Hello'
    },
    key: '',
    isLoading: true,
    active: false,
    debouncedScroller: null,
    isScrollEventRunning: false,
    scrollAtPost: 0
  }),
  created () {
    if (!this.data) {
      this.post = {
        title: "Lorem ipsum dolor sit amet.",
        category: "post",
        summary: `Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Enim reiciendis recusandae eaque, facere nesciunt quibusdam
          suscipit ipsam nisi sequi explicabo ducimus itaque, illo
          harum cumque repellat inventore aperiam unde incidunt!`,
        coverImg: "",
        series: ""
      };
    } else {
      this.post = this.data;
    }


    this.type = this.postType || 'post';
    this.key = this.post["title"]
      .replace(/\./gi, "")
      .replace(/[ ]/gi, "-")
      .toLowerCase();
    console.log('this.data:');
    console.log(this.post, this.key);

  },
  methods: {
    openPost () {
      switch (this.type) {
        case 'git':
          this.$router.push({ path: "/project/inspired-by/" })
          break;
        case 'post':
          this.$store.commit("openPost", this.post);
          this.active = true;
          this.$router.push({ name: "post", params: { post: this.key } });

          setTimeout(() => {
            this.active = false;
          }, 1000);

          setTimeout(() => {
            this.loadContents();
          }, 2000);
          break;

        default:
          break;
      }

      // if (this.isOpened) {
      // setTimeout(() => {
      //   // this.scrollAtPost = window.scrollY;
      //   // console.log("scrollY: ", this.scrollAtPost);
      //   // this.debouncedScroller = debounce(this.handleScroll, 30);
      //   // window.addEventListener("scroll", this.debouncedScroller);
      //   this.active = false;
      // }, 1500);


      // this.$store.commit("loadPost", this.post['key']);
      // this.$router.push({ name: 'postpage', params: { post: 'testpage' } });
      // } else {
      // window.removeEventListener("scroll", this.debouncedScroller);
      // this.debouncedScroller = null;
      // this.$router.back();
      // }
    },
    loadContents () {
      setTimeout(() => {
        if (this.$store.getters.getSamplePost)
          this.post = this.$store.getters.getSamplePost
        console.log(`post received:`);
        console.log(this.post)
        this.isLoading = false
      }, 2000);
    },
    handleScroll (e) {
      if (this.isScrollEventRunning) return;
      this.isScrollEventRunning = true;

      setTimeout(() => {
        if (Math.abs(window.scrollY - this.scrollAtPost) > 0) {
          console.log(this.scrollAtPost);
          window.scrollTo({
            top: this.scrollAtPost,
            left: 0,
            behavior: "smooth"
          });
        }
      }, 500);

      setTimeout(() => {
        this.isScrollEventRunning = false;
      }, 1000);
    }
  },
  computed: {
    isOpened () {
      return this.$store.getters.getIsPostOpened;
    },
    topContents () {
      if (!this.post['contents']) return ''
      var str = '';
      var contents = this.post['contents'].split('\n');
      for (let i in [1, 2, 3, 4, 5]) {
        str += contents[i] + '\n';
      }
      return str
    }
  }
};
</script>

<style lang="scss" scoped>
.git-cat {
  height: 14em;
  margin: 1em -2em -1em 2em;
}
.git-cat-outlined {
  height: 14em;
  opacity: 0.12;
}
.post-card {
  // margin-top: 100px;
  // background-color: rgb(200, 200, 200);
  background: rgba(255, 255, 255, 0.12);
  border: 2px solid transparent;
  // border: 2px solid rgba(255, 255, 255, 0.22);
  border-radius: 1em !important;
  height: 100%;
  max-height: 80vh;
  padding: 0;
  // color: black;
  // z-index: 20;
  font-size: initial;
  transition: color 0.5s, background-color 0.5s, min-height 1s, padding 1s;

  & > .row {
    height: 100%;
    // NOTE: shoud check in scoped
    // .v-subheader,
    // .v-card__text {
    //   transition: font-size 0.5s;
    //   transition-delay: 1s;
    //   overflow: hidden;
    // }

    .image-box {
      width: 100%;
      border-radius: 1em;
      height: 25em;
      background: rgba(0, 0, 0, 0.12);
    }

    .sub-col {
      .image-box {
        height: 14em;
        transition: height 1s;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    .post-header {
      font-size: smaller;
      span {
        vertical-align: text-bottom;
      }
      * {
        display: inline-block;
      }
    }

    .post-author {
      display: block;
      line-height: 0%;
      margin: 0;
      height: 0;
      overflow: hidden;
      color: rgb(80, 80, 80);
      opacity: 0;
      transition: opacity 1s;
      transition-delay: 2s;
    }
  }

  &.active {
    padding: 2em;
    background-color: rgb(200, 200, 200);
    color: black;
    min-height: 80vh;
    max-height: 80vh;
    z-index: 10;
    overflow-y: auto;
    overflow-x: hidden;

    .row {
      height: unset;
      .sub-col {
        flex: 0 0 40%;
        margin: 0 1em 0 -3em;
        max-width: 40%;
        .image-box {
          height: 25em;
        }
        .extra-info {
          height: 100%;
          & > div {
            border-left: 2px solid rgba(0, 0, 0, 0.12);
            margin: 1em 0;
            height: 100%;
          }
        }
      }

      .sub-col.right {
        // margin: 0;
        margin: 0 -4em 0 0em;
      }

      .sub-col:first-child {
        .image-box {
          border-top-right-radius: 0;
          margin-top: -3em;
        }
      }

      .post-header {
        font-size: x-large;
        span {
          display: block;
        }
      }
      .v-divider {
        border-color: rgba(0, 0, 0, 0.12);
      }

      .v-card__text {
        display: none;
      }
      .post-buttons {
        display: none;
        color: black;
      }

      .post-author {
        line-height: 300%;
        opacity: 1;
        height: inherit;
        .v-avatar {
          width: 1.25em !important;
        }
      }
    }
  }
}
</style>

<style lang="scss">
.v-skeleton-loader__heading {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>