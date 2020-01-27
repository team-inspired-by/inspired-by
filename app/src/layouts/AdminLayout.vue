<template>
  <div>
    <transition :name="transitionName">
      <div v-if="show">
        <router-view></router-view>
      </div>
    </transition>
    <custom-subtitle></custom-subtitle>
  </div>
</template>

<script>
export default {
  name: "AdminLayout",
  data: () => ({}),
  created() {
  },
  computed: {
    show () {
      return this.$store.getters.getShow;
    },
    transitionName () {
      if (this.$store.getters.getPageType == "post") {
        return "";
      } else {
        return "page-move";
      }
    },
  },

  mounted() {
    
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>

</style>
