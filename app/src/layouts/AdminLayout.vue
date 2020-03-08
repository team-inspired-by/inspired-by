<template>
  <div>
    <transition :name="transitionName">
      <div v-if="isShowing" id="page-box">
        <v-container id="contents-box" class="pt-0">
          <custom-appbar id="app-bar" :topic="topic" />
          <custom-event />
          <router-view></router-view>
        </v-container>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "AdminLayout",
  data: () => ({
    carouselHeight: 150
  }),
  created () { },
  computed: {
    isShowing () {
      return this.$store.getters.getShow;
    },
    transitionName () {
      if (this.$store.getters.getPageType == "post") {
        return "";
      } else {
        return "page-move";
      }
    },
    topic () {
      return this.$store.getters.getTopic;
    }
  },
  mounted () { },
  methods: {
  }
};
</script>

<style lang="scss">
#page-box {
  // transform: translateY(-50vh);
  #contents-box {
    .serif {
      font-family: "Times New Roman", Times, serif !important;
    }
    & > .row:first-child {
      padding-top: 150px;
    }
    .v-list {
      background: transparent;
    }
    .card-list,
    .card-content {
      // background: transparent;
      background: rgba(100, 100, 100, 0.12) !important;
      border: 2px solid rgba(255, 255, 255, 0.12);
    }
    .card-list {
      border-radius: 1em 0 0 1em;
    }
    .card-content {
      border-radius: 0 1em 1em 0 !important;
      border-left: none;
    }
  }
  .v-form {
    .row {
      margin: 0;
      .col {
        padding-top: 0;
        padding-bottom: 0;
      }
      .v-input--switch__track {
        border: 2px solid rgba(255, 255, 255, 0.22);
      }
      .v-text-field > .v-input__control {
        .v-input__slot {
          background: transparent !important;
          // background: rgba(255, 255, 255, 0.12) !important;
          margin-bottom: 0.5em;
          &:before {
            border-color: rgba(255, 255, 255, 0.22);
          }
        }
      }
    }
  }
}
</style>
