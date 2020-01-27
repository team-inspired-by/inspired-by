<template>
  <div>
    <h1>test Layout</h1>
    <custom-subtitle></custom-subtitle>
  </div>
</template>

<script>
export default {
  mounted () {
    this.$store.commit("setTopic", this.$route.params.inspiration);

  }
}
</script>