<template>
  <div>
    <transition :name="transitionName">
      <div v-if="isShowing" id="page-box">
        <v-container id="contents-box" class="py-0">
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
    carouselHeight: 150,
    transitionName: "admin-any"
  }),
  async mounted () {
    await this.setTransitionName();
  },
  async beforeRouteLeave (to, from, next) {
    await this.setTransitionName(to.name);
    next();
  },

  methods: {
    setTransitionName (to) {
      return new Promise(resolve => {
        if (to) var target = to;
        else if (this.pageFrom == "admin" || this.pageFrom == "writer")
          var target = this.pageTo;
        else var target = this.pageFrom;
        if (target == "topic") {
          this.transitionName = "admin-topic";
          // } else if (target == "intro") {
          //   this.transitionName =  "topic-intro";
        } else if (target == "post") {
          this.transitionName = "admin-post";
        } else {
          this.transitionName = "admin-any";
        }
        console.log("transitionName:");
        console.log(this.transitionName);
        resolve();
      });
    }
  },
  computed: {
    topic () {
      return this.$store.getters.getTopic;
    },
    isShowing () {
      return this.$store.getters.getShow;
    },
    pageFrom () {
      return this.$store.getters.getPageFrom;
    },
    pageTo () {
      return this.$store.getters.getPageTo;
    }
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

    #config-box {
      margin-bottom: 1em;
      &.indent {
        margin-left: 1em;
      }
      #col-list,
      #col-content {
        // background: transparent;
        background: rgba(100, 100, 100, 0.22) !important;
        border: 2px solid rgba(255, 255, 255, 0.22);
        will-change: background, border-color, color;
        transition: background 0.5s;

        li {
          margin-left: 1.5em;
          list-style-position: inside;
          text-indent: -1.5em;
        }
      }
      #col-list {
        border-radius: 1em 0 0 1em;
      }
      #col-content {
        border-radius: 0 1em 1em 0;
        border-left: none;
      }

      &.writing-mode {
        #col-list,
        #col-content {
          border-color: rgb(150, 150, 150);
          color: rgb(30, 30, 30);
        }
        #col-list {
          background: rgba(200, 200, 200, 1) !important;
          border-right-width: 1px;
        }
        #col-content {
          background: rgba(230, 230, 230, 1) !important;
          .col-header {
            padding-top: 3em;
            img.thumb {
              width: 35%;
              height: 23em;
              margin: -3em 2em 0em -1.5em;
              object-fit: cover;
              clear: both;
              border-radius: 0 0 1em 0;
              float: left;
            }
          }

          .preview {
            div {
              // min-height: 15em;
              overflow: hidden;
            }
            p {
              img {
                width: 100%;
                max-height: 12em;
                border-radius: 1em;
                object-fit: contain;
                margin: auto;
                background: rgba(200, 200, 200);
              }
            }
            img.side {
              width: 35%;
              height: 20em;
              margin: 0;
              object-fit: cover;
              clear: both;
              border-radius: 1em;
              // img {
              //   height: 30vw;
              // }
              &.left {
                float: left;
                border-radius: 0 1em 1em 0;
                margin-right: 1em;
                margin-left: -1em;
              }
              &.right {
                float: right;
                border-radius: 1em 0 0 1em;
                margin-left: 1em;
                margin-right: -1em;
              }
            }
          }
          .preview + .preview {
            padding-top: 0;
          }
        }

        .xs {
          padding: 0.5em 0 !important;
          #col-list,
          #col-content {
            border-radius: 1em;
            border: 2px solid rgba(255, 255, 255, 0.22);
          }
        }

        .thumb-box {
          width: 3em;
          height: 3em;
          border-radius: 1rem;
          border: 1px solid rgba(100, 100, 100, 0.22);
          cursor: pointer;
          transition: background 0.5s;
          &.detail {
            width: 6em;
            height: 6em;
          }
          img {
            width: 100%;
            height: 100%;
            border-radius: 0.5em;
            object-fit: cover;
          }
          span {
            display: none;
            margin-left: 1em;
            margin-right: 1em;
            font-size: medium;
            color: rgb(70, 70, 70);
          }
          &.expand {
            width: auto;
            span {
              display: inline-block;
            }
          }
          &:hover {
            background: rgba(255, 255, 255, 0.22);
          }
        }

        .v-divider {
          border-color: rgb(150, 150, 150);
        }
        .v-label,
        .v-subheader {
          color: rgb(70, 70, 70);
        }
        .v-input__icon .v-icon,
        .v-input input,
        .v-input textarea,
        .v-list-item__title {
          color: black;
        }
        .v-input--is-disabled .v-input__prepend-inner {
          display: none;
        }
        .primary--text,
        .cm-link {
          color: #278080 !important;
          caret-color: #278080 !important;
        }
        .input-title {
          font-size: x-large;
        }
        .CodeMirror {
          min-height: 10em;
        }
        .CodeMirror,
        .v-input__slot {
          color: black;
          background-color: transparent;
          &:hover {
            // background-color: rgba(0, 0, 0, 0.2);
            // border: 1px solid rgb(150, 150, 150);
          }
        }
        .CodeMirror-selectedtext,
        ::selection {
          background: #9ed3d3;
        }
        .editor-toolbar {
          background-color: transparent;
        }
        .v-input__slot {
          border-bottom: 1px solid rgb(150, 150, 150);
        }
        .v-text-field > .v-input__control > .v-input__slot:before {
          border-color: rgb(150, 150, 150);
        }
      }
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
        border: 2px solid rgba(255, 255, 255, 0.42);
      }
      .v-text-field > .v-input__control {
        .v-input__slot {
          background: transparent !important;
          // background: rgba(255, 255, 255, 0.22) !important;
          margin-bottom: 0.5em;
          &:before {
            border-color: rgba(255, 255, 255, 0.42);
          }
        }
      }
    }
  }
}
</style>
