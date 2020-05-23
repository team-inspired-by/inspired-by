<template>
  <v-row id="post-article" class="ma-0" :class="{'active': active}" @click="routeTo()">
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
  transition: border 0.5s;
  border: 2px solid transparent;
  border-left-width: 0.25em;
  cursor: pointer;
  &:hover {
    border-left-width: 2px;
    border-right: 0.25em solid #12ffff;
  }
  &.active {
    // background-color: rgba(255, 255, 255, 0.12);
    border-left-width: 2px;
    border-right: 0.25em solid #12ffff;
  }
}
</style>