<template>
  <div>
    <v-container id="contents-box" class="text-center" v-intersect.once="onIntersect">
      <custom-startitle :topic="topic" selected />
      <v-row class="text-center circle">
        <v-col cols="12">
          <img id="top-image" src="../assets/desk.png" />
        </v-col>
        <v-col cols="12">
          <h1>환영합니다!</h1>
          <p>
            kimjihyeong100@gmail.com 블로거님 안녕하세요!
            <br />inspired-by 블로그 사이트에 오신 것을 환영합니다.
            <br />간단하게 inspired-by 블로그에 대해 알아보세요!
            <br />
          </p>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "InvitationLayout",
  data: () => ({
    topic: {
      'name': "hello"
    }
  }),
  methods: {
    onIntersect () {
      console.log("intersected")
      this.$store.commit("setVideoState", true);
    }
  }
}
</script>

<style lang="scss" scoped>
#contents-box {
  .circle {
    display: inline-block;
    max-width: 40em;
    max-height: 40em;
    padding: 2em;
    border: 2px solid rgba(255, 255, 255, 0.22) !important;
    border-radius: 20em;
    font-family: "GmarketSansMedium";
    #top-image {
      width: 100%;
      max-width: 20em;
      filter: grayscale(0.5);
    }
  }
}
</style>