<template>
  <v-row class="px-0 mx-0 flex-column">
    <v-col cols="auto" class="col-header pb-0 px-5">
      <img
        v-if="urlInfoIamges[0]"
        :src="urlInfoIamges[0].url"
        :alt="urlInfoIamges[0].alt"
        class="thumb"
      />
      <div class="post-header mt-5 ml-3">
        <span class="mr-5">post</span>
        <h2>{{form.title}}</h2>
      </div>
      <v-divider class="d-flex" />
      <p class="post-author ma-0 mt-3 ml-2">
        <v-avatar class="mr-2 ml-2" size="0.2rem">
          <v-icon size="1.2em" light>mdi-account-circle</v-icon>
        </v-avatar>
        Kim Jihyeong, posted at {{ postDate }}
      </p>
      <vue-markdown class="px-3 pt-5 mt-5">{{ form.summary }}</vue-markdown>
      <!-- <vue-markdown v-else class="px-3 pt-5">{{ form.contentRaw[0] }}</vue-markdown> -->
    </v-col>
    <v-col class="preview" :key="key" v-for="(val, key) in form.contentRaw">
      <img
        v-if="urlInfoIamges[key] && (key != 0)"
        :src="urlInfoIamges[key].url"
        :alt="urlInfoIamges[key].alt"
        class="side"
        :class="{'right': key%2, 'left': !(key%2)}"
      />
      <vue-markdown class="px-3" v-if="key != 0">{{ val }}</vue-markdown>
      <custom-author-card v-if="key == (form.contentRaw.length - 2)" />
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
              label="Overview"
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
            <!-- <v-textarea
              v-model="form.summary"
              label="Summary"
              maxlength="150"
              counter="150"
              autofocus
              full-width
              @input="$emit('input', form)"
            />-->
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Attatched Image
            {{ form.attatchedImage ? "is set" : "" }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row class="px-4">
              <v-col
                class="thumb-box detail pa-1 ma-1"
                cols="auto"
                :key="key"
                v-for="(val, key) in imagesToUpload"
                @click="imageToContent(val)"
              >
                <img :src="val['previewUrl']" />
              </v-col>
            </v-row>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>
            Publish
            {{
            form.publishedAt ? "at " + form.publishedAt : "now"
            }}
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
            {{
            form.deprecatedAt ? "in " + form.deprecatedAt : "is not set"
            }}
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
            <span class="pr-2">{{ item.text }}</span>
            <v-icon small @click="parent.selectItem(item)">close</v-icon>
          </v-chip>
        </template>
        <template v-slot:item="{ index, item }">
          <v-text-field
            v-if="topicEditing === item"
            v-model="topicEditing.text"
            autofocus
            flat
            background-color="transparent"
            hide-details
            @keyup.enter="topicEdit(index, item)"
          ></v-text-field>
          <v-chip v-else light label>{{ item.text }}</v-chip>
          <v-spacer></v-spacer>
          <v-list-item-action @click.stop>
            <v-btn icon light @click.stop.prevent="topicEdit(index, item)">
              <v-icon>{{ topicEditing !== item ? 'mdi-pencil-outline' : 'mdi-check' }}</v-icon>
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
      type: Object
    },
    fillHeight: Boolean,
  },
  data () {
    const defaultForm = Object.freeze({
      title: "",
      content: "",
      contentRaw: [],
      summary: "",
      publishedAt: null,
      deprecatedAt: null,
      attatchedImage: [],
      topics: []
    });
    return {
      form: Object.assign({}, defaultForm),
      loading: false,
      topicSearch: null,
      topicEditing: null,
      topicIndex: -1,
      urlInfoIamges: []
      // selectedTopics: [],
    }
  },
  created () {
    this.contentToContentRaw()
  },
  mounted () {
    this.form.title = this.value['title'] || "No title";
    this.form.content = this.value['content'];
  },
  methods: {
    contentToContentRaw () {
      let contentRaw = [];
      let contents = this.value['content'].split(", side](from attatched)");
      // let last_contents = contents.pop();
      // if (contents.length == 1 && !contents[0].includes("![")) return;
      let content = ''
      let name = ''
      for (let i in contents) {
        if (i != (contents.length - 1)) {
          content = contents[i].split('![');
          name = content.pop()
          this.urlInfoIamges.push({
            url: this.imageUrl(name),
            alt: name
          });
        } else {
          content = contents[i]
        }
        contentRaw.push(content)
      }

      let temp = []
      for (let i in contentRaw) {
        content = ''
        for (let j in contentRaw[i]) {
          temp = contentRaw[i][j].split("](from attatched)");
          if (temp.length > 1) {
            content += '![' + temp[0] + "](" + this.imageUrl(temp[0]) + ")" + temp[1];
          } else if (temp.length === 1) {
            content += contentRaw[i][j]
          }
        }
        contentRaw[i] = content.trim()
      }

      // console.log('contentRaw: ', contentRaw)
      // console.log('urlInfoImages: ', this.urlInfoIamges)
      this.form.contentRaw = contentRaw
      this.form.summary = "## Overview"


      // let tempContent = '';
      // let contents = this.value['content'].split("](from attatched)");
      // let last_contents = contents.pop();
      // if (contents.length == 1 && !contents[0].includes("![")) return;
      // for (let i in contents) {
      //   let name = contents[i].split("![").slice(-1)[0];
      //   tempContent += contents[i] + "](" + this.imageUrl(name) + ")";
      // }
      // tempContent += last_contents;

      // // console.log("contentRaw!");
      // // this.contentRaw += this.content;
      // // console.log(`content: ${this.contentRaw}`);
      // // console.log("contentRaw: ", this.form.contentRaw);
      // // console.log(this.imagesToUpload);
      this.$emit('input', this.form);
    },
    createInfoImage () {

    },
    imageUrl (searchStr) {
      if (!searchStr.trim()) return;
      console.log('on imageUrl: ', searchStr)
      const val = this.$store.getters.getImagesToUpload.find(obj => {
        return obj.keyword == searchStr;
      });
      return val.previewUrl;
    },
    topicEdit (index, item) {
      console.log('topicEdit:')
      console.log(index, item)
      if (!this.topicEditing) {
        this.topicEditing = item
        this.topicIndex = index
      } else {
        this.topicEditing = null
        this.topicIndex = -1
      }
    },
    topicFilter (item, queryText, itemText) {
      // console.log("on topicFilter: ");
      // console.log(item, queryText, itemText);
      if (item.header) return false

      const hasValue = val => val != null ? val : ''

      const text = hasValue(itemText)
      const query = hasValue(queryText)

      return text.toString()
        .toLowerCase()
        .indexOf(query.toString().toLowerCase()) > -1
    },

  },
  computed: {
    topicList () {
      return this.$store.getters.getTopicList;
    },
    imagesToUpload () {
      return this.$store.getters.getImagesToUpload;
    },
    selectedTopics () {
      return this.form.topics;
    },
    postDate () {
      if (this.form.publishedAt)
        return new Date(this.form.publishedAt).toDateString()
      return new Date().toDateString()
    }
  },
  watch: {
    selectedTopics (newVal, oldVal) {
      if (newVal.length === oldVal.length) return;

      this.form.topics = newVal.map(v => {
        if (typeof v === 'string') {
          v = {
            text: v,
          }
          this.form.topics.push(v)
        }
        return v
      })
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/simplemde-theme-dark.min.css";
.row {
  width: 100%;
}
.serif {
  font-family: "Times New Roman", Times, serif;
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