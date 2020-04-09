<template>
  <v-container id="contents-box" class="pt-5">
    <h1>Treeview</h1>
    <v-row>
      <v-col cols="4"></v-col>
      <v-col cols="4">
        <div class="page" @click="routeTo('/topic/OpenCV')" />
      </v-col>
      <v-col cols="4"></v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Treeview",
  methods: {
    routeTo (path) {
      this.$router.push({ path: path });
    }
  }
}
</script>

<style lang="scss" scoped>
#contents-box {
  .page {
    width: 100%;
    min-height: 30em;
    border: 2px solid rgba(255, 255, 255, 0.22);
    background: rgba(100, 100, 100, 0.22);
    border-radius: 2em;
    transition: background 0.5s;
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
}
</style>