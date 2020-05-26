<template>
  <v-card
    class="edit-post-box"
    :class="['type-'+key, value == key ? 'edit-mode' : '', (value && value != key) ? 'hide-mode' : '']"
    flat
    :ripple="false"
    @click="selectAddPostBox(key)"
  >
    <v-row class="text-center">
      <transition name="item-fade">
        <v-col v-show="!(value == key)" class="add-post-logo-box overflow-hidden pa-0" cols="12">
          <v-icon light size="12em" class="mt-5">mdi-{{type.icon}}</v-icon>
        </v-col>
      </transition>
    </v-row>
    <v-row class="add-post-input-box text-center pt-5" no-gutters>
      <v-col cols="12" class="mb-5">
        <h1>{{ type.postType}}</h1>
        <p class="mb-0">{{ type.description }}</p>
      </v-col>
      <template v-if="key=='GIT'">
        <v-col cols="12" align="center">
          <v-btn @click="closeAddPostBox" color="transparent" :ripple="false">
            <v-icon class="mr-2">mdi-github</v-icon>Github Login
          </v-btn>
          <v-slide-group
            v-model="form.git.name"
            class="py-4 px-0 text-center"
            prev-icon="mdi-chevron-left"
            next-icon="mdi-chevron-right"
            :multiple="false"
            mandatory
            show-arrows
            center-active
          >
            <v-slide-item
              v-for="repo in $apollo.data.repositories"
              :key="repo.node.nameWithOwner"
              v-slot:default="{ active, toggle }"
            >
              <v-card
                :color="active ? 'grey lighten-2' : 'grey darken-1'"
                class="git-card ma-1 pt-5 pb-5 px-2"
                height="5em"
                width="80%"
                @click="toggle"
              >
                <p class="mx-1">{{repo.node.nameWithOwner.split("/")[0] + "/"}}</p>
                <h4 class="mx-1 mb-5">{{repo.node.nameWithOwner.split("/")[1]}}</h4>
              </v-card>
            </v-slide-item>
          </v-slide-group>
        </v-col>
      </template>
      <template v-if="key=='GENERAL'">
        <v-col class="mx-5">
          <h5>Write a title:</h5>
          <v-text-field label="Solo" single-line solo></v-text-field>
        </v-col>
      </template>
      <v-col cols="12">
        <v-btn @click="closeAddPostBox" color="transparent" :ripple="false">
          <v-icon class="mr-2">mdi-arrow-left</v-icon>Go back
        </v-btn>
        <v-btn v-if="form.git.name" @click="closeAddPostBox" color="transparent" :ripple="false">
          Next
          <v-icon class="ml-2">mdi-arrow-right</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { getRepositories } from "../queries/repo";

export default {
  name: "custom-new-post",
  apollo: {
    repositories: {
      client: "github",
      query: getRepositories,
      variables: {
        first: 1,
        last: 2
      },
      skip () {
        return this.key != 'GIT'
      },
      update (res) {
        console.debug("on getRepositories: ", res);
        return res.viewer.repositories.edges
      }
    }
  },
  props: {
    type: Object,
    value: String
  },
  data () {
    return {
      form: {
        git: {
          name: ""
        }
      }
    }
  },
  computed: {
    key () {
      return this.$vnode.key;
    },

  },
  methods: {
    selectAddPostBox (key) {
      this.$emit("input", key);
    },
    closeAddPostBox (e) {
      this.$emit("input", "");
      e.stopPropagation();
    }
  },
}
</script>

<style lang="scss" scoped>
.edit-post-box {
  position: absolute;
  top: 130vh;
  width: 22em;
  height: 22em;
  transition: all 1s;
  overflow-x: hidden;
  overflow-y: hidden;
  background: linear-gradient(-45deg, #333, #666);
  color: white;
  border: 2px solid transparent;
  // border: 2px solid rgba(100, 100, 100, 0.7);
  border-radius: 2em !important;
  z-index: 700;
  &.type-SERIES {
    top: calc(130vh - 7em);
    right: 5em;
    transform: scale(0.55);
  }
  &.type-GENERAL {
    top: calc(130vh + 11em);
    right: 5em;
    transform: scale(0.78);
  }
  &.type-GIT {
    top: calc(130vh - 10em);
    right: 24em;
    transform: scale(0.7);
  }
  &.type-BOOK {
    top: calc(130vh + 7em);
    right: 23em;
    transform: scale(0.5);
  }
  .add-post-logo-box {
    transition: height 0.5s 1s;
    height: 14em;
  }
  .add-post-input-box {
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    border-radius: 2em 2em 0 0;
    h5 {
      padding-left: 1em;
      padding-right: 1em;
      line-height: 200%;
      color: #bbb;
    }
  }
  &.hide-mode {
    filter: blur(5px);
    z-index: 710;
  }
  &.edit-mode {
    cursor: default;
    margin-top: -1em;
    margin-left: -1em;
    // &.type-0 {
    //   transform: scale(0.65);
    // }
    // &.type-1 {
    //   transform: scale(0.88);
    // }
    // &.type-2 {
    //   transform: scale(0.8);
    // }
    // &.type-3 {
    //   transform: scale(0.6);
    // }
    transform: scale(1);
    .add-post-logo-box {
      height: 0;
    }
    .git-card {
      border-radius: 1em;
      box-shadow: none;
      &.v-slide-item--active {
        color: #222;
      }
      p {
        font-size: smaller;
        margin: 0;
      }
      h4 {
        font-size: larger;
        white-space: nowrap;
      }
    }
    z-index: 750;
  }
}
</style>

<style lang="scss">
.v-btn--contained {
  border-radius: 2em;
  box-shadow: none;
  transition: box-shadow 0.5s;
  &:hover {
    box-shadow: 5px 5px 10px #333, -5px -5px 10px #555;
  }
  &:before:hover {
    opacity: 0;
  }
}
.v-text-field {
  border-radius: 1em;
  &.v-text-field.v-text-field--enclosed > .v-input__control > .v-input__slot {
    background: transparent;
    box-shadow: inset 5px 5px 10px #333, inset -5px -5px 10px #555;
    padding-left: 1.5em;
    padding-right: 1.5em;
  }
}
</style>