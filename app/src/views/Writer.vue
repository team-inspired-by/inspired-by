<template>
  <v-container>
    <v-app-bar color="transparent" dark flat>
      <!-- <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
      </template>-->
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-btn icon @click="$router.push('/')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-toolbar-title class="d-flex align-center">
        <span id="logo">Inspired by</span>
        <span id="topic" class="topic ml-2">{{ topic }}</span>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <!-- <v-btn href="https://github.com/vuetifyjs/vuetify/releases/latest" target="_blank" text>
        <span class="mr-2">Credit</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>-->
    </v-app-bar>
    <v-content></v-content>
    <v-layout
      id="card-contents"
      class="d-flex justify-space-between flex-wrap overflow-y-auto pa-3"
    >
      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field
            model="title"
            filled
            single-line
            full-width
            label="Title"
            prepend-inner-icon="mdi-pound"
            ref="test"
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12">
          <vue-simplemde
            v-model="content"
            ref="markdownEditor"
            full-width
            :autoinit="true"
            :sanitize="true"
            :configs="simplemdeConfig"
            :highlight="true"
          />
        </v-col>
        <!-- <v-spacer></v-spacer> -->
        <v-col cols="12">
          <h3 class="text-center serif grey--text my-2">is inspired by</h3>
        </v-col>
        <v-col>
          <v-combobox
            v-model="select"
            :items="items"
            multiple
            chips
            filled
            deletable-chips
            single-line
          >
            <template v-slot:selection="data">
              <v-chip
                :key="JSON.stringify(data.item)"
                v-bind="data.attrs"
                :input-value="data.selected"
                :disabled="data.disabled"
                @click:close="data.parent.selectItem(data.item)"
              >{{ data.item }}</v-chip>
            </template>
          </v-combobox>
        </v-col>
        <v-col cols="12" class="d-flex">
          <div class="mx-auto">
            <v-btn class="ma-2" outlined fab color="grey">
              <v-icon>mdi-check</v-icon>
            </v-btn>
            <v-btn class="ma-2" outlined fab color="grey darken-2">
              <v-icon>mdi-cancel</v-icon>
            </v-btn>
          </div>
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>

<script>
import VueSimplemde from "vue-simplemde";

export default {
  name: "HelloWorld",
  components: {
    VueSimplemde
  },
  data: () => ({
    content: {},
    simplemdeConfig: {
      autofocus: true,
      forceSync: true,
      indentWithTabs: false,
      promptURLs: true,
      showIcons: ["code", "table", "fullscreen"],
      status: ["autosave", "lines", "words", "cursor"],
      insertTexts: {
        horizontalRule: ["", "\n\n-----\n\n"],
        image: ["![](http://", ")"],
        link: ["[", "](http://)"],
        table: [
          "",
          "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n"
        ]
      },
      shortcuts: {
        drawTable: "Cmd-Alt-T"
      },
      spellChecker: true
    },
    select: ["Vuetify", "Programming"],
    items: [
      "Programming",
      "Design",
      "Vue",
      "Vuetify",
      "Indonesian",
      "English",
      "OpenCV"
    ]
  }),
  mounted () { },
  computed: {
    topic () {
      return this.$store.getters.getTopic;
    },
  },
  methods: {
    keymap (event) {
      console.log(event.path[0].selectionEnd);
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "~simplemde/dist/simplemde.min.css";
@import "../assets/simplemde-theme-dark.min.css";
.v-app-bar {
  span {
    font-family: "Times New Roman", Times, serif !important;
    font-weight: 500;
  }
  #topic {
    color: #999;
  }
}
.serif {
  font-family: "Times New Roman", Times, serif;
  font-weight: 500;
}
</style>
