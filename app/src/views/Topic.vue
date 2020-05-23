<template>
  <v-container id="contents-box" class="pt-0">
    <custom-appbar id="app-bar" :topic="topic" />
    <custom-event />
    <custom-subheader title="Inspirations" indent />
    <v-row class="bubble-box overflow-hidden">
      <v-col id="category-box" cols="12" sm="4">
        <v-select :items="sortType" label="Bubbles sorted by" solo flat hide-details></v-select>
        <div class="timeline-box">
          <v-timeline dense>
            <v-timeline-item
              :key="key"
              :color="key % 2 == 0 ? 'teal darken-5' : 'teal lighten-3'"
              class="py-5"
              v-for="(category, key) in categories"
              small
            >
              <strong>{{ category }}</strong>
              <p>Lorem ipsum dolor sit amet.</p>
            </v-timeline-item>
          </v-timeline>
        </div>
      </v-col>
      <v-col id="bubble-contents-box" cols="12" sm="8" :class="{'xs': isXs}">
        <v-sheet class="overflow-y-auto text-center">
          <div class="bubble-effector" :ref="'bubble-effector'"></div>
          <v-card
            class="inspiration-card pa-0"
            :class="['ma-' + content.level]"
            :key="content.id"
            :style="{
                'max-width': content.level * 2 + 4 + 'em',
                'max-height': content.level * 2 + 4 + 'em'
              }"
            dark
            ripple
            v-for="content in contents"
            @click="content.minimized = !content.minimized"
          >
            <v-card-text
              class="keyword headline font-weight-bold px-0 py-5 my-5"
              :class="{ minimized: content.minimized }"
              :style="{
                  'line-height': content.level * 1.3 + 'em'
                }"
            >
              {{
              content.description.split(" ")[
              Math.floor(Math.random() * 20, 20)
              ]
              }}
            </v-card-text>

            <v-card-text class="headline font-weight-bold pa-0">{{ content.description }}</v-card-text>

            <v-card-actions>
              <v-list-item class="grow">
                <!-- <v-list-item-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
                </v-list-item-avatar>-->

                <v-list-item-content>
                  <v-list-item-title>2019-11-28</v-list-item-title>
                </v-list-item-content>

                <v-row align="center" justify="end">
                  <v-btn text color="primary">More</v-btn>
                </v-row>
              </v-list-item>
            </v-card-actions>
          </v-card>
        </v-sheet>
      </v-col>
    </v-row>
    <custom-subheader title="Recent Posts" indent reversed />
    <v-row class="issue-box pb-0">
      <v-col class="pa-0">
        <v-item-group :class="{'xs': isXs}">
          <custom-post-card :data="val" :key="key" v-for="(val, key) in posts" />
        </v-item-group>
        <v-item-group :class="{'xs': isXs}">
          <custom-post-card></custom-post-card>
          <custom-post-card postType="git"></custom-post-card>
          <custom-post-card postType="book"></custom-post-card>
          <custom-post-card></custom-post-card>
          <custom-post-card></custom-post-card>
          <custom-post-card postType="book"></custom-post-card>
          <custom-post-card postType="git"></custom-post-card>
          <custom-post-card postType="book"></custom-post-card>
          <v-card flat color="transparent" class="py-3 text-center">
            <v-btn
              text
              color="grey"
              :disabled="contentLoading"
              :loading="contentLoading"
              @click="loadMoreContents"
            >
              <v-icon left>mdi-refresh</v-icon>
              <h3>load more...</h3>
            </v-btn>
          </v-card>
        </v-item-group>
      </v-col>
    </v-row>
    <v-row class="copyright-box align-center mb-3">
      <v-card flat class="ma-0 pa-0">
        <v-card-text class="px-3 py-1">2020 ⓒ KJHRicky</v-card-text>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import gql from "graphql-tag";
import { getTopic } from "../queries/queryContents";
import * as easings from "vuetify/es5/services/goto/easing-patterns";
import debounce from "lodash/debounce";

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
    }
  },
  data: () => ({
    nextPageLoading: true,
    sortType: ["Keywords", "Views"],
    categories: [
      "2019-04-21",
      "2019-05-02",
      "2019-07-02",
      "2019-07-07",
      "2019-08-02",
      "2019-09-17"
    ],
    contentLoading: false,
    selectedPostRef: null,
    scrollAtPost: 0,
    debouncedScroller: null,
    isScrollEventRunning: false,
    contents: [
      {
        id: "1",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true,
        level: 2
      },
      {
        id: "2",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true,
        level: 5
      },
      {
        id: "3",
        title: "테스트",
        description:
          "'Turns out semicolon - less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true,
        level: 4
      },
      {
        id: "4",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true,
        level: 1
      },
      {
        id: "5",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true,
        level: 3
      },
      {
        id: "6",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true,
        level: 4
      },
      {
        id: "7",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true,
        level: 2
      },
      {
        id: "8",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true,
        level: 5
      },
      {
        id: "9",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true,
        level: 2
      }
    ]
  }),
  computed: {
    posts () {
      if (!this.$apolloData.data["topic"]) return {};
      return this.$apolloData.data.topic.posts;
    },
    topic () {
      return this.$store.getters.getTopic;
    },
    show () {
      return this.$store.getters.getShow;
    },
    sampleText () {
      console.log("client", this.clients);
      // if (this.client.viewer.properties[0].name != '') {
      //   return this.client.viewer.properties[0].name
      // }
      if (this.clients) return this.clients;
      return "";
    },
    isLoggedIn () {
      return this.$store.getters.getLoginStatus;
    },
    isXs () {
      return this.$vuetify.breakpoint.xs;
    }
  },
  mounted () {
    // setTimeout(() => {
    //   // console.log(this.$refs["bubble-effector"]);
    //   this.$refs["bubble-effector"].classList.toggle("decreasing");
    // }, 3000);
  },
  destroyed () {
    if (this.debouncedScroller) {
      window.removeEventListener("scroll", this.debouncedScroller);
    }
  },
  methods: {
    expandTopic () {
      this.expand = !this.expand;
    },
    // openPost (key = null) {
    //   // if (!this.isLoggedIn) {
    //   //   this.$store.commit("setPopupLogin", true);
    //   //   return;
    //   // }
    //   if (key) this.selectedPostRef = this.$refs["post-" + key][0];
    //   // console.log('clientWidth:', this.selectedPostRef.$el.clientWidth)

    //   this.selectedPostRef.$el.classList.toggle("active");
    //   this.isPostOpened = !this.isPostOpened;

    //   if (this.isPostOpened) {
    //     setTimeout(() => {
    //       this.scrollAtPost = window.scrollY;
    //       this.debouncedScroller = debounce(this.handleScroll, 30);
    //       window.addEventListener("scroll", this.debouncedScroller);
    //     }, 1000);
    //     this.$router.push({ name: "post", params: { post: "testing" } });
    //     // this.$router.push({ name: 'postpage', params: { post: 'testpage' } });
    //   } else {
    //     window.removeEventListener("scroll", this.debouncedScroller);
    //     this.debouncedScroller = null;
    //     this.$router.back();
    //   }
    // },
    // handleScroll (e) {
    //   if (this.isScrollEventRunning) return;
    //   this.isScrollEventRunning = true;

    //   setTimeout(() => {
    //     if (Math.abs(window.scrollY - this.scrollAtPost) > 0) {
    //       window.scrollTo({
    //         top: this.scrollAtPost,
    //         left: 0,
    //         behavior: "smooth"
    //       });
    //     }
    //   }, 500);

    //   setTimeout(() => {
    //     this.isScrollEventRunning = false;
    //   }, 1000);
    // },
    routeTo (path) {
      this.$router.push({ path: path });
    },
    loadMoreContents () {
      this.contentLoading = true;
    }
  }
};
</script>

<style lang="scss">
@keyframes bubbling {
  to {
    height: 0;
  }
}
.v-select-list {
  background: rgba(50, 50, 50, 1) !important;
  border-radius: 1em !important;

  .v-list {
    background: rgba(100, 100, 100, 0.22) !important;
    background-color: transparent !important;
    border: 2px solid rgba(255, 255, 255, 0.22) !important;
    border-radius: 1em !important;
  }
}
#contents-box {
  .serif {
    // font-family: "Times New Roman", Times, serif !important;
  }
  .custom-event {
    background: indigo;
  }
  .bubble-box {
    padding-top: 150px;
    padding-bottom: 0;
    margin-bottom: 0;
    overflow-x: hidden;
    #category-box {
      display: flex;
      flex-direction: column;
      padding-bottom: 0;
      max-height: 500px;
      overflow-x: hidden;
      .v-input {
        flex: none;
        .v-input__slot {
          background-color: rgba(100, 100, 100, 0.22);
          border: 2px solid rgba(255, 255, 255, 0.22);
          border-radius: 1em;
          padding: 0.5em 1em;
        }
      }
      .timeline-box {
        display: flex;
        flex-direction: column;
        flex: 1;
        // min-width: 30vw;
        overflow-y: auto;
        .v-timeline {
          flex: 1;
          &:before {
            background: rgba(255, 255, 255, 0.22);
          }
        }
        .v-timeline-item__dot {
          background: rgba(255, 255, 255, 0.22);
        }
      }
    }
    #bubble-contents-box {
      padding: 0;
      max-height: 500px;
      &.xs {
        margin-top: -4em;
        padding-left: 3.7em;
        & > .v-sheet {
          padding-left: 0.5em;
          border-left: 2px solid rgba(255, 255, 255, 0.22);
        }
      }
      .v-sheet {
        height: 100%;
        overflow: hidden !important;
        // overflow: auto;
        padding: 1em 0 1em 3em;
        background-color: transparent;
        // background-color: rgba(100, 100, 100, 0.4);
        .bubble-effector {
          width: 100%;
          height: 100%;
          // transition: height 5s ease-out;
          animation-name: bubbling;
          animation-duration: 5s;
          animation-delay: 0.5s;
          animation-fill-mode: forwards;
          animation-timing-function: ease-out;
          // &.decreasing {
          //   height: 0;
          // }
        }
        .inspiration-card {
          display: inline-block;
          overflow: hidden;
          transition: max-width 1s, max-height 1s, margin 1s, padding 1s,
            border-radius 0.5s;
          text-overflow: ellipsis;
          max-width: 20em;
          max-height: 20em;
          background: rgba(255, 255, 255, 0.22);
          // border: 2px solid rgba(255, 255, 255, 0.42);
          border-radius: 50% !important;
          align-self: center;
          &.minimized {
            text-align: center;
            max-width: 7em;
            max-height: 7em;
          }
          .keyword {
            overflow: hidden;
            transition: max-width 1s, max-height 1s, padding 1s;
            max-width: 0;
            max-height: 0;
            padding: 0;
            &.minimized {
              max-width: 20em;
              min-height: 7em;
              max-height: 7.5em;
              line-height: 5.5em;
              // padding-bottom: 7em;
            }
            &:not(.minimized) {
              margin: 0 !important;
              padding: 0 !important;
            }
          }
        }
      }
    }
  }
  .issue-box {
    .v-item-group {
      padding: 0 1.5em 1em 3.5em;
      &.xs {
        padding: 0 1em 0 1em;
      }
      border-right: 2px solid rgba(255, 255, 255, 0.22);
      // .v-card {
      //   // background-color: rgba(100, 100, 100, 0.5);
      //   min-height: 0;
      //   background-color: rgba(100, 100, 100, 0.3);
      //   font-size: initial;
      //   transition: color 0.5s, background-color 0.5s, min-height 1s,
      //     padding 1s;
      //   .v-subheader,
      //   .v-card__text {
      //     transition: font-size 0.5s;
      //     transition-delay: 1s;
      //     overflow: hidden;
      //   }
      //   img {
      //     object-fit: cover;
      //     max-height: 14em;
      //     transition: max-height 1s;
      //   }
      //   &.active {
      //     background-color: rgb(200, 200, 200);
      //     color: black;
      //     min-height: 80vh;
      //     max-height: 80vh;
      //     z-index: 10;
      //     overflow-y: auto;
      //     img {
      //       max-height: 30em;
      //     }
      //     .v-subheader {
      //       color: black;
      //       font-size: x-large;
      //     }
      //     .v-card__text {
      //       display: none;
      //       // padding-top: 0;
      //       // padding-bottom: 0;
      //       // height: 0;
      //       // font-size: larger;
      //     }
      //     .v-btn {
      //       display: none;
      //       color: black;
      //     }
      //   }
      // }
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
#skeleton-loader {
  position: relative;
}
</style>

<style lang="scss" scoped>
.edge.leftside {
  margin-left: 2.95em !important;
}
</style>
