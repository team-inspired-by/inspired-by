<template>
  <div id="background" :style="{top: top + 'vh'}"></div>
</template>

<script>
export default {
  mounted () {
    // setInterval(() => {
    //   console.log(this.posY, this.top)
    //   this.top = this.posY
    // }, 1000)
  },
  data: () => ({
    top: 0,
  }),
  computed: {
    posY () {
      return this.$store.getters.getPosY;
    }
  },
  watch: {
    posY (newVal, oldVal) {
      this.top = - newVal / 20;
    }
  }
}
</script>
<style lang="scss">
.v-application {
  background: transparent !important;
}
body {
  background-color: #111;
}
#background {
  position: absolute;
  width: 110vw;
  height: 120vh;
  background-image: url("../assets/bg_winter.jpg");
  background-size: cover;
  left: -5vw;
  filter: blur(15px) brightness(0.8);
  z-index: -1;
}
</style>