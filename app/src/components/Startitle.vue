<template>
  <div
    id="star"
    :style="{'top': topic.y, 'right': topic.x}"
    @click="focus"
    :class="{'isFocused': isFocused || isSelected, 'isSelected': isSelected}"
  >
    <p v-if="isNeeded">{{ topic.title }}</p>
  </div>
</template>

<script>
export default {
  name: "custom-startitle",
  props: {
    "topic": Object,
    "selected": Boolean
  },
  data: () => ({
    isSelected: false
  }),
  mounted () {
    this.isSelected = this.selected
  },
  methods: {
    focus () {
      if (this.isFocused) {
        this.isSelected = true
        this.$store.commit("setTopic", this.topic.title)
        this.$router.push('/topic/' + this.topic.title)
      } else {
        this.$store.commit("focusTopic", this.topic.title)
      }
      // if (this.isFocused) {
      //   this.isSelected = true
      //   setTimeout(() => {
      //     this.isSelected = false
      //   }, 4800);
      //   setTimeout(() => {
      //     this.$router.push('/topic/' + this.topic.title)
      //   }, 5000);
      //   this.$store.commit("setTopic", this.topic.title)
      // } else {
      //   this.$store.commit("focusTopic", this.topic.title)
      // }
    }
  },
  computed: {
    isFocused () {
      return this.topic.title == this.$store.getters.getFocusedTopic
    },
    isNeeded () {
      if (this.$store.getters.getTopic && !this.isSelected) {
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes slideout {
  to {
    top: -15em;
  }
}
#star {
  position: absolute;
  font-size: x-large;
  line-height: 1em;
  font-family: "Times New Roman", Times, serif;
  cursor: pointer;
  transition: right 1s, top 1s, font-size 1s, color 2s;
  z-index: 5;
  p {
    text-shadow: none;
    transition: text-shadow 0.5s;
  }
  &:hover p {
    text-shadow: 0.1em 0.1em 2em #ccc;
  }
  &:hover ::after {
    box-shadow: 0 0 1.2em 0.5em #ccc;
  }
  ::before {
    content: "Inspired by";
    display: none;
    color: #eee;
    font-size: smaller;
    margin-right: 0.25em;
    opacity: 0;
    transition: opacity 1s 0.5s;
  }
  ::after {
    content: "";
    display: inline-block;
    width: 0.25em;
    height: 0.25em;
    font-weight: 100;
    cursor: pointer;
    margin: 0 0 0.5em 0.25em;
    background-color: #ccc;
    border-radius: 50%;
    box-shadow: 0 0 1em 0.1em #ccc;
    transition: background-color 0.5s, box-shadow 1s;
  }
  &.isFocused {
    font-size: 4rem;
    color: #f7f473;
    top: 70vh !important;
    right: 3rem !important;
    ::before {
      display: inline-block;
      opacity: 1;
    }
    ::after {
      margin-bottom: 0.7em;
      background-color: #f7f473;
      box-shadow: 0 0 0.7em 0.25em #f7f473;
    }
  }
  &.isSelected {
    top: 45vh !important;
    right: calc(50vw - 5.5em) !important;
    animation-name: slideout;
    animation-delay: 1s;
    animation-duration: 1s;
    animation-timing-function: ease-in;
    animation-fill-mode: forwards;
  }
}
</style>
