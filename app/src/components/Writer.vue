<template>
  <v-row class="px-0 mx-0 flex-column">
    <!-- <v-layout id="layout-writer" class="d-flex justify-space-between flex-wrap overflow-y-auto"> -->
    <v-col cols="auto" class="pb-0">
      <v-text-field
        v-model="form.title"
        ref="titleInput"
        filled
        single-line
        full-width
        hide-details
        label="Title"
        :rules="[rules.required]"
        class="input-title mt-1"
        prepend-inner-icon="mdi-pound"
      ></v-text-field>
    </v-col>
    <!-- </v-row> -->
    <!-- <v-row v-if="!modeReview" no-gutters class="px-0 mx-0"> -->
    <v-col class="pt-0" style="height:min-content;">
      <vue-simplemde
        v-model="form.content"
        ref="markdownEditor"
        full-width
        name="markdownVal"
        :autoinit="true"
        :sanitize="true"
        :configs="simplemdeConfig"
        :highlight="true"
      />
      <v-divider class="mb-1" />
    </v-col>
    <!-- </v-layout> -->
  </v-row>
</template>

<script>
import VueSimplemde from "vue-simplemde";
// import { mapState } from "vuex";

export default {
  name: "custom-writer",
  components: {
    VueSimplemde,
  },
  props: {
    value: {
      type: Object,
    },
    fillHeight: Boolean,
  },
  data () {
    const defaultForm = Object.freeze({
      title: "",
      content: "",
      contentRaw: "",
      summary: "",
      publishedAt: "",
      deprecatedAt: "",
      topics: [],
      isPrivate: false,
    });
    return {
      form: Object.assign({}, defaultForm),
      keyListener: null,
      subscriber: null,
      // modeReview: false,
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
      },
      simplemdeConfig: {
        autosave: true,
        autofocus: false,
        forceSync: true,
        indentWithTabs: false,
        promptURLs: true,
        showIcons: ["code", "table", "heading-2", "heading-3", "strikethrough"],
        hideIcons: ["image", "fullscreen", "side-by-side"],
        // showIcons: ["code", "table", "fullscreen"],
        status: ["autosave", "lines", "words", "cursor"],
        insertTexts: {
          horizontalRule: ["", "\n\n-----\n\n"],
          image: ["![](http://", ")"],
          link: ["[", "](http://)"],
          table: [
            "",
            "\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text      | Text     |\n\n",
          ],
        },
        shortcuts: {
          drawTable: "Cmd-Alt-T",
        },
        placeholder: "Write description here...",
        spellChecker: true,
      },

      // select: ["Vuetify", "Programming"],
      // items: [
      //   "Programming",
      //   "Design",
      //   "Vue",
      //   "Vuetify",
      //   "Indonesian",
      //   "English",
      //   "OpenCV"
      // ]
    };
  },
  created () {
    this.subscriber = this.$store.subscribe((mutation, state) => {
      if (mutation.type == "imageToContent") {
        var image = mutation.payload;
        if (this.form.content && this.form.content.slice(-2) != "![") this.form.content += "![";
        else if (!this.form.content) this.form.content += "![";
        this.form.content += image["alias"];
        if (!image["hasInfo"]) this.form.content += ", side";
        this.form.content += "](from attached)\n";
        setTimeout(() => {
          this.focusToEditor();
        }, 300);
      }
    });
  },
  mounted () {
    console.debug("loaded form in writer: ", this.form);
    for (let i in this.value) {
      this.form[i] = this.value[i];
    }
    // this.keyListener = window.addEventListener("keyup", (ev) => {
    //   // console.log(ev.target.tagName, ev.target.id, ev);
    //   // console.log(ev.keyCode);
    //   if (ev.target.id == "contents-manager-box") {
    //   } else if (ev.keyCode == 51) {
    //     if (!this.form.title) {
    //       ev.preventDefault();
    //       this.$refs["titleInput"].focus();
    //       return;
    //     }
    //     // } else if (ev.ctrlKey && ev.keyCode == 74) {
    //     //   console.log('j pressed');
    //     //   this.$refs["markdownEditor"].simplemde.codemirror.$el.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'a' }))
    //     //   ev.preventDefault();

    //     // } else if (ev.ctrlKey && ev.keyCode == 75) {
    //     //   ev.preventDefault();
    //     //   document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'a' }))

    //     // } else if (ev.ctrlKey && ev.keyCode == 76) {
    //     //   ev.preventDefault();
    //     //   document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'a' }))

    //     // } else if (ev.ctrlKey && ev.keyCode == 186) {
    //     //   ev.preventDefault();
    //     //   document.dispatchEvent(new KeyboardEvent('keydown', { 'key': 'a' }))
    //   } else if (ev.target.tagName == "BODY") {
    //     // NOTE: .simplemde.toTextArea() seemed to not working.
    //     ev.preventDefault();
    //     this.$refs["markdownEditor"].simplemde.codemirror.focus();
    //     return;
    //   }
    // });
  },
  beforeDestroy () {
    // this.$store.unsubscribe();
    // console.log("unsubscribed");
  },
  methods: {
    focusToEditor () {
      // this.$refs["markdownEditor"].simplemde.codemirror.toggleBold();
      // this.$refs["markdownEditor"].simplemde.codemirror.toggleBold();
      // this.$refs["markdownEditor"].simplemde.codemirror.redo();
      // console.log("on focusToEditor: ", this.$refs["markdownEditor"]);
      if (!this.$refs["markdownEditor"]) return;
      var el = this.$refs["markdownEditor"].simplemde.codemirror;
      var len = this.form.content.length;

      var startPoint = el.getCursor("start");
      var endPoint = el.getCursor("end");
      // var text = el.getSelection();
      // el.replaceSelection(3 + text + 3);
      startPoint.ch += len;
      endPoint.ch += len;
      // console.log(this.$refs);
      el.setSelection(startPoint, endPoint);
      el.focus();
      // setInterval(() => {
      //   this.form.content += 'a'
      // }, 1000);
      // el.setSelectionRange(len, len);
    },
    submit () {
      this.loading = true;
      console.log(this.form.content.replace(/\r/g, "").replace(/\n/g, ""));
      setTimeout(() => {
        this.$store.commit("setIsPostEditing", false);
      }, 2000);
    },
    cancel () {
      this.$store.commit("setIsPostEditing", false);
    },
  },
  computed: {
    imagesToUpload () {
      return this.$store.getters.getImagesToUpload;
    },
    title () {
      return this.form.title;
    },
    content () {
      return this.form.content;
    },
  },
  watch: {
    title (newVal) {
      this.$emit("input", this.form);
    },
    content (newVal, oldVal) {
      this.$emit("input", this.form);
      if (newVal.trim().substr(-2) == "![") {
        this.$store.commit("setPopupContentsManager", true);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
// @import "~simplemde/dist/simplemde.min.css";
</style>
