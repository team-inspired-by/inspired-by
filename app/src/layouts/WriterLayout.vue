<template>
  <v-container>
    <v-app-bar color="transparent" dark flat>
      <!-- <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
      </template>-->
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-btn icon @click="$router.push('/')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title class="d-flex align-center">
        <span id="logo">Inspired by</span>
        <span id="topic" class="topic ml-2">{{ topic }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Credit</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>-->
    </v-app-bar>
    <custom-writer />
  </v-container>
</template>

<script>
export default {
  name: "WriterLayout",
  data: () => ({}),
  created () {
    // this.$store.commit("setTopic", this.$route.params.inspiration);
  },
};
</script>

<style lang="scss" scoped></style>
