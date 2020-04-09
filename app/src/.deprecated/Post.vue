<template>
  <div>
    <transition name="post-fade" mode="out-in">
      <div
        id="post-page"
        v-show="isPostOpened && isLoaded && false"
        v-images-loaded.on.done="showPage"
      >
        <v-container id="post-container" class="pt-0">
          <v-row class="pb-0">
            <v-col class="pa-0">
              <v-item-group class="px-5 py-0">
                <v-card class="post-card mb-4" ref="post-card">
                  <v-row class="post-article px-5 py-0">
                    <v-col cols="12">
                      <div class="img-box">
                        <img width="100%" src="https://picsum.photos/200/300?grayscale" />
                      </div>
                      <v-subheader class="post-header">
                        <h5>{{ post["category"] }}</h5>
                        <h3>{{ post["title"] }}</h3>
                      </v-subheader>

                      <div class="post-description">
                        <!-- <v-avatar size="12px">
                    <v-icon :color="black" v-text="'HL'"></v-icon>
                        </v-avatar>-->

                        <p>
                          <v-avatar size="1rem" color="white">
                            <v-icon light>mdi-account-circle</v-icon>
                          </v-avatar>Kim Jihyeong, Posted in Feb 22, 2019.
                        </p>
                      </div>

                      <v-divider />

                      <div class="post-contents">
                        <vue-markdown>{{ content }}</vue-markdown>
                        <vue-markdown>{{ getLorem }}</vue-markdown>
                        <div class="img-box">
                          <img width="100%" src="https://picsum.photos/200/300?grayscale" />
                        </div>
                        <vue-markdown>{{ getLorem }}</vue-markdown>
                        <v-divider />
                        <v-row>
                          <v-col cols="3" class="text-center">
                            <v-avatar size="6rem" color="indigo">
                              <v-icon dark>mdi-account-circle</v-icon>
                            </v-avatar>
                          </v-col>
                          <v-col cols="9">
                            <h4>Kim Jihyeong</h4>
                            <p>kjhricky@gmail.com</p>
                          </v-col>
                        </v-row>
                        <v-divider />
                        <v-row class="post-comments">
                          <v-col cols="12" sm="8">
                            <v-subheader>
                              <h2>Comments</h2>
                            </v-subheader>
                            <v-divider />
                            <v-list-item
                              :key="comment.title"
                              v-for="comment in comments"
                              :light="true"
                            >
                              <v-list-item-avatar>
                                <v-img :src="comment.avatar"></v-img>
                              </v-list-item-avatar>
                              <v-list-item-content>
                                <v-list-item-title>
                                  {{
                                  comment.description
                                  }}
                                </v-list-item-title>
                                <v-list-item-subtitle>
                                  {{
                                  comment.author
                                  }}
                                </v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                            <v-list-item v-if="isLoggedIn">
                              <v-list-item-avatar>
                                <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
                              </v-list-item-avatar>
                              <v-list-item-content class="pb-0">
                                <v-form @submit="addComment">
                                  <v-text-field
                                    v-model="formComment"
                                    label="Add Comment"
                                    color="black"
                                    :light="true"
                                    autofocus
                                  ></v-text-field>
                                </v-form>
                              </v-list-item-content>
                            </v-list-item>
                            <v-list-item v-else :light="true">
                              <v-list-item-content>
                                <p>
                                  <v-btn class="mr-2" @click="login()" dark>Login</v-btn>to add a comment.
                                </p>
                              </v-list-item-content>
                            </v-list-item>
                          </v-col>
                          <v-col class="post-recommmendation" cols="12" sm="4">
                            <h3>How about</h3>
                            <li>How to deal with them?</li>
                            <li>How to deal with them?</li>
                            <li>How to deal with them?</li>
                            <li>How to deal with them?</li>
                            <li>How to deal with them?</li>
                          </v-col>
                        </v-row>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </v-item-group>
            </v-col>
          </v-row>
        </v-container>
      </div>
    </transition>
    <!-- <transition name="item-fade"> -->
    <div
      id="scrim"
      role="document"
      tabindex="0"
      v-if="isShowing"
      @click="closePost()"
      v-scroll-lock="isLoaded"
    />
    <!-- </transition> -->
  </div>
</template>

<script>
import imagesLoaded from "vue-images-loaded";

export default {
  name: "Post",
  data: () => ({
    isLoaded: false,
    formComment: "",
    content: `
## Overview

This document gives a way to make a frontend web application with Vue. The steps below are exactly same as "inspired_by" blog.

## Create a vue project with vue-cli

> For information on how to use Vue CLI 3, visit [official documentation](https://cli.vuejs.org/guide/)

- What I chose:

## Install vuetify

- They say:

> Vuetify is a Vue UI Library with beautifully handcrafted Material Components. No design skills required — everything you need to create amazing applications is at your fingertips.

        `,
    comments: [
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        author: "Ali Connors",
        description:
          "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?"
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        author: "Scott, Jennifer",
        description: "Wish I could come, but I'm out of town this weekend."
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        author: "Sandra Adams",
        description: "Do you have Paris recommendations? Have you ever been?"
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        author: "Trevor Hansen",
        description:
          "Have any ideas about what we should get Heidi for her birthday?"
      },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        author: "Britta Holt",
        description:
          "We should eat this: Grate, Squash, Corn, and tomatillo Tacos."
      }
    ]
  }),
  directives: {
    imagesLoaded
  },
  mounted () {
    // this.$scrollTo(this.$refs["post-card"].$el, 1, { easing: "linear" });
    document.body.style.overflow = "hidden";
  },
  updated () {
    // this.$scrollTo(this.$refs["post-card"].$el, 1, { easing: "linear" });
  },
  destroyed () {
    // document.body.style.overflow = "scroll";
  },
  methods: {
    showPage () {
      this.isLoaded = true;
    },
    login () {
      this.$store.commit("setPopupLogin", true);
      return;
    },
    addComment () {
      alert("hi");
    },
    closePost () {
      // alert('closing')
      // this.$store.commit("openPost", false);
      setTimeout(() => {
        this.isLoaded = false;
      }, 1000);
      this.$router.back();
    }
  },
  computed: {
    getLorem () {
      return this.$store.getters.getLorem;
    },
    post () {
      return this.$store.getters.getPost;
    },
    isLoggedIn () {
      return this.$store.getters.getLoginStatus;
    },
    isPostOpened () {
      return this.$store.getters.getIsPostOpened;
    },
    isShowing () {
      return this.$store.getters.getShow;
    }
  }
};
</script>

<style lang="scss" scoped>
#post-page {
  position: fixed;
  // top: 100px;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  z-index: 15;
  .v-divider {
    display: flex;
    border-color: rgb(150, 150, 150) !important;
  }
  .post-card {
    margin-top: 100px;
    background-color: rgb(200, 200, 200);
    min-height: 80vh;
    max-height: 80vh;
    padding: 1rem 2rem;
    overflow: auto;
    color: black;
    z-index: 20;
    .post-article {
      .post-header {
        color: black;
        font-size: x-large;
        padding-left: 0;
        h5 {
          width: 3.5rem;
        }
      }

      .post-description {
        padding: 0 3em 1em 3em;
        p {
          margin: 0;
          .v-avatar {
            margin-right: 0.5rem;
          }
          &:before {
            content: "";
            display: inline-block;
            width: 3.5rem;
          }
        }
      }
      .img-box:nth-child(1) {
        float: left;
        min-width: 33%;
        max-width: 33%;
        min-height: 30vh;
        margin-right: 2rem;
        margin-bottom: 1rem;
      }
      .img-box:nth-child(3) {
        float: right;
        min-width: 33%;
        max-width: 33%;
        margin-left: 2rem;
      }
    }
    .post-comments {
      color: black;
      .v-subheader {
        color: black;
      }
    }
  }
}
#scrim {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: black;
  opacity: 0.5;
  will-change: opacity;
  pointer-events: auto;
  -ms-touch-action: none;
  touch-action: none;
}
</style>

<style lang="scss">
.post-contents {
  a {
    color: rgb(36, 121, 155) !important;
  }
  h2 {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }
}
</style>
