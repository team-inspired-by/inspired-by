<template>
  <v-row class="px-0 mx-0 flex-column">
    <v-col cols="auto" class="col-header pb-0 px-5">
      <img
        v-if="thumbnailImage"
        :src="thumbnailImage.image.regular"
        :alt="thumbnailImage.alias"
        class="thumb"
      />
      <div class="post-header mt-5 ml-3">
        <span class="mr-5">post</span>
        <h2>{{ form.title }}</h2>
      </div>
      <v-divider class="d-flex" />
      <p class="post-author ma-0 mt-3 ml-2">
        <v-avatar class="mr-2 ml-2" size="0.2rem">
          <v-icon size="1.2em" light>mdi-account-circle</v-icon>
        </v-avatar>
        Kim Jihyeong, posted at {{ postDate }}
      </p>
      <vue-markdown
        v-if="form.summary"
        :watches="['source']"
        :source="'## Overview\n' +form.summary"
        class="px-3 pt-5 mt-5"
      ></vue-markdown>
      <!-- <vue-markdown v-else class="px-3 pt-5">{{ form.contentRaw[0] }}</vue-markdown> -->
    </v-col>
    <v-col class="preview" :key="key" v-for="(val, key) in form.contentRaw">
      <img
        v-if="key-1 >= 0 && attachedImages[contentImages[key-1]]"
        :src="attachedImages[contentImages[key-1]].image.regular"
        :alt="attachedImages[contentImages[key-1]].alias"
        class="side"
        :class="{ right: key % 2, left: !(key % 2) }"
      />
      <!-- <img
        v-if="urlInfoImages[key-1] && (key-1 != 0)"
        :src="urlInfoImages[key-1].url"
        :alt="urlInfoImages[key-1].alt"
        class="side"
        :class="{ right: key % 2, left: !(key % 2) }"
      />-->
      <!-- <img
        v-else-if="key-1 == 0 && urlInfoImages[key-1].url != thumbnailImage.image.regular"
        :src="urlInfoImages[key-1].url"
        :alt="urlInfoImages[key-1].alt"
        class="side"
        :class="{ right: key % 2, left: !(key % 2) }"
      />-->
      <div>
        <vue-markdown :watches="['source']" :source="val" class="px-3"></vue-markdown>
        <custom-author-card v-if="key == form.contentRaw.length - 1" />
      </div>
    </v-col>
    <v-col class="pt-0">
      <v-divider />
      <v-subheader>Options</v-subheader>
      <v-expansion-panels class="px-3" light accordion>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Overview
            {{ form.summary ? "is set" : "" }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-textarea
              v-model="form.summary"
              label="Tell a brief story about this post..."
              maxlength="150"
              counter="150"
              autofocus
              full-width
              @input="$emit('input', form)"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Thumbnail image
            {{ form.thumbnail ? "is set" : "will be the first Image" }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-item-group v-model="selectedThumbnail" mandatory>
              <v-row>
                <v-col
                  v-for="(val, key) in attachedImages"
                  :key="key"
                  cols="auto"
                  class="file-image detail-thumbnail selector mx-1 pa-1"
                >
                  <v-item v-slot:default="{ active, toggle }" :value="key">
                    <img :src="val['image']['thumb']" @click="toggle" />
                  </v-item>
                </v-col>
              </v-row>
            </v-item-group>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Attached Image
            {{ form.attachedImages ? "is set" : "" }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-item-group v-model="selectedAttachedImages" multiple>
              <v-subheader class="px-0">Used in this post:</v-subheader>
              <v-row>
                <div v-for="(val, key) in attachedImages" :key="key">
                  <v-col
                    v-if="contentImages.includes(key) || (selectedThumbnail == key)"
                    cols="auto"
                    class="file-image detail selector select-reverse mx-1 pa-1"
                  >
                    <v-item v-slot:default="{ active, toggle }" :value="key" disabled>
                      <img :src="val['image']['thumb']" @click="toggle" />
                    </v-item>
                  </v-col>
                </div>
              </v-row>
              <v-subheader class="px-0">Not used in this post (click to remove):</v-subheader>
              <v-row>
                <div v-for="(val, key) in attachedImages" :key="key">
                  <v-col
                    v-if="!(contentImages.includes(key) || (selectedThumbnail == key))"
                    cols="auto"
                    class="file-image detail selector mx-1 pa-1"
                  >
                    <v-item v-slot:default="{ active, toggle }" :value="key">
                      <img :src="val['image']['thumb']" @click="toggle" />
                    </v-item>
                  </v-col>
                </div>
              </v-row>
            </v-item-group>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Publish
            {{ form.publishedAt ? "at " + form.publishedAt : "now" }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-date-picker
              v-model="form.publishedAt"
              full-width
              :landscape="$vuetify.breakpoint.smAndUp"
              flat
              color="indigo"
              :show-current="true"
              @input="$emit('input', form)"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Deprecate
            {{ form.deprecatedAt ? "in " + form.deprecatedAt : "is not set" }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-date-picker
              v-model="form.deprecatedAt"
              full-width
              :landscape="$vuetify.breakpoint.smAndUp"
              flat
              color="red darken-4"
              :show-current="true"
              @input="$emit('input', form)"
            />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
    <!-- <v-spacer></v-spacer> -->
    <!-- <v-spacer></v-spacer> -->
    <v-col cols="auto" class="pb-0">
      <h4 class="text-center serif mt-2 mb-0">This content is inspired by</h4>
    </v-col>
    <v-col class="pb-0">
      <v-combobox
        v-model="form.topics"
        :filter="topicFilter"
        :items="topicList"
        :hide-no-data="!topicSearch"
        :search-input.sync="topicSearch"
        placeholder="Select topics here"
        hide-details
        hide-seleted
        multiple
        chips
        filled
        deletable-chips
        single-line
        light
        @input="$emit('input', form)"
      >
        <template v-slot:no-data>
          <v-list-item-action @click.stop>
            <v-list-item light>
              <span class="subheading mr-2">Create</span>
              <v-chip label light>{{ topicSearch }}</v-chip>
            </v-list-item>
          </v-list-item-action>
        </template>
        <!-- <template v-slot:selection="data">
          <v-chip
            :key="JSON.stringify(data.text)"
            v-bind="data.attrs"
            :input-value="data.selected"
            :disabled="data.disabled"
            light
            @click:close="data.parent.selectItem(data.item)"
          >{{ data.item.text }}</v-chip>
        </template>-->
        <template v-slot:selection="{ attrs, item, parent, selected }">
          <v-chip v-if="item === Object(item)" v-bind="attrs" :input-value="selected" label filled>
            <span class="pr-2">{{ item.name }}</span>
            <v-icon small @click="parent.selectItem(item)">close</v-icon>
          </v-chip>
        </template>
        <template v-slot:item="{ index, item }">
          <v-text-field
            v-if="topicEditing === item"
            v-model="topicEditing.name"
            autofocus
            flat
            background-color="transparent"
            hide-details
            @keyup.enter="topicEdit(index, item)"
          ></v-text-field>
          <v-chip v-else light label>{{ item.name }}</v-chip>
          <v-spacer></v-spacer>
          <v-list-item-action @click.stop>
            <v-btn icon light @click.stop.prevent="topicEdit(index, item)">
              <v-icon>
                {{
                topicEditing !== item ? "mdi-pencil-outline" : "mdi-check"
                }}
              </v-icon>
            </v-btn>
          </v-list-item-action>
        </template>
      </v-combobox>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "custom-reviewer",
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
      contentRaw: [],
      thumbnailId: null,
      summary: "",
      publishedAt: "",
      deprecatedAt: null,
      topics: [],
      isPrivate: false,
    });
    const urlInfoImage = Object.freeze({
      url: '',
      alt: '',
      at: null
    })
    return {
      form: Object.assign({}, defaultForm),
      loading: false,
      topicSearch: null,
      topicEditing: null,
      topicIndex: -1,
      _urlInfoImage: Object.assign({}, urlInfoImage),
      urlInfoImages: [],
      contentImages: [],
      thumbnailImage: null,
      selectedThumbnail: null,
      selectedAttachedImages: [],
      // selectedTopics: [],
    };
  },
  created () {
    this.contentToContentRaw();
  },
  mounted () {
    console.log("value: ", this.value);
    this.form = this.value;
    // this.form.title = this.value["title"] || "No title";
    // this.form.content = this.value["content"];
  },
  methods: {
    contentToContentRaw () {
      // NOTE: This logic may be similar to parseContent() in AdminPost.vue
      let contentRaw = [];
      let contents = this.value["content"].split(", side](from attached)");
      // let last_contents = contents.pop();
      // if (contents.length == 1 && !contents[0].includes("![")) return;
      let content = "";
      let name = "";
      for (let i in contents) {
        if (i != contents.length - 1) {
          content = contents[i].split("![");
          name = content.pop();
          this.urlInfoImages.push({
            url: this.imgSrc(name),
            alt: name,
          });
          this.contentImages.push(name)
        } else {
          content = contents[i];
        }
        contentRaw.push(content);
      }

      let temp = [];
      for (let i in contentRaw) {
        content = "";
        for (let j in contentRaw[i]) {
          temp = contentRaw[i][j].split("](from attached)");
          if (temp.length > 1) {
            content +=
              "![" + temp[0] + "](" + this.imgSrc(temp[0]) + ")" + temp[1];
          } else if (temp.length === 1) {
            // NOTE: for normal image url
            if (temp[0].includes(']('))
              content += "!["
            content += contentRaw[i][j];
          }
        }
        contentRaw[i] = content.trim();
      }

      // console.log('contentRaw: ', contentRaw)
      // console.log('urlInfoImages: ', this.urlInfoImages)
      this.form.contentRaw = contentRaw;
      this.form.summary = "";
      if (this.contentImages)
        this.selectedThumbnail = this.contentImages[0];
      // this.selectedThumbnail = this.attachedImages[0].alias;

      console.log("attached Images:", this.attachedImages)
      console.log("contentImages: ", this.contentImages, this.attachedImages['Tiger'], this.contentImages[0])

      // let tempContent = '';
      // let contents = this.value['content'].split("](from attached)");
      // let last_contents = contents.pop();
      // if (contents.length == 1 && !contents[0].includes("![")) return;
      // for (let i in contents) {
      //   let name = contents[i].split("![").slice(-1)[0];
      //   tempContent += contents[i] + "](" + this.imgSrc(name) + ")";
      // }
      // tempContent += last_contents;

      // // console.log("contentRaw!");
      // // this.contentRaw += this.content;
      // // console.log(`content: ${this.contentRaw}`);
      // // console.log("contentRaw: ", this.form.contentRaw);
      // // console.log(this.imagesToUpload);
      this.$emit("input", this.form);
    },
    createInfoImage () { },
    imgSrc (searchStr) {
      if (!searchStr.trim()) return;
      console.log("on imgSrc: ", searchStr);
      // const val = this.$store.getters.getAttachedImages.find((obj) => {
      //   return obj.alias == searchStr;
      // });
      // return val.image.regular;
      // return this.$store.getters.getAttachedImages[searchStr].image.regular;
      return this.attachedImages[searchStr].image.regular;
    },
    topicEdit (index, item) {
      console.log("topicEdit:");
      console.log(index, item);
      if (!this.topicEditing) {
        this.topicEditing = item;
        this.topicIndex = index;
      } else {
        this.topicEditing = null;
        this.topicIndex = -1;
      }
    },
    topicFilter (item, queryText, itemText) {
      // console.log("on topicFilter: ");
      // console.log(item, queryText, itemText);
      if (item.header) return false;

      const hasValue = (val) => (val != null ? val : "");

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return (
        text
          .toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      );
    },
  },
  computed: {
    topicList () {
      return this.$store.getters.getTopicList;
    },
    attachedImages () {
      return this.$store.getters.getAttachedImages;
    },
    selectedTopics () {
      return this.form.topics;
    },
    postDate () {
      if (this.form.publishedAt)
        return new Date(this.form.publishedAt).toDateString();
      return new Date().toDateString();
    },
  },
  watch: {
    selectedTopics (newVal, oldVal) {
      if (newVal.length === oldVal.length) return;

      this.form.topics = newVal.map((v) => {
        if (typeof v === "string") {
          v = {
            name: v,
          };
          this.form.topics.push(v);
        }
        return v;
      });
    },
    selectedThumbnail (newVal) {
      this.thumbnailImage = this.attachedImages[newVal];
      if (this.attachedImages[newVal])
        this.form.thumbnailId = this.attachedImages[newVal].registeredId;
      console.log("selected: ", this.thumbnailImage, this.form.thumbnailId);
      this.$emit('input', this.form);
    }
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/simplemde-theme-dark.min.css";
.row {
  width: 100%;
}
.serif {
  // font-family: "Times New Roman", Times, serif;
  font-weight: 500;
}

.post-header {
  font-size: x-large;
  span {
    display: block;
  }
}
.post-author {
  color: #505050;
}

.v-expansion-panel {
  background-color: transparent !important;
  border: 1px solid #aaa;
  &::before {
    box-shadow: none !important;
  }
}

.v-expansion-panel + .v-expansion-panel {
  border-top: none;
}

.v-menu__content,
.v-autocomplete__content.v-menu__content {
  box-shadow: none;
  border-radius: 1em;
}
.v-select-list {
  background: rgb(220, 220, 220) !important;
}

.theme--light.v-expansion-panels .v-expansion-panel:not(:first-child)::after {
  border-color: transparent;
}
</style>
