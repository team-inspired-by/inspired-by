<template>
  <div
    class="star"
    :style="{ top: topic.y, right: topic.x }"
    @click="focus"
    :class="{
      isFocused: isFocused || isSelected || isIntro,
      isSelected: isSelected || isIntro,
      isIntro: isIntro
    }"
  >
    <p v-if="isNeeded">{{ topic.name }}</p>
  </div>
</template>

<script>
export default {
  name: "custom-startitle",
  props: {
    topic: Object,
    isIntro: Boolean
  },
  data: () => ({}),
  mounted () { },
  methods: {
    focus () {
      if (this.isFocused) {
        // this.isSelected = true
        this.$store.commit("setTopic", this.topic.name);
        this.$router.push("/topic/" + this.topic.name);
      } else {
        this.$store.commit("focusTopic", this.topic.name);
      }
      // if (this.isFocused) {
      //   this.isSelected = true
      //   setTimeout(() => {
      //     this.isSelected = false
      //   }, 4800);
      //   setTimeout(() => {
      //     this.$router.push('/topic/' + this.topic.name)
      //   }, 5000);
      //   this.$store.commit("setTopic", this.topic.name)
      // } else {
      //   this.$store.commit("focusTopic", this.topic.name)
      // }
    }
  },
  computed: {
    isFocused () {
      return this.topic.name == this.$store.getters.getFocusedTopic;
    },
    isNeeded () {
      if (this.$store.getters.getTopic && !this.isSelected) {
        return false;
      }
      return true;
    },
    isSelected () {
      if (this.isIntro) return true;
      return this.topic.name == this.$store.getters.getTopic;
    }
  }
};
</script>

<style lang="scss" scoped>
@keyframes slideout {
  // from {
  //   top: 100vh !important;
  //   opacity: 0;
  // }
  // 50% {
  //   top: 45vh !important;
  //   opacity: 1;
  // }
  0% {
    top: 45vh;
    opacity: 0;
  }
  49% {
    opacity: 0;
  }
  50% {
    top: 45vh;
    opacity: 1;
  }
  100% {
    top: -15em;
  }
}
.star {
  position: absolute;
  font-size: x-large;
  line-height: 1em;
  font-family: "Times New Roman", Times, serif;
  cursor: pointer;
  transition: right 1s, top 1s, font-size 1s, color 2s, opacity 1s 0.5s;
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
    // opacity: 0;
  }
  &.isIntro {
    transition: opacity 0s;
    animation-name: slideout;
    animation-delay: 0s;
    animation-duration: 2s;
    animation-timing-function: ease-in;
    animation-fill-mode: forwards;
  }
  // &.blowing {
  //   top: 45vh !important;
  //   right: calc(50vw - 5.5em) !important;
  //   opacity: 1;
  //   animation-name: slideout;
  //   animation-delay: 1s;
  //   animation-duration: 1s;
  //   animation-timing-function: ease-in;
  //   animation-fill-mode: forwards;
  // }
}
</style>
