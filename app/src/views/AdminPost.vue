<template>
  <div>
    <custom-subheader title="Contents Editor" indent />
    <v-row
      id="config-box"
      ref="config-box"
      class="mt-2 indent"
      :class="{ 'writing-mode': editType }"
      @click="focus()"
    >
      <v-col cols="12" sm="3" id="col-list" class="pa-0" :class="{ xs: isXs }">
        <v-list class="card-list fill-height" flat rounded>
          <v-list-item-group>
            <v-list-item v-if="!editType" @click="viewType = 'Select'">
              <v-list-item-icon>
                <v-icon>mdi-plus</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Create Post</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-list-item v-if="editType" @click="viewType = 'Select'">
              <v-list-item-icon>
                <v-icon>mdi-chevron-left</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Go back</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider />
          </v-list-item-group>

          <div v-if="editType && !reviewing">
            <v-subheader>Attatched Images</v-subheader>
            <v-row class="px-4">
              <v-col
                class="thumb-box pa-1 ma-1"
                cols="auto"
                :key="key"
                v-for="(val, key) in imagesToUpload"
                @click="imageToContent(val)"
              >
                <img :src="val['previewUrl']" />
              </v-col>
              <v-col
                class="thumb-box pa-2 ma-1 text-center"
                :class="{ expand: !imagesToUpload.length }"
                cols="auto"
                @click="openContentsManager()"
              >
                <v-icon size="1.9em" color="grey darken-2">mdi-plus</v-icon>
                <span>Add image</span>
              </v-col>
            </v-row>
          </div>
          <div v-if="editType">
            <!-- <v-subheader>Summary</v-subheader>
            <li
              class="grey--text text--darken-3"
              :key="key"
              v-for="(key, val) in context"
            >
              {{ val }}
            </li>-->
            <v-subheader>Guide</v-subheader>
            <li style="font-size:small;" class="grey--text text--darken-3">
              If you are new to markdown grammar,
              <a
                class="primary--text text--lighten-2"
                href="https://simplemde.com/markdown-guide"
                target="_blank"
              >See This.</a>
            </li>
            <li
              style="font-size:small;"
              class="grey--text text--darken-3"
            >Post layout and text-wrap styles may be vary in respect to user's devices</li>
          </div>

          <v-list-item-group v-if="!editType" v-model="selectedContentsEditorTopic" mandatory>
            <v-list-item class="mt-2" @click="viewType='Written'">
              <v-list-item-icon>
                <v-icon>mdi-ballot-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>Written</v-list-item-content>
            </v-list-item>
            <v-divider />
            <v-list-item
              class="mt-2"
              v-for="(topic, i) in topicList"
              :key="i"
              @click="viewType=topic['text']"
            >
              <v-list-item-icon>
                <v-icon>mdi-alpha-{{ topic["text"][0].toLowerCase() }}-circle-outline</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="topic['text']"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>
      <v-col id="col-content" cols="12" sm="9" class="d-flex flex-column" :class="{ xs: isXs }">
        <transition name="item-fade" mode="out-in">
          <custom-writer
            v-if="editType == 'general' && !reviewing"
            v-model="writingModel.general"
            fillHeight
          />
          <custom-reviewer v-else-if="editType == 'general'" v-model="writingModel.general" />
          <v-row v-if="editType != 'general'" class="mx-0 flex-1" style="height: min-content;">
            <v-col cols="12" v-if="editType == 'general'" class="fill-height"></v-col>
            <v-col cols="12" v-if="editType == 'git'">
              <vue-code-highlight>
                // You have to extract the component from the module
                import { component as VueCodeHighlight } from 'vue-code-highlight';
                components:{
                VueCodeHighlight,
                ...
                }
              </vue-code-highlight>
            </v-col>
            <v-col cols="12" v-else-if="editType == 'Success'">
              <div>
                <v-icon size="5em">mdi-check</v-icon>
              </div>
              <h2>Successfully added post.</h2>
              <p>Tap left-side "Written" button whenever you want to edit</p>
            </v-col>
            <v-col cols="12" v-else-if="viewType == 'Select'">
              <v-row class="text-center px-3">
                <v-col cols="6" :key="key" v-for="(val, key) in writingTypes">
                  <v-card
                    class="select-post-type py-3"
                    :color="val.color"
                    flat
                    @click="editType = val.key"
                  >
                    <v-icon size="5em">mdi-{{ val.icon }}</v-icon>
                    <h3>
                      create
                      <b>{{ val.postType }}</b>
                    </h3>
                    <v-divider />
                    <p class="mb-0">{{ val.description }}</p>
                  </v-card>
                </v-col>
              </v-row>
            </v-col>
            <v-col cols="12" v-else-if="viewType">
              <h3 class="ma-3">{{ viewType }} Posts</h3>
              <v-item-group>
                <custom-post-card :data="val" :key="key" v-for="(val, key) in posts" />
              </v-item-group>
            </v-col>
          </v-row>
        </transition>
        <v-row class="mx-0 flex-0 flex-grow-0">
          <transition name="item-fade" mode="in-out">
            <v-col class="text-right" v-if="editType && !reviewing">
              <v-btn class="mr-2" outlined color="grey" @click="viewType = 'Select'">
                <v-icon class="mr-2">mdi-cancel</v-icon>Discard
              </v-btn>
              <v-btn class="mr-2" outlined color="grey" @click="save()">
                <v-icon class="mr-2">mdi-content-save-edit-outline</v-icon>Save Edit
              </v-btn>
              <v-btn
                class="mr-0"
                :loading="loading"
                outlined
                color="grey darken-2"
                @click="review(true)"
              >
                <v-icon class="mr-2">mdi-check</v-icon>Review post & publish
              </v-btn>
            </v-col>
            <v-col class="text-right" v-if="editType && reviewing">
              <v-btn class="mr-2" outlined color="grey" @click="review(false)">
                <v-icon class="mr-2">mdi-chevron-left</v-icon>Edit
              </v-btn>

              <v-btn class="mr-0" :loading="loading" color="primary darken-4" @click="submit()">
                <v-icon class="mr-2">mdi-check</v-icon>Publish Post
              </v-btn>
            </v-col>
          </transition>
        </v-row>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { getTopic, checkPostTitle } from "../queries/queryContents";
import { TestGitQuery } from "../queries/repo";

export default {
  name: "AdminPost",
  component: () => {
    return [
      import('../components/Writer'),
      import('../components/Reviewer')
    ]
  },
  apollo: {
    topic: {
      client: "inspiredBy",
      query () {
        return getTopic;
      },
      variables () {
        return {
          name: this.selectedTopic
        }
      },
      skip () {
        return !this.selectedTopic;
      },
      update: data => {
        console.debug("getTopic on admin: ");
        console.debug(data);
        if (data["getTopic"] && data['getTopic'].success)
          return data.getTopic.topic;
        else if (data["getTopic"] && !data['getTopic'].success)
          console.warn(data.getTopic.message);
        else
          console.error("Unknown error occurred");
      }
    },
    checkPostTitle: {
      client: "inspiredBy",
      query () {
        return checkPostTitle;
      },
      variables () {
        return {
          title: this.titleToSearch
        }
      },
      skip () {
        return !this.titleToSearch
      },
      update: data => {
        console.debug("checkPostTitle on admin: ");
        console.debug(data);
        // this.loading = false;
        if (data.checkPostTitle.success) {
          return data.checkPostTitle.success
          // this.reviewing = true;
        }
      }
    }
  },
  data: () => ({
    testing: null,
    mode: "",
    editType: "",
    viewType: "Select",
    reviewing: false,
    selectedContentsEditorTopic: 0,
    attatchedImages: 0,
    titleToSearch: '',
    loading: false,
    writingTypes: [
      {
        postType: "General Post",
        key: 'general',
        icon: "newspaper",
        description: "normal posts"
      },
      {
        postType: "Git Post",
        key: 'git',
        icon: "git",
        description: "link your git project"
      },
      {
        postType: "Book Post",
        key: 'book',
        icon: "book",
        description: "for book review"
      },
      {
        postType: "Series",
        key: 'series',
        icon: "ballot",
        description: "sum up the posts"
      }
    ],
    writingModel: {
      'general': {
        title: '',
        content: '',
        contentRaw: '',
        summary: '',
        publishedAt: '',
        deprecatedAt: '',
      },
      'book': {
        title: '',
        content: '',
        contentRaw: ''
      }
    }
  }),
  computed: {
    topic () {
      return this.$store.getters.getTopic;
    },
    topicList () {
      return this.$store.getters.getTopicList;
    },
    posts () {
      if (!this.$apolloData.data["topic"]) return {};
      return this.$apolloData.data.topic.posts;
    },
    selectedTopic () {
      return (this.viewType == 'Select' || this.viewType == 'Written') ? '' : this.viewType
    },
    isXs () {
      return this.$vuetify.breakpoint.xs;
    },
    isPostEditing () {
      return this.$store.getters.getIsPostEditing;
    },
    imagesToUpload () {
      return this.$store.getters.getImagesToUpload;
    },
    titleAvailable () {
      return this.$apolloData.data["title"]
    }
  },
  watch: {
    viewType (newVal) {
      if (newVal) {
        this.mode = 'view'
        this.editType = ''
      }
    },
    editType (newVal, oldVal) {
      if (newVal && !oldVal) {
        this.mode = 'edit'
        this.viewType = ''
        document.getElementsByTagName("html")[0].style.overflowY = "hidden";
        this.$store.commit("setIsPostEditing", true);
      } else {
        document.getElementsByTagName("html")[0].style.overflowY = "auto";
      }
    },
    isPostEditing (newVal, oldVal) {
      console.log('on watch isPostEditing:', newVal, oldVal);
      if (!newVal && oldVal) {
        this.editType = 'Success'
      }
    },
    imagesToUpload (newVal) {
      this.writingModel.general.contentImages = newVal;
      this.writingModel.book.contentImages = newVal;
    },
    titleAvailable (newVal) {
      console.log('titleAvailable: ', newVal);
    }
  },
  created () {
    window.addEventListener('beforeunload', this.save);
  },
  mounted () {
    const saved = JSON.parse(sessionStorage.getItem('generalPostContent'));
    console.log('loaded: ', saved);
    if (saved != "undefined") {
      this.writingModel.general = saved;
    }
  },
  methods: {
    focus () {
      this.$scrollTo(document.querySelector("#config-box #col-content"), 1000, {
        offset: 100
      });
    },
    imageToContent (file) {
      console.log(`file: ${file}`);
      console.log(file);
      this.$store.commit("imageToContent", file);
    },
    openContentsManager () {
      this.$store.commit("setPopupContentsManager", true);
    },
    save () {
      alert('saving')
      sessionStorage.setItem('generalPostContent', JSON.stringify(this.writingModel.general));
      console.log('saved: ', sessionStorage.getItem('generalPostContent'))
    },
    review (mode) {
      if (mode) {
        this.loading = true
        this.titleToSearch = this.writingModel[this.editType].title
          .replace(/\./gi, "")
          .replace(/[ ]/gi, "-")
          .toLowerCase();
        console.log('titleToSearch: ', this.titleToSearch);
      }
      // console.log('value: ', this.writingModel.general);
    },
    submit (type) {
      let form = {
        type: 'GENERAL',
        contentImages: this.imagesToUpload,
        ...
        this.writingModel.general
      };
      form.content = form.contentRaw;
      delete form.contentRaw;

      console.log('on submit()');
      console.log(form);
    }
  }
};
</script>

<style lang="scss" scoped>
#col-content {
  height: calc(100vh - 7em);
  overflow: auto;
  padding: 0;
  max-width: 100%;
  .select-post-type {
    opacity: 0.6;
    transition: opacity 0.5s;
    background: transparent !important;
    &:hover,
    &:focus {
      opacity: 1;
    }
  }
}
</style>
