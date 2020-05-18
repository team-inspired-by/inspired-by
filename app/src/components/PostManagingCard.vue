<template>
  <v-row class="post-card mx-0" :class="{ active: active }">
    <v-col class="sub-col" cols="12" sm="4">
      <div class="image-box">
        <img v-if="post['thumbnail']" :src="post.thumbnail.thumb || ''" />
      </div>
    </v-col>
    <v-col class="d-flex flex-column pb-0">
      <div class="post-header flex-grow-0 mt-5 ml-3">
        <h2>
          <span class="mr-5">{{ type }}</span>
          {{ post["title"].replace(/\-/gi, " ") }}
        </h2>
      </div>

      <v-divider></v-divider>
      <p class="post-author">
        <v-avatar class="mr-2 ml-3" size="1rem" color="white">
          <v-icon light>mdi-account-circle</v-icon>
        </v-avatar>
        Kim Jihyeong, {{ createdDate }}
      </p>

      <transition name="item-fade" mode="out-in" appear>
        <v-card-text
          v-if="!active"
          class="post-summary flex-grow-1 ml-3 pl-0"
          :class="{ xs: isXs }"
        >{{ post["summary"] }}</v-card-text>
        <v-card-text v-if="active" class="post-summary flex-grow-1 ml-3 pl-0">
          <v-row class="text-center">
            <v-col cols="4">
              <span class="number">130</span> views
            </v-col>
            <v-col cols="4">
              <span class="number">13</span> likes
            </v-col>
            <v-col cols="4">
              <span class="number">24</span> shares
            </v-col>
          </v-row>
          <v-row no-gutters>
            <v-col cols="4">Published in:</v-col>
            <v-col cols="8"></v-col>
            <v-col cols="4">Expired in:</v-col>
            <v-col cols="8"></v-col>
          </v-row>
        </v-card-text>
      </transition>

      <v-divider></v-divider>

      <v-row class="post-buttons flex-grow-0 text-right">
        <v-col v-if="!active" cols="12" class="py-0">
          <v-btn text color="white" class="py-5" height="auto" @click="edit()">EDIT CONTENT</v-btn>
          <v-btn text color="primary" class="py-5" height="auto" @click="seeDetail(true)">SEE DETAIL</v-btn>
        </v-col>
        <v-col v-if="active" cols="12" class="py-0">
          <v-tooltip top color="red darken-4">
            <template v-slot:activator="{ on }">
              <v-btn text class="longpress-button" color="white" height="100%" v-on="on" dense>
                <longpress
                  duration="3"
                  pressing-text="{$rcounter} SECS..."
                  action-text="REMOVING..."
                  :on-confirm="remove"
                >REMOVE</longpress>
              </v-btn>
            </template>
            <span>Hold 3 Seconds to remove!</span>
          </v-tooltip>
          <v-btn text color="white" class="py-5" height="auto" @click="edit()">EDIT CONTENT</v-btn>
          <v-btn
            text
            color="primary"
            class="py-5"
            height="auto"
            @click="seeDetail(false)"
          >HIDE DETAIL</v-btn>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import gql from "graphql-tag";
import { getGeneralPost, getPostLists } from "../queries/queryContents";
import { removeGeneralPost } from "../queries/mutateContents";

export default {
  name: "custom-post-managing-card",
  props: {
    data: Object,
    postType: String,
  },
  data: () => ({
    post: {
      title: "Hello",
    },
    key: "",
    topContents: "",
    bottomContents: "",
    isLoading: true,
    active: false,
    debouncedScroller: null,
    isScrollEventRunning: false,
    hasAddedContentsQuery: false,
    scrollAtPost: 0,
    comments: [],
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
        series: "",
      };
    } else {
      this.post = this.data;
    }

    this.type = this.postType || "post";
    this.key = this.post["title"]
      .replace(/\./gi, "")
      .replace(/[ ]/gi, "-")
      .toLowerCase();
  },
  methods: {
    seeDetail (val) {
      this.active = val;
    },
    edit () {
      console.log("edit executed");
      this.$store.commit("pushEditRequest", this.post);
    },
    remove () {
      // TODO: fix button gap between longpress and v-btn
      console.debug("post: ", this.post);
      this.$apollo
        .mutate({
          client: "inspiredBy",
          mutation: removeGeneralPost,
          variables: {
            title: this.post.title,
          },
          context: {
            headers: {
              authorization: "Bearer " + this.userInfo.accessToken,
            },
          },
        })
        .then((res) => {
          console.debug("removeGeneralPost(): ");
          console.debug(res);
        });
    },
  },
  computed: {
    createdDate () {
      if (!this.data || !this.data.createdAt) return "";
      else return "Posted at " + new Date(this.data.createdAt).toDateString();
    },
    isXs () {
      return this.$vuetify.breakpoint.xs;
    },
    userInfo () {
      return this.$store.getters.getUserInfo;
    },
  },
};
</script>

<style lang="scss" scoped>
.post-card {
  background: transparent;
  border-top: 1px solid rgba(255, 255, 255, 0.42);
  height: 100%;
  padding: 0;
  font-size: initial;
  transition: color 0.5s, background-color 0.5s, min-height 1s, padding 1s;
  will-change: color, background-color, padding;

  &:last-child {
    border-bottom: 1px solid rgba(255, 255, 255, 0.42);
  }

  .image-box {
    overflow: hidden;
    width: 100%;
    height: 14em;
    border-radius: 1em;
    transition: height 1s;
    background: #00000038;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
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

  .post-summary {
    &.xs {
      max-height: 12.5em;
      overflow-y: hidden;
      text-overflow: ellipsis;
    }
    .number {
      font-size: 2em;
    }
  }

  &.active {
    z-index: 10;
    .image-box {
      height: 18em;
    }
  }
}
</style>
