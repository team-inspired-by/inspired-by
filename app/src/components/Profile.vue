<template>
  <!-- <transition name mode="out-in"> -->
  <div v-show="popupStatus">
    <div id="profile-avatar">
      <v-avatar size="10em" color="indigo darken-2">
        <v-icon size="10em" color="grey lighten-4" dark>mdi-account-circle</v-icon>
      </v-avatar>
    </div>
    <div id="profile-box" class="pa-5">
      <h2>Kim Jihyeong</h2>
      <h4>Manager</h4>
      <v-divider />
      <div class="py-2">
        <p class="mt-1 mb-0">kimjihyeong@gmail.com</p>
        <p>김지형</p>
        <p>클릭하여 프로필 수정</p>
      </div>
    </div>
    <v-card id="profile-cover" ripple></v-card>
  </div>
  <!-- </transition> -->
</template>

<script>
export default {
  name: "custom-profile",
  data: () => ({
    hasLocked: false
  }),
  methods: {
    test () {
      //   console.log(this.$refs)
    }
  },
  computed: {
    popupStatus () {
      return this.$store.getters.getPopupProfile;
    }
  },
  watch: {
    popupStatus (newVal, oldVal) {
      if (newVal && !oldVal) {
        this.hasLocked = document.getElementsByTagName("html")[0].style.overflow;
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
      }
      else {
        document.getElementsByTagName("html")[0].style.overflow = this.hasLocked;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@keyframes intro-avatar {
  from {
    opacity: 1;
    right: 10vw;
    transform: rotate(90deg);
  }
  to {
    opacity: 1;
    right: calc(10vw + 8em);
    transform: rotate(0deg);
  }
}
@keyframes intro-box {
  from {
    background: transparent;
    border: 1px solid rgba(255, 255, 255, 0.7);
  }
  30% {
    background: transparent;
  }
  50% {
    background: rgb(32, 82, 122);
    border: 1px solid rgba(255, 255, 255, 0.7);
  }
  to {
    border-color: transparent;
  }
}
@keyframes intro-cover {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
#profile-avatar {
  position: fixed;
  top: calc(70px + 0.5rem);
  right: calc(10vw + 8rem);
  animation-name: intro-avatar;
  animation-delay: 2s;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  opacity: 0;
  z-index: 450;
  transition: right 0.5s, transform 0.5s;
  //   &:hover {
  //     right: calc(10vw + 12em);
  //     transform: rotate(-45deg);
  //   }
}
#profile-box {
  position: fixed;
  top: 70px;
  right: 10vw;
  width: 11rem;
  height: 11rem;
  border-radius: 1em;
  border: 1px solid transparent;
  //   background: linear-gradient(rgb(80, 80, 80), rgb(70, 70, 90));
  //   background: rgb(80, 80, 80);
  background: rgb(32, 82, 122);
  box-shadow: -15px 0px 17px -7px rgba(0, 0, 0, 0.75);
  text-overflow: clip;
  font-size: smaller;
  animation-name: intro-box;
  animation-duration: 2s;
  z-index: 500;
}
#profile-cover {
  position: fixed;
  top: 70px;
  right: 10vw;
  width: 11rem;
  height: 11rem;
  border-radius: 1em;
  border: 1px solid transparent;
  opacity: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0), rgb(0, 0, 255, 0.4));
  z-index: 510;
  animation-name: intro-cover;
  animation-duration: 0.5s;
  animation-delay: 1s;
  animation-fill-mode: forwards;
}
</style>