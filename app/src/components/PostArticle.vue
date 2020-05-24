<template>
  <v-row
    id="post-article"
    class="mx-0 my-1"
    :class="{'active': active, 'detail': detail, 'left': left}"
    @click="routeTo()"
  >
    <v-col cols="12">
      <h2>{{ post["title"].replace(/\-/gi, " ") }}</h2>
      <p class="mb-1">{{ post["summary"].slice(0, 50) }}</p>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "custom-post-article",
  props: {
    data: Object,
    detail: Boolean,
    left: Boolean
  },
  data () {
    const postModel = Object.freeze({
      title: "",
      category: "",
      summary: "",
      coverImg: "",
      series: "",
      thumbnail: {
        regular: ""
      }
    })
    return {
      post: Object.assign({}, postModel),
      active: false,
    }
  },
  mounted () {
    this.post = this.data;
  },
  methods: {
    routeTo () {
      this.active = true;
      this.$store.commit('setSelectedPost', { post: this.post, key: this.$vnode.key });
      this.$router.push({ name: "post", params: { post: this.post['title'] } });
      // this.$router.push({ path: path });
      return 0;
    }
  },
  computed: {
    selectedPost () {
      return this.$store.getters.getSelectedPost;
    },
  },
  watch: {
    selectedPost () {
      this.active = this.selectedPost.post['title'] == this.post['title'];
    }
  }
}
</script>

<style lang="scss" scoped>
#post-article {
  transition: padding 0.5s, font-size 0.5s;
  border: 2px solid transparent;
  border-width: 0.25em;
  cursor: pointer;
  &:not(.left) {
    &:hover,
    &.active {
      padding-right: 1em;
      border-right: 0.25em solid #12ffff;
    }
  }
  &.left {
    padding-left: 1em;
    &:hover,
    &.active {
      padding-left: 1em;
      border-left: 0.25em solid #12ffff;
    }
  }
  &.active {
    font-size: large;
  }

  &.detail {
    h2 {
      font-size: medium;
    }
  }
}
</style>