<template>
  <v-container id="post-container" class="pt-0">
    <v-row class="issue-box pb-0">
      <v-col class="pa-0">
        <v-item-group class="px-5 py-0">
          <v-card ref="post-card" class="mb-4">
            <v-row class="px-5 py-0">
              <v-col cols="12" sm="4">
                <img width="100%" src="https://picsum.photos/200/300?grayscale" />
              </v-col>
              <v-col cols="12" sm="8">
                <v-subheader>
                  <h5 class="mr-3">post</h5>
                  <h3>Difference between backtracking and DFS</h3>
                </v-subheader>

                <v-divider></v-divider>
                <v-card-text>
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Enim
                  reiciendis recusandae eaque, facere nesciunt quibusdam suscipit ipsam
                  nisi sequi explicabo ducimus itaque, illo harum cumque repellat
                  inventore aperiam unde incidunt!
                </v-card-text>
                <v-divider></v-divider>
              </v-col>
            </v-row>
          </v-card>
        </v-item-group>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Post",
  data: () => ({
    content: `
# Setting up a frontend web app

- Author: Kim Jihyeong(KJHRicky@gmail.com)
- Written in Nov 20, 2019

## Overview

This document gives a way to make a frontend web application with Vue. The steps below are exactly same as "inspired_by" blog.

## Create a vue project with vue-cli

> For information on how to use Vue CLI 3, visit [official documentation](https://cli.vuejs.org/guide/)

- What I chose:

## Install vuetify

- They say:

> Vuetify is a Vue UI Library with beautifully handcrafted Material Components. No design skills required — everything you need to create amazing applications is at your fingertips.

        `
  }),
  mounted () {
    this.$scrollTo(this.$refs["post-card"].$el, 1, { easing: "linear" });
  },
  updated () {
    this.$scrollTo(this.$refs["post-card"].$el, 1, { easing: "linear" });
  },
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.issue-box {
  padding-left: 1.5em;
  .v-card {
    margin-top: 100px;
    background-color: rgb(200, 200, 200);
    color: black;
    min-height: 80vh;
    overflow: scroll;
    z-index: 10;
    .v-subheader {
      color: black;
      font-size: x-large;
    }
    .v-card__text {
      font-size: larger;
    }
  }
}
</style>