<template>
  <div>
    <transition :name="transitionName" appear>
      <div v-if="isShowing">
        <router-view></router-view>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "TreeviewLayout",
  data: () => ({
    transitionName: "treeview-any"
  }),
  computed: {
    isShowing () {
      return this.$store.getters.getShow;
    }
  }
}
</script>