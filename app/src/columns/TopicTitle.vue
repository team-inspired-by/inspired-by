<template>
  <div id="col-topic-title">
    <div id="topic-intro-column">
      <img id="fg" src="../assets/topic_opencv_fg.png" />
    </div>
    <div id="topic-intro-bg-column">
      <img id="bg" src="../assets/topic_opencv_bg.jpg" />
    </div>
  </div>
</template>

<script>
export default {
  name: "ColTopicTitle"

}
</script>

<style lang="scss" scoped>
#col-topic-title {
  position: fixed;
  width: 70vw;
  height: 100vh;
  z-index: 100;
}
</style>