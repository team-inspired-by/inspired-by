<template>
  <v-container>
    <v-layout
      id="card-contents"
      class="d-flex justify-space-between flex-wrap overflow-y-auto pa-3"
    >
      <v-row>
        <v-col cols="6" md="3">
          <v-card class="pa-2 mx-auto" light>
            <h2>Lists</h2>
          </v-card>
        </v-col>
        <v-col cols="6" md="6">
          <vue-markdown>{{ content }} </vue-markdown>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",
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
  created() {
    for (let i in this.topics) {
      this.topics[i]["top"] = this.randomPosY() + "vh";
      this.topics[i]["left"] = this.randomPosX() + "vw";
    }
  },
  computed: {
    topic() {
      return this.$store.getters.getTopic;
    },
    isMain() {
      return this.$store.getters.getIsMain;
    }
  },
  methods: {
    expandTopic() {
      this.expand = !this.expand;
    },
    selectTopic(key) {
      this.selectedTopic = key;
      this.isTopicSelected = true;
    },
    randomPosX() {
      return Math.floor(Math.random() * 80, 80) + 10;
    },
    randomPosY() {
      var val = Math.floor(Math.random() * 50, 50) + 5;
      return val > 25 ? val + 35 : val;
    }
  }
};
</script>

<style lang="scss" scoped>
.v-app-bar {
  span {
    font-family: "Times New Roman", Times, serif !important;
    font-weight: 500;
  }
  #topic {
    color: #999;
  }
}

.inspiration-card {
  overflow: hidden;
  transition: max-width 1s, max-height 1s;
  text-overflow: ellipsis;
  max-width: 20em;
  max-height: 20em;
  border-radius: 2rem !important;
  &.minimized {
    max-width: 10em;
    max-height: 5em;
  }
  .keyword {
    overflow: hidden;
    transition: max-width 1s, max-height 1s, padding 1s;
    max-width: 0;
    max-height: 0;
    padding: 0;
    &.minimized {
      max-width: 20em;
      max-height: 4em;
      padding: 1em 1em;
    }
  }
}
</style>
