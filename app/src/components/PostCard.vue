<template>
  <v-row class="post-card-component mb-5 mx-0">
    <v-col
      v-if="type == 'book'"
      :class="{ book: type == 'book', xs: isXs }"
      cols="12"
      sm="4"
    >
      <div class="image-box text-center">
        <img src="../assets/book_cover_eg.png" />
      </div>
    </v-col>
    <v-col cols="12" :sm="type == 'post' ? 12 : 8" class="pa-0">
      <v-card
        refs="card"
        class="post-card"
        :class="{ active: active }"
        :id="'card-' + key"
        ref="card"
      >
        <v-row class="mx-0">
          <v-col class="sub-col" cols="12" sm="4" v-if="type == 'post'">
            <div class="image-box">
              <img
                v-if="post['thumbnail']"
                :src="post['thumbnail']['regular']"
                alt="thumbnail"
              />
              <!-- <img src="https://picsum.photos/200/300?grayscale" /> -->
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
            <div
              class="post-header flex-grow-0 mt-5 ml-3"
              :class="{ 'ml-5': type != 'post' }"
            >
              <span class="mr-5">{{ type }}</span>
              <h2>{{ post["title"].replace(/\-/gi, " ") }}</h2>
            </div>

            <v-divider></v-divider>
            <v-card-text
              class="post-summary flex-grow-1 ml-3 pl-0"
              :class="{ 'ml-5': type != 'post', git: type == 'git', xs: isXs }"
              >{{ post["summary"] }}</v-card-text
            >
            <v-divider></v-divider>

            <v-row class="post-buttons flex-grow-0 text-right">
              <v-col cols="12" class="py-0">
                <v-btn text class="py-5" height="auto" disabled>
                  <v-icon class="mr-2">mdi-thumb-up</v-icon>
                  {{ post["numLikes"] }} LIKES
                </v-btn>
                <v-btn
                  v-if="type == 'book'"
                  text
                  class="py-5"
                  height="auto"
                  v-scroll-to="'#card-' + key"
                  @click="openPost()"
                  >BUY THIS BOOK</v-btn
                >
                <v-btn
                  v-if="type != 'git'"
                  text
                  class="py-5"
                  height="auto"
                  v-scroll-to="'#card-' + key"
                  @click="openPost()"
                  >SCRAP POST</v-btn
                >
                <v-btn
                  text
                  color="primary"
                  class="py-5"
                  height="auto"
                  v-scroll-to="'#card-' + key"
                  @click="openPost()"
                  >SEE DETAIL</v-btn
                >
              </v-col>
            </v-row>

            <p class="post-author">
              <v-avatar class="mr-2 ml-3" size="1rem" color="white">
                <v-icon light>mdi-account-circle</v-icon>
              </v-avatar>
              Kim Jihyeong, {{ createdDate }}
            </p>

            <v-skeleton-loader
              v-if="active"
              :loading="isLoading"
              height="11em"
              type="heading, paragraph@2"
              light
            >
              <vue-markdown class="mt-5 ml-3">{{ topContents }}</vue-markdown>
            </v-skeleton-loader>
          </v-col>
        </v-row>
        <v-row v-if="active" class="post-contents">
          <v-col cols="12" sm="8">
            <v-skeleton-loader
              class="mt-2"
              :loading="isLoading"
              height="20em"
              type="paragraph, heading, paragraph@3"
              light
            >
              <vue-markdown>{{ bottomContents }}</vue-markdown>
              <v-divider />
              <v-row>
                <v-col cols="3" class="text-center">
                  <v-avatar size="6rem" color="indigo">
                    <v-icon size="3em" dark>mdi-account-circle</v-icon>
                  </v-avatar>
                </v-col>
                <v-col cols="9">
                  <h4>Kim Jihyeong</h4>
                  <p>kjhricky@gmail.com</p>
                </v-col>
              </v-row>
              <v-divider />
            </v-skeleton-loader>
          </v-col>
          <v-col
            class="sub-col right d-flex-column fill-height"
            cols="12"
            sm="4"
          >
            <div class="image-box flex-grow-1"></div>
            <div class="extra-info flex-grow-1 d-flex-column">
              <div class="flex-grow-1"></div>
            </div>
          </v-col>
        </v-row>
        <v-row v-if="active" class="post-footer">
          <v-col cols="12" sm="8">
            <v-subheader light>
              <h2>Comments</h2>
            </v-subheader>
            <v-divider />
            <v-list-item
              :key="comment.id"
              v-for="(comment, key) in comments"
              :light="true"
              class="post-comment"
              :class="{ isRegistering: !comment.id, registered: comment.id }"
            >
              <template v-if="comment.isDeleted">
                <v-list-item-avatar>
                  <v-icon size="3em" color="grey" dark
                    >mdi-delete-circle-outline</v-icon
                  >
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    >This comment is deleted.</v-list-item-title
                  >
                  <v-list-item-subtitle>
                    <a @click="restoreComment(key)">Click here</a> to cancel
                  </v-list-item-subtitle>
                </v-list-item-content>
              </template>
              <template v-else>
                <v-list-item-avatar>
                  <v-img v-if="comment.avatar" src="comment.avatar"></v-img>
                  <v-icon size="3em" color="grey" dark
                    >mdi-account-circle</v-icon
                  >
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ comment.content }}</v-list-item-title>
                  <v-list-item-subtitle>
                    {{ comment.author.name }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action
                  v-if="comment.author.alias == userInfo.user.alias"
                >
                  <v-btn icon @click="deleteComment(key)">
                    <v-icon color="grey">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-list-item>

            <v-list-item v-if="isLoggedIn">
              <v-list-item-avatar>
                <v-img
                  src="https://cdn.vuetifyjs.com/images/lists/1.jpg"
                ></v-img>
              </v-list-item-avatar>
              <v-list-item-content class="pb-0">
                <v-form @submit="addComment">
                  <v-text-field
                    v-model="comment.content"
                    label="Add Comment"
                    color="black"
                    :light="true"
                  ></v-text-field>
                </v-form>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-else :light="true">
              <v-list-item-content>
                <p>
                  <v-btn class="mr-2" @click="login()" dark>Login</v-btn>to add
                  a comment.
                </p>
              </v-list-item-content>
            </v-list-item>
          </v-col>
          <v-col cols="12" sm="4">
            <h3>How about</h3>
            <li>How to deal with them?</li>
            <li>How to deal with them?</li>
            <li>How to deal with them?</li>
            <li>How to deal with them?</li>
            <li>How to deal with them?</li>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col
      v-if="type == 'git'"
      :class="{ git: type == 'git', xs: isXs }"
      cols="12"
      sm="4"
    >
      <div class="image-box text-center">
        <img src="../assets/git_cat_2.png" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
import debounce from "lodash/debounce";
import gql from "graphql-tag";
import {
  getGeneralPost,
  getPostLists,
  getImage,
} from "../queries/queryContents";
import { addComment } from "../queries/mutateContents";

export default {
  name: "custom-post-card",
  props: {
    data: Object,
    postType: String,
  },
  data() {
    const commentModel = Object.freeze({
      author: {},
      content: "",
      isReply: false,
      replyToCommentId: "",
    });
    //TODO: finish this
    const generalPostModel = Object.freeze({});
    return {
      _commentModel: commentModel,
      post: {
        title: "Hello",
      },
      comment: Object.assign({}, commentModel),
      key: "",
      topContents: "",
      bottomContents: "",
      isLoading: true,
      active: false,
      debouncedScroller: null,
      isScrollEventRunning: false,
      // hasAddedContentsQuery: false,
      scrollAtPost: 0,
      comments: [],
    };
  },
  created() {
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
    async openPost() {
      switch (this.type) {
        case "git":
          this.$router.push({ path: "/project/inspired-by/" });
          break;
        case "post":
          setTimeout(() => {
            this.$store.commit("openPost", this.post);
            this.active = true;
            this.$router.push({ name: "post", params: { post: this.key } });
          }, 500);

          this.$apollo
            .query({
              client: "inspiredBy",
              variables: {
                title: this.post.title,
              },
              query: getGeneralPost,
            })
            .then(async (res) => {
              const data = res.data.getGeneralPost;
              console.debug(
                "received getGeneralPost of ",
                this.post.title,
                data
              );
              if (!data) {
                console.error("Received nothing");
                return;
              }
              if (!data.success) {
                console.error(data.message);
                return;
              }
              for (let i in data["post"]) {
                this.post[i] = data["post"][i];
              }

              let contents = await this.parseContent(
                data.post.lastContent.content
              );
              contents = contents.split("\n");
              let topContents = "",
                bottomContents = "";
              for (let i in contents) {
                if (i in [1, 2, 3, 4, 5]) {
                  topContents += contents[i] + "\n";
                } else {
                  bottomContents += contents[i] + "\n";
                }
              }
              this.topContents = topContents;
              this.bottomContents = bottomContents;

              console.log("comments:");
              console.log(data.post.comments);
              this.comments = data.post.comments;

              // NOTE: settimeout for testing slow-network
              setTimeout(() => {
                this.isLoading = false;
              }, 1000);

              return data.post;
            });
          // if (!this.hasAddedContentsQuery) {
          // // TODO: change this smart query
          //   this.data.dynamic = this.$apollo.addSmartQuery("descriptions", {
          //     client: "inspiredBy",
          //     variables: {
          //       title: this.data.title
          //     },
          //     query () {
          //       return getGeneralPost;
          //     },
          //     update: (data => {
          //       console.debug("received getGeneralPost of ", this.data.title, data);
          //       if (!data["getGeneralPost"]) {
          //         console.error("Received nothing");
          //         return;
          //       }
          //       const res = data.getGeneralPost;
          //       if (!res.success) {
          //         console.error(res.message);
          //         return;
          //       }
          //       for (let i in res["post"]) {
          //         this.data[i] = res["post"][i];
          //       }

          //       const contents = res.post.lastContent.content.split("\n");
          //       let topContents = "",
          //         bottomContents = "";
          //       for (let i in contents) {
          //         if (i in [1, 2, 3, 4, 5]) {
          //           topContents += contents[i] + "\n";
          //         } else {
          //           bottomContents += contents[i] + "\n";
          //         }
          //       }
          //       this.topContents = topContents;
          //       this.bottomContents = bottomContents;

          //       console.log("comments:");
          //       console.log(res.post.comments);
          //       this.comments = res.post.comments;

          //       // NOTE: settimeout for testing slow-network
          //       setTimeout(() => {
          //         this.isLoading = false;
          //       }, 1000);

          //       return res.post;
          //     }).bind(this)
          //   });
          //   this.hasAddedContentsQuery = true;
          // }
          // setTimeout(() => {
          //   this.active = false;
          // }, 1000);

          // setTimeout(() => {
          //   this.loadContents();
          // }, 2000);
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
    async parseContent(content) {
      // NOTE: This code modified from AdminPost
      const contents = content.split("![insp-img");
      console.debug("on parseContent(): ", contents);
      let retContent = "";
      for (let i in contents) {
        let temp1 = contents[i].split(")");
        if (temp1[0].startsWith("](")) {
          console.debug("image: ", temp1[0].slice(2));
          const res = await this.$apollo.query({
            query: getImage,
            variables: {
              id: temp1[0].slice(2),
            },
          });
          console.debug("res: ", res);
          if (res.data.getImage.success) {
            retContent +=
              "![image: " +
              res.data.getImage.file.alias +
              "](from attached)" +
              temp1.slice(1).join(")");
          } else {
            retContent += "![Unknown Image](" + temp1[0].slice(2) + ")";
          }
        } else if (temp1[0].startsWith("-side](")) {
          console.debug("side image: ", temp1[0].slice(7));
          const res = await this.$apollo.query({
            client: "inspiredBy",
            query: getImage,
            variables: {
              id: temp1[0].slice(7),
            },
          });
          console.debug("res: ", res);
          if (res.data.getImage.success) {
            retContent +=
              "![image: " +
              res.data.getImage.file.alias +
              ", side](from attached)" +
              temp1.slice(1).join(")");
          } else {
            retContent += "![Unknown Image, side](" + temp1[0].slice(7) + ")";
          }
        } else {
          retContent += temp1.join(")");
        }
      }
      return retContent;
    },
    addComment(e) {
      const dataComment = {
        linkedPostTitle: this.post.title,
        content: this.comment.content,
        isReply: this.comment.isReply,
        replyToCommentId: this.comment.replyToCommentId,
      };
      console.warn("hadn't finished addComment()", dataComment, this.userInfo);

      this.$apollo
        .mutate({
          client: "inspiredBy",
          mutation: addComment,
          variables: dataComment,
          context: {
            headers: {
              authorization: "Bearer " + this.userInfo.accessToken,
            },
          },
        })
        .then((res) => {
          const content = res.data.addComment.content;
          console.debug("res received: ", res, content, this);
          console.log("comments: ", this.comments);
          const comment = this.comments.filter(
            (key) => key.content == content
          )[0];
          comment.id = res.data.addComment.commentId;
          this.comments.pop();
          this.comments.push(comment);
          console.log("comments: ", this.comments);
        });

      this.comments.push({
        author: {
          alias: this.userInfo.user.alias,
          email: this.userInfo.user.email,
          name: this.userInfo.user.name,
        },
        content: this.comment.content,
        isReply: this.comment.isReply,
        replyToCommentId: this.comment.replyToCommentId,
      });

      this.comment = { hello: "hi" };
      console.warn("comment: ", this.comment);

      e.preventDefault();
    },
    deleteComment(key) {
      // TODO support mutate comment api
      const comment = this.comments[key];
      console.debug("on deleteComment(): ", comment, this.userInfo);
      if (comment.author.alias != this.userInfo.user.alias)
        console.warn("unavailable");
      comment.isDeleted = true;
      this.$set(this.comments, key, comment);
    },
    restoreComment(key) {
      // TODO support mutate comment api
      const comment = this.comments[key];
      comment.isDeleted = false;
      this.$set(this.comments, key, comment);
    },
    login() {
      this.$store.commit("setPopupLogin", true);
    },
    // loadContents() {
    //   setTimeout(() => {
    //     if (this.$store.getters.getSamplePost)
    //       this.post = this.$store.getters.getSamplePost;
    //     console.debug(`[DEBUG] post received:`);
    //     console.debug(this.post);
    //     this.isLoading = false;
    //   }, 2000);
    // },
    // handleScroll (e) {
    //   if (this.isScrollEventRunning) return;
    //   this.isScrollEventRunning = true;

    //   setTimeout(() => {
    //     if (Math.abs(window.scrollY - this.scrollAtPost) > 0) {
    //       console.log(this.scrollAtPost);
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
    // }
  },
  computed: {
    // comments () {
    //   console.log("comments:");
    //   console.log(this.data.dynamic)
    //   // return this.$apolloData.data.description.comments
    // },
    isLoggedIn() {
      return this.$store.getters.getIsLoggedIn;
      // TODO Check getLoginStatus is still available
      // return this.$store.getters.getLoginStatus;
    },
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
    isOpened() {
      return this.$store.getters.getIsPostOpened;
    },
    createdDate() {
      if (!this.post || !this.post.createdAt) return "";
      else return "Posted at " + new Date(this.post.createdAt).toDateString();
    },
    isXs() {
      return this.$vuetify.breakpoint.xs;
    },
    // topContents() {
    //   if (!this.post["contents"]) return "";
    //   var str = "";
    //   var contents = this.post["contents"].split("\n");
    //   for (let i in [1, 2, 3, 4, 5]) {
    //     str += contents[i] + "\n";
    //   }
    //   return str;
    // }
  },
  watch: {
    isOpened(newVal, oldVal) {
      if (newVal == false) {
        this.active = false;
        // this.$refs["card"].$el.scrollTop = 0;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.git {
  img {
    height: 14em;
    margin: 1em -2em -1em 2em;
  }
  &.xs {
    .image-box {
      text-align: left !important;
      img {
        height: 12em;
        position: relative;
        margin: -100% 0 0 1em;
      }
    }
  }
}

.book {
  padding: 0;
  img {
    height: 14em;
  }
  &.xs {
    padding-bottom: 0;
    margin-top: -5em;
    .image-box {
      text-align: right !important;
      img {
        width: 14em;
        height: 6em;
        object-fit: cover;
        object-position: top;
      }
    }
  }
}
.post-card {
  // margin-top: 100px;
  // background-color: rgb(200, 200, 200);
  background: rgba(255, 255, 255, 0.22);
  // backdrop-filter: blur(5px);
  border: 2px solid transparent;
  // border: 2px solid rgba(255, 255, 255, 0.42);
  border-radius: 1em !important;
  height: 100%;
  max-height: 80vh;
  padding: 0;
  // color: black;
  // z-index: 20;
  font-size: initial;
  transition: color 0.5s, background-color 0.5s, min-height 1s, padding 1s;
  will-change: color, background-color, padding;

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
      background: rgba(0, 0, 0, 0.22);
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
      메 * {
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

    .post-summary.xs {
      max-height: 12.5em;
      overflow-y: hidden;
      text-overflow: ellipsis;
    }

    .post-summary.git.xs {
      width: calc(100% - 14em);
      margin-right: -14em !important;
      margin-left: 14em !important;
    }
  }

  &.active {
    padding: 2em;
    background-color: rgb(230, 230, 230);
    color: black;
    min-height: 80vh;
    max-height: 80vh;
    z-index: 10;
    overflow-y: auto;
    overflow-x: hidden;

    & > .row {
      height: unset;
      .sub-col {
        // flex: 0 0 40%;
        margin: 0 1em 0 -3em;
        max-width: 40%;
        .image-box {
          height: 25em;
        }
        .extra-info {
          // TODO: Fix height;
          height: fit-content;
          & > div {
            border-left: 2px solid rgba(0, 0, 0, 0.22);
            margin: 1em 0;
            height: 100%;
          }
        }
      }

      .sub-col.right {
        // margin: 0;
        margin: 0 -4em 0 2em;
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
        border-color: rgba(0, 0, 0, 0.22);
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

      .post-comment {
        transition: opacity 0.5s;
        &.isRegistering {
          opacity: 0.5;
        }
        &.registered {
          opacity: 1;
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
.post-card-component .active a {
  color: black;
  padding-left: 0.5em;
  padding-right: 0.5em;
  background: #b2e4e4 !important;
  caret-color: #b2e4e4 !important;
  text-decoration: none;
  border-radius: 1em;
  transition: background 0.5s, color 0.5s;
  &:hover {
    background: #139797 !important;
    color: white;
  }
}
</style>
