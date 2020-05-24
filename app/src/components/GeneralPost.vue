<template>
  <transition name="item-fade">
    <v-row
      v-if="loaded"
      id="general-post"
      :class="[posName, intro ? 'intro' : '', 'detail']"
      class="pb-0"
    >
      <v-col cols="12" class="pa-0 pr-3">
        <transition name="item-fade">
          <div class="img-box thumb mr-5">
            <img :src="post && post['thumbnail'] ? post['thumbnail']['regular'] : ''" />
          </div>
        </transition>
        <header class="post-header ml-3 px-5">
          <div class="post-title">
            <span class="mr-5">post</span>
            <h2>{{ data.title }}</h2>
          </div>
          <v-divider class="d-flex mt-3" />
          <p class="post-author ma-0 mt-3 ml-2">
            <v-avatar class="mr-2 ml-2" size="0.2rem">
              <v-icon size="1.2em" light>mdi-account-circle</v-icon>
            </v-avatar>
            {{ post['author']['name'] }}, posted at {{ postDate }}
          </p>
        </header>
        <div v-for="(val, key) in parsedContent" :key="key">
          <vue-markdown :watches="['source']" :source="val" class="px-3 pt-5 mt-5" />
          <div
            v-if="images[key] && images[key]['id']"
            class="img-box"
            :class="{'right': key % 2, 'left': !(key % 2)}"
          >
            <img :src="images[key].imageInfo.regular" />
          </div>
        </div>
      </v-col>
      <v-col cols="9">
        <v-row
          class="post-namecard overflow-hidden"
          height="1em"
          @mouseover="hoverNamecard = true"
          @mouseleave="hoverNamecard=false"
        >
          <v-col cols="auto" class="text-center px-5 py-5">
            <v-avatar size="4rem" color="indigo">
              <v-icon size="2em" dark>mdi-account-circle</v-icon>
            </v-avatar>
          </v-col>
          <v-col class="py-5">
            <h2>Kim Jihyeong</h2>
            <transition name="item-fade" mode="in-out">
              <p v-if="!hoverNamecard">kjhricky@gmail.com</p>
              <p v-if="hoverNamecard">About this author ></p>
            </transition>
          </v-col>
          <transition name="item-fade" mode="out-in">
            <v-col v-show="hoverNamecard" class="text-right pa-0">
              <v-icon size="7em" color="#ccc">mdi-arrow-right</v-icon>
            </v-col>
          </transition>
        </v-row>
      </v-col>
      <v-col cols="12" class="pa-0 pt-5">
        <v-row no-gutters>
          <v-col cols="auto">
            <v-subheader light class="mr-4">
              <h2>Comments</h2>
              <!-- <v-divider /> -->
            </v-subheader>
          </v-col>
          <v-col cols="12">
            <v-list-item
              :key="comment.id"
              v-for="(comment, key) in comments"
              :light="true"
              class="post-comment"
              :class="{ isRegistering: !comment.id, registered: comment.id }"
            >
              <template v-if="comment.isDeleted">
                <v-list-item-avatar>
                  <v-icon size="3em" color="grey" dark>mdi-delete-circle-outline</v-icon>
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title>This comment is deleted.</v-list-item-title>
                  <v-list-item-subtitle>
                    <a @click="restoreComment(key)">Click here</a> to cancel
                  </v-list-item-subtitle>
                </v-list-item-content>
              </template>
              <template v-else>
                <v-list-item-avatar>
                  <v-img v-if="comment.avatar" src="comment.avatar"></v-img>
                  <v-icon size="3em" color="grey" dark>mdi-account-circle</v-icon>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>{{ comment.content }}</v-list-item-title>
                  <v-list-item-subtitle>{{ comment.author.name }}</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action v-if="comment.author.alias == userInfo.user.alias">
                  <v-btn icon @click="deleteComment(key)">
                    <v-icon color="grey">mdi-delete</v-icon>
                  </v-btn>
                </v-list-item-action>
              </template>
            </v-list-item>

            <v-list-item v-if="isLoggedIn">
              <v-list-item-avatar>
                <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
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
                  <v-btn class="mr-2" color="#eee" @click="login()">Login</v-btn>to add
                  a comment.
                </p>
              </v-list-item-content>
            </v-list-item>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </transition>
</template>

<script>
import {
  getGeneralPost,
  getPostLists,
  getImage,
} from "../queries/queryContents";
import { addComment } from "../queries/mutateContents";
export default {
  name: "custom-general-post",
  props: {
    'position': Number,
    'post': Object,
    'intro': Boolean
  },
  data () {
    const commentModel = Object.freeze({
      author: {},
      content: "",
      isReply: false,
      replyToCommentId: "",
    });
    const generalPostModel = Object.freeze({
      title: '',
      subtitle: '',
      postType: '',
      languages: '',
      author: {},
      thumbnail: {},
      topics: {},
      summary: '',
      numLikes: 0,
      createdAt: '',
      updatedAt: ''
    })
    return {
      loaded: false,
      showDetail: false,
      data: Object.assign({}, generalPostModel),
      hoverNamecard: false,
      comment: Object.assign({}, commentModel),
      comments: [],
      parsedContent: [],
      images: [],
    }
  },
  mounted () {
    setTimeout(() => {
      this.showDetail = true;
    }, 3000);

    if (this.post)
      this.readGeneralPost(this.post.title)

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
    postDate () {
      if (this.data.publishedAt)
        return new Date(this.data.publishedAt).toDateString();
      return new Date().toDateString();
    },
    isLoggedIn () {
      return this.$store.getters.getIsLoggedIn;
      // TODO Check getLoginStatus is still available
      // return this.$store.getters.getLoginStatus;
    },
    userInfo () {
      return this.$store.getters.getUserInfo;
    },
  },
  watch: {
    pageTo: (newVal, oldVal) => {
      if (oldVal == 'post' && newVal != 'post') {
        this.showDetail = false;
        this.$store.commit('setSelectedPost', {});
      }
    },
    post (newVal) {
      console.debug("post: ", newVal);
      this.readGeneralPost(newVal.title)
      // if (!this.active) {
      //   this.active = true;
      // }
    },
    position (newVal, oldVal) {
      if (Math.abs(newVal - oldVal) >= 3) {
        console.warn("hidden position: ", newVal, oldVal);
        this.loaded = false;
      }
    }

  },
  methods: {
    async readGeneralPost (title) {
      const res = await this.$apollo
        .query({
          client: "inspiredBy",
          variables: {
            title: title,
          },
          query: getGeneralPost,
        });

      const data = res.data.getGeneralPost;
      console.debug(
        "received getGeneralPost of ",
        title,
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
        this.data[i] = data["post"][i];
      }

      // let contents = await this.parseContent(
      //   data.post.lastContent.content
      // );
      let contents = await this.parseContent(data.post.lastContent.content);

      // this.parsedContent = contents;
      console.debug("images: ", this.images);
      console.debug("parsedContent: ", this.parsedContent);
      console.debug("comments:", data.post.comments);
      this.comments = data.post.comments;

      // NOTE: settimeout for testing slow-network
      setTimeout(() => {
        this.loaded = true;
      }, 1000);

      return data.post;
    },
    async parseContent (content) {
      // NOTE: This flow is in reverse order of stringifyContent()
      // this code is from Reviewer.vue but modified
      const contents = content.split("![insp-img");
      console.debug("on parseContent(): ", contents)
      let retContent = "";
      let retParsedContent = [];
      let retImages = [];

      for (let i in contents) {
        let temp1 = contents[i].split(")");
        if (temp1[0].startsWith("](")) {
          console.debug("image: ", temp1[0].slice(2));
          const res = await this.$apollo.query({
            query: getImage,
            variables: {
              id: temp1[0].slice(2)
            }
          });
          console.debug('res: ', res);
          if (res.data.getImage.success) {
            retImages.push({
              side: false,
              ...res.data.getImage.file,
            });
            retParsedContent.push(temp1.slice(1).join(")"));
            retContent += '![' + res.data.getImage.file.alias + '](from attached)' + temp1.slice(1).join(")");
          } else {
            retImages.push({
              side: false
            });
            retParsedContent.push(temp1[0].slice(2).join(")"));
            retContent += '![Unknown Image](' + temp1[0].slice(2) + ')';
          }
        }
        else if (temp1[0].startsWith("-side](")) {
          console.debug("side image: ", temp1[0].slice(7));
          const res = await this.$apollo.query({
            client: "inspiredBy",
            query: getImage,
            variables: {
              id: temp1[0].slice(7)
            }
          })
          console.debug('res: ', res);
          if (res.data.getImage.success) {
            retImages.push({
              side: true,
              ...res.data.getImage.file
            })
            console.warn("on images: ", retImages);
            retParsedContent.push(temp1.slice(1).join(")"));
            retContent += '![' + res.data.getImage.file.alias + ', side](from attached)' + temp1.slice(1).join(")");
            // this.$store.commit("updateImage")
            // image = {

            // }
            // this.$store.commit("imageToContent", image)
          } else {
            retImages.push({
              side: true
            })
            retParsedContent.push(temp1[0].slice(7));
            retContent += '![Unknown Image, side](' + temp1[0].slice(7) + ')';
          }
        }
        else {
          retParsedContent.push(temp1.join(")"));
          retContent += temp1.join(")");
        }
      }
      this.parsedContent = retParsedContent;
      this.images = retImages;
      return retContent;
    },
    addComment (e) {
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
    deleteComment (key) {
      // TODO support mutate comment api
      const comment = this.comments[key];
      console.debug("on deleteComment(): ", comment, this.userInfo);
      if (comment.author.alias != this.userInfo.user.alias)
        console.warn("unavailable");
      comment.isDeleted = true;
      this.$set(this.comments, key, comment);
    },
    restoreComment (key) {
      // TODO support mutate comment api
      const comment = this.comments[key];
      comment.isDeleted = false;
      this.$set(this.comments, key, comment);
    },
    login () {
      this.$store.commit("setPopupLogin", true);
    },
  }
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
  padding: 1em;
  color: white;
  min-width: 37em;
  height: 80vh;
  transition: all 1s, top 1.5s;
  overflow-x: hidden;
  overflow-y: auto;
  border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 2em;
  background-size: cover;
  background-blend-mode: hue;
  will-change: top, transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
  z-index: 400;

  &.detail {
    min-width: 45vw;
    max-width: 50em;
    background: rgb(100, 100, 100);

    .img-box {
      width: 20vw;
      max-width: 15em;
      height: 25rem;
    }
  }

  &.ttop {
    // min-width: 60vw;
    // max-width: 60vw;
    transform: scale(0.9);
    top: 0vh;
    right: 1em;
    background: rgb(100, 100, 100);
    color: black;
    opacity: 0;
    filter: blur(5px);
    animation: fade-in 1s normal 2s;
    animation-fill-mode: forwards;
  }
  &.top {
    // min-width: 60vw;
    // max-width: 60vw;
    transform: scale(0.9);
    top: 29vh;
    right: 1em;
    background: rgb(100, 100, 100);
    color: black;
    filter: blur(5px);
  }
  &.bottom {
    // min-width: 60vw;
    // max-width: 60vw;
    transform: scale(0.9);
    top: 191vh;
    right: 1em;
    background: rgb(100, 100, 100);
    color: black;
    filter: blur(5px);
  }
  &.bbottom {
    // min-width: 60vw;
    // max-width: 60vw;
    transform: scale(0.9);
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
    .img-box {
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
  // h4 {
  //   margin-top: 1.5rem;
  //   font-size: 1.4rem;
  // }
  // h2 {
  //   display: inline;
  //   font-size: 2.2rem;
  //   font-weight: 600;
  //   text-overflow: ellipsis;
  // }
  .img-box {
    display: block;
    float: left;
    width: 9em;
    height: 9em;
    margin: 0.5em 1em;
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 2em;
    transition: margin 2s, width 1s, height 1s;
    overflow: hidden;
    &.thumb {
      margin-top: -1em;
      margin-left: -1em;
    }
    &.left {
      margin-left: -1em;
      float: left;
      clear: left;
    }
    &.right {
      margin-left: 1em;
      margin-right: -2em;
      float: right;
      clear: right;
    }
    img {
      width: 100%;
      height: 100%;
      opacity: 0.5;
      transition: opacity 1s;
      object-fit: cover;
    }
  }

  .post-header {
    .post-title {
      font-size: x-large;
      span {
        display: block;
      }
      h2 {
        font-weight: 500;
      }
    }
    .post-author {
      color: #505050;
    }
  }
  .v-divider {
    border-color: #999;
  }
  &.detail .post-header {
    margin-top: 5em;
  }

  .post-namecard {
    background: #ddd;
    border-radius: 0 2em 2em 0;
    margin-left: -2em;
    margin-right: 2em;
    padding-left: 2em;
    height: 6.5em;
    overflow: hidden;
    transition: box-shadow 0.5s;
    cursor: default;
    &:hover {
      box-shadow: 10px 10px 20px #cfcdce, -10px -10px 20px #ffffff;
    }
  }
}
</style>

<style lang="scss">
#general-post {
  a {
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

  ul {
    list-style-position: inside;
  }
  .v-btn--contained {
    border-radius: 1em;
    box-shadow: none;
    transition: box-shadow 1s;
    &:hover {
      box-shadow: 4px 4px 12px #cfcdce, -4px -4px 12px #ffffff;
    }
  }
  code {
    color: #556;
  }
  pre {
    code {
      display: inline-block;
      width: 100%;
      padding: 1em;
      background: #ddd;
      border-radius: 1em;
      box-shadow: none;
      transition: box-shadow 0.5s;
      &:after {
        display: none;
      }
      &:hover {
        box-shadow: 10px 10px 20px #cfcdce, -10px -10px 20px #ffffff;
      }
    }
  }
  p > code {
    background: #ddd;
    box-shadow: none;
  }
}
</style>