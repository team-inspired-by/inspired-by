<template>
  <v-container>
    <h1>Auth Data Received</h1>
    <p>Close this tab and proceed.</p>
  </v-container>
</template>

<script>
export default {
  name: "Auth",
  mounted() {
    localStorage.setItem("code", this.$route.query.code);
    window.close();
  }
};
</script>

<style lang="scss" scoped></style>
