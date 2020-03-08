<template>
  <v-container>
    <v-layout id="layout-writer" class="d-flex justify-space-between flex-wrap overflow-y-auto">
      <v-row no-gutters class="px-0 mx-0">
        <v-col cols="12">
          <v-text-field
            v-model="title"
            ref="titleInput"
            filled
            single-line
            full-width
            label="Title"
            prepend-inner-icon="mdi-pound"
          ></v-text-field>
        </v-col>
        <v-spacer></v-spacer>
        <v-col cols="12">
          <vue-simplemde
            v-model="content"
            ref="markdownEditor"
            full-width
            name="markdownVal"
            :autoinit="true"
            :sanitize="true"
            :configs="simplemdeConfig"
            :highlight="true"
            :value="'Write Here'"
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
            <v-btn class="ma-2" outlined fab color="grey" @click="submit()">
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
import { mapState } from "vuex";

export default {
  name: "custom-writer",
  components: {
    VueSimplemde
  },
  data: () => ({
    title: "",
    //     content: `
    // ## Overview

    // This document gives a way to make a frontend web application with Vue.The steps below are exactly same as "inspired_by"
    // blog.

    // ## Create a vue project with vue - cli

    // > For information on how to use Vue CLI 3, visit[official documentation](https: //cli.vuejs.org/guide/)

    // -What I chose:

    // ##Install vuetify

    // - They say:

    // > Vuetify is a Vue UI Library with beautifully handcrafted Material Components.No design skills required— everything you need to create amazing applications is at your fingertips.

    // ##Lorem Ipsum Lorem, ipsum dolor sit amet consectetur adipisicing elit.Dolor nobis debitis, odit quisquam itaque et, totam dolores voluptas accusamus at explicabo porro ? Neque incidunt, id voluptates omnis at ipsa distinctio consequuntur illum, necessitatibus magnam unde quae nesciunt iste sapiente inventore reprehenderit placeat voluptate quam enim a earum, ###How can we improve it ?
    // lorem asperiores, nisi nobis quisquam id neque consequatur dolorem magni, consequuntur magnam### Is this really Happen ?
    // consequatur perspiciatis delectus quidem.Repudiandae saepe deleniti possimus iure a blanditiis laborum praesentium, dignissimos inventore illo libero quia ? Culpa iusto earum quae vero provident, asperiores, nisi nobis quisquam id neque consequatur dolorem magni, consequuntur magnam ex natus velit quo ? Quaerat quia quae eius dolore, libero cupiditate nihil expedita ut laborum voluptatibus itaque molestiae ?

    // ## Lorem Ipsum Lorem, ipsum dolor sit amet consectetur adipisicing elit.Dolor nobis debitis, odit quisquam itaque et, totam dolores voluptas accusamus at explicabo porro ? Neque incidunt, id voluptates omnis at ipsa distinctio consequuntur illum, necessitatibus magnam unde quae nesciunt iste sapiente inventore reprehenderit placeat voluptate quam enim a earum, ###How can we improve it ?
    // lorem asperiores, nisi nobis quisquam id neque consequatur dolorem magni, consequuntur magnam### Is this really Happen ?
    // consequatur perspiciatis delectus quidem.Repudiandae saepe deleniti possimus iure a blanditiis laborum praesentium, dignissimos inventore illo libero quia ? Culpa iusto earum quae vero provident, asperiores, nisi nobis quisquam id neque consequatur dolorem magni, consequuntur magnam ex natus velit quo ? Quaerat quia quae eius dolore, libero cupiditate nihil expedita ut laborum voluptatibus itaque molestiae ? "

    // ## Overview

    // This document gives a way to make a frontend web application with Vue.The steps below are exactly same as "inspired_by"
    // blog.

    // ## Create a vue project with vue - cli

    // > For information on how to use Vue CLI 3, visit[official documentation](https: //cli.vuejs.org/guide/)

    // - What I chose:

    // ## Install vuetify

    // - They say:

    // > Vuetify is a Vue UI Library with beautifully handcrafted Material Components.No design skills required— everything you need to create amazing applications is at your fingertips.

    // ## Lorem Ipsum Lorem, ipsum dolor sit amet consectetur adipisicing elit.Dolor nobis debitis, odit quisquam itaque et, totam dolores voluptas accusamus at explicabo porro ? Neque incidunt, id voluptates omnis at ipsa distinctio consequuntur illum, necessitatibus magnam unde quae nesciunt iste sapiente inventore reprehenderit placeat voluptate quam enim a earum, ###How can we improve it ?
    // lorem asperiores, nisi nobis quisquam id neque consequatur dolorem magni, consequuntur magnam### Is this really Happen ?
    // consequatur perspiciatis delectus quidem.Repudiandae saepe deleniti possimus iure a blanditiis laborum praesentium, dignissimos inventore illo libero quia ? Culpa iusto earum quae vero provident, asperiores, nisi nobis quisquam id neque consequatur dolorem magni, consequuntur magnam ex natus velit quo ? Quaerat quia quae eius dolore, libero cupiditate nihil expedita ut laborum voluptatibus itaque molestiae ?

    // ## Lorem Ipsum Lorem, ipsum dolor sit amet consectetur adipisicing elit.Dolor nobis debitis, odit quisquam itaque et, totam dolores voluptas accusamus at explicabo porro ? Neque incidunt, id voluptates omnis at ipsa distinctio consequuntur illum, necessitatibus magnam unde quae nesciunt iste sapiente inventore reprehenderit placeat voluptate quam enim a earum, ###How can we improve it ?
    // lorem asperiores, nisi nobis quisquam id neque consequatur dolorem magni, consequuntur magnam### Is this really Happen ?
    // consequatur perspiciatis delectus quidem.Repudiandae saepe deleniti possimus iure a blanditiis laborum praesentium, dignissimos inventore illo libero quia ? Culpa iusto earum quae vero provident, asperiores, nisi nobis quisquam id neque consequatur dolorem magni, consequuntur magnam ex natus velit quo ? Quaerat quia quae eius dolore, libero cupiditate nihil expedita ut laborum voluptatibus itaque molestiae ? "
    //     `,
    content: "",
    keyListener: null,
    subscriber: null,
    simplemdeConfig: {
      autofocus: false,
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
  created () {
    this.subscriber = this.$store.subscribe((mutation, state) => {
      if (mutation.type == "uploadImage") {
        // console.log("hello: ", mutation);
        var data = mutation.payload.data;
        this.content += data.tags[0].title + '](' + data.urls.full + ')\n';
        setTimeout(() => {
          this.focusToEditor()
        }, 300);
      }
    });
  },
  mounted () {
    this.keyListener = window.addEventListener("keyup", ev => {
      // console.log(ev.target.tagName, ev.target.id, ev);
      // console.log(ev.keyCode);
      if (ev.target.id == "contents-manager-box") {
      } else if (ev.keyCode == 51) {
        if (!this.title) {
          ev.preventDefault();
          this.$refs["titleInput"].focus();
          return;
        }
      } else if (ev.ctrlKey && ev.keyCode == 74) {
        console.log('j pressed');
        this.$refs["markdownEditor"].simplemde.codemirror.$el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'a' }))
        ev.preventDefault();

      } else if (ev.ctrlKey && ev.keyCode == 75) {
        ev.preventDefault();
        document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'a' }))

      } else if (ev.ctrlKey && ev.keyCode == 76) {
        ev.preventDefault();
        document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'a' }))

      } else if (ev.ctrlKey && ev.keyCode == 186) {
        ev.preventDefault();
        document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'a' }))

      } else if (ev.target.tagName == "BODY") {
        // NOTE: .simplemde.toTextArea() seemed to not working.
        ev.preventDefault();
        this.$refs["markdownEditor"].simplemde.codemirror.focus();
        return;
      }
    });
  },
  beforeDestroy () {
    // this.$store.unsubscribe();
    // console.log("unsubscribed");
  },
  computed: {
    topic () {
      return this.$store.getters.getTopic;
    },
    // imageUrl () {
    //   return this.$store.getters.getImageUrl;
    // }
  },
  methods: {
    submit () {
      console.log(this.content.replace(/\r/g, "").replace(/\n/g, ""));
    },
    keymap (event) {
      console.log(event.path[0].selectionEnd);
    },
    focusToEditor () {
      // this.$refs["markdownEditor"].simplemde.codemirror.toggleBold();
      // this.$refs["markdownEditor"].simplemde.codemirror.toggleBold();
      // this.$refs["markdownEditor"].simplemde.codemirror.redo();
      var el = this.$refs["markdownEditor"].simplemde.codemirror;
      var len = this.content.length

      var startPoint = el.getCursor("start")
      var endPoint = el.getCursor("end")
      // var text = el.getSelection();
      // el.replaceSelection(3 + text + 3);
      startPoint.ch += len;
      endPoint.ch += len;
      // console.log(this.$refs);
      el.setSelection(startPoint, endPoint);
      el.focus()
      // setInterval(() => {
      //   this.content += 'a'
      // }, 1000);
      // el.setSelectionRange(len, len);
    }
  },
  watch: {
    content (newVal, oldVal) {
      if (newVal.trim().substr(-2) == "![") {
        this.$store.commit("setPopupContentsManager", true);
      }
    },
    imageUrl (newVal, oldVal) {
      alert(newVal)
      if (newVal != oldVal) {
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// @import "~simplemde/dist/simplemde.min.css";
@import "../assets/simplemde-theme-dark.min.css";
.row {
  width: 100%;
}
.serif {
  font-family: "Times New Roman", Times, serif;
  font-weight: 500;
}
</style>
