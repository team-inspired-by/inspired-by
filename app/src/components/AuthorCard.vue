<template>
  <div class="author-card px-5 py-1">
    <v-row>
      <v-col cols="auto" class="text-center">
        <v-avatar size="6rem" color="indigo">
          <v-icon size="3em" dark>mdi-account-circle</v-icon>
        </v-avatar>
      </v-col>
      <v-col>
        <h2>Kim Jihyeong</h2>
        <p>kjhricky@gmail.com</p>
      </v-col>
    </v-row>
  </div>
</template>


<script>
export default {
  name: "custom-author-card"
}
</script>

<style lang="scss" scoped>
.author-card {
  border-top: 1px solid rgb(150, 150, 150);
  border-bottom: 1px solid rgb(150, 150, 150);
  font-size: small;
}
</style>