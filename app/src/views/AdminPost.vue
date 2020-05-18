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
        <v-list class="fill-height" flat rounded>
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
            <v-subheader>Attached images</v-subheader>
            <v-row class="px-4">
              <v-col
                class="file-image pa-1 ma-1 text-center"
                :class="{ uploading: !val.registered }"
                cols="auto"
                :key="key"
                v-for="(val, key) in attachedImages"
                @click="imageToContent(val)"
              >
                <v-icon size="2em" class="upload ma-1" color="primary">mdi-progress-upload</v-icon>
                <img :src="val['image']['thumb']" />
              </v-col>
              <v-col
                class="file-image pa-2 ma-1 text-center"
                :class="{ expand: !attachedImages.length }"
                cols="auto"
                @click="openContentsManager()"
              >
                <v-icon size="1.9em" color="grey darken-2">mdi-plus</v-icon>
                <span>Add image</span>
              </v-col>
            </v-row>
            <v-subheader class="small">Press longer to delete</v-subheader>
            <v-subheader>Saved contents</v-subheader>
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
            <li style="font-size:small;" class="grey--text text--darken-3">
              Post layout and text-wrap styles may be vary in respect to user's
              devices
            </li>
          </div>

          <v-list-item-group v-if="!editType" v-model="selectedContentsEditorTopic" mandatory>
            <v-list-item class="mt-2" @click="viewType = 'Written'">
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
              @click="viewType = topic['name']"
            >
              <v-list-item-icon>
                <v-icon>mdi-alpha-{{ topic["name"][0].toLowerCase() }}-circle-outline</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="topic['name']"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>

      <v-col id="col-content" cols="12" sm="9" class="d-flex flex-column" :class="{ xs: isXs }">
        <transition name="item-fade" mode="out-in">
          <custom-writer
            v-if="editType == 'GENERAL' && !reviewing"
            v-model="writingModel.GENERAL"
            fillHeight
          />
          <custom-reviewer v-else-if="editType == 'GENERAL'" v-model="writingModel.GENERAL" />
          <v-row v-if="editType != 'GENERAL'" class="mx-0 flex-1" style="height: min-content;">
            <v-col cols="12" v-if="editType == 'GENERAL'" class="fill-height"></v-col>
            <v-col cols="12" v-if="editType == 'git'">
              <vue-code-highlight>
                // You have to extract the component from the module import {
                component as VueCodeHighlight } from 'vue-code-highlight';
                components:{ VueCodeHighlight, ... }
              </vue-code-highlight>
            </v-col>
            <v-col cols="12" v-else-if="editType == 'Success'" class="text-center">
              <div class="my-5">
                <v-icon size="5em" color="primary">mdi-check</v-icon>
              </div>
              <h2>Successfully {{(isPostLoaded) ? 'updated' : 'added'}} post.</h2>
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
                <custom-post-managing-card :data="val" :key="val['title']" v-for="(val) in posts" />
                <!-- <custom-post-card :data="val" :key="val['title']" v-for="(val, key) in posts" /> -->
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
                <v-icon class="mr-2">mdi-content-save-edit-outline</v-icon>Save
                Edit
              </v-btn>
              <v-btn
                class="mr-0"
                :loading="loading.checkPostTitle"
                outlined
                color="grey darken-2"
                @click="review(true)"
              >
                <v-icon class="mr-2">mdi-check</v-icon>Review post & publish
              </v-btn>
            </v-col>
            <v-col class="text-right" v-if="editType && editType != 'Success' && reviewing">
              <v-btn class="mr-2" outlined color="grey" @click="review(false)">
                <v-icon class="mr-2">mdi-chevron-left</v-icon>Edit
              </v-btn>

              <v-btn
                v-if="!isPostLoaded"
                class="mr-0"
                :loading="loading.publishPost"
                color="primary darken-4"
                @click="publish('GENERAL')"
              >
                <v-icon class="mr-2">mdi-check</v-icon>Publish Post
              </v-btn>

              <v-btn
                v-if="isPostLoaded"
                class="mr-0"
                :loading="loading.publishPost"
                color="primary darken-4"
                @click="publish('GENERAL')"
              >
                <v-icon class="mr-2">mdi-check</v-icon>Update Post
              </v-btn>
            </v-col>
          </transition>
        </v-row>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar.tempContent">
      Successfully saved temporary contents.
      <v-btn color="red" text @click="snackbar.tempContent = false">close</v-btn>
    </v-snackbar>
    <v-snackbar v-model="snackbar.checkPostTitle">
      Duplicated title. change the title to another
      <v-btn color="red" text @click="snackbar.checkPostTitle = false">close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { getTopic, getWrittenPosts, checkPostTitle, getGeneralPost, getImage } from "../queries/queryContents";
// import { TestGitQuery } from "../queries/repo";
import { addGeneralPost, updateGeneralPost } from "../queries/mutateContents";

export default {
  name: "AdminPost",
  component: () => {
    return [
      import("../components/Writer"),
      import("../components/Reviewer"),
      import("../components/PostManagingCard")
    ];
  },
  apollo: {
    topic: {
      client: "inspiredBy",
      fetchPolicy: 'no-cache',
      query () {
        return getTopic;
      },
      variables () {
        return {
          name: this.selectedTopic,
        };
      },
      skip () {
        return !this.selectedTopic;
      },
      update: (data) => {
        console.debug("getTopic on admin: ");
        console.debug(data);
        if (data["getTopic"] && data["getTopic"].success)
          return data.getTopic.topic;
        else if (data["getTopic"] && !data["getTopic"].success)
          console.warn(data.getTopic.message);
        else console.error("Unknown error occurred on updating getTopic()");
      },
    },
    writtenPosts: {
      client: "inspiredBy",
      fetchPolicy: 'no-cache',
      query () {
        return getWrittenPosts;
      },
      variables () {
        return {
          // topic: this.selectedTopic
        };
      },
      context () {
        return {
          headers: {
            authorization: 'Bearer ' + this.userInfo.accessToken
          }
        }
      },
      skip () {
        return this.viewType != 'Written'
      },
      update: (data) => {
        console.debug("getWrittenPosts on admin: ", data);
        if (data["getWrittenPosts"] && data["getWrittenPosts"].success)
          return data.getWrittenPosts.posts;
        else if (data["getWrittenPosts"] && !data["getWrittenPosts"].success)
          console.warn(data.getWrittenPosts.message);
      }
    }
  },
  data () {
    const defaultModels = Object.freeze({
      GENERAL: {
        title: "",
        content: "",
        contentRaw: "",
        thumbnailId: null,
        summary: "",
        publishedAt: "",
        deprecatedAt: "",
        topics: [],
        isPrivate: false,
      },
      book: {
        title: "",
        content: "",
        contentRaw: "",
      },
    });
    return {
      mode: "",
      editType: "",
      viewType: "Select",
      reviewing: false,
      selectedContentsEditorTopic: 0,
      titleToSearch: "",
      isPostLoaded: false, // set true when editing existing content
      loading: {
        checkPostTitle: false,
        publishPost: false,
      },
      snackbar: {
        checkPostTitle: false,
        tempContent: false,
      },
      writingTypes: [
        {
          postType: "General Post",
          key: "GENERAL",
          icon: "newspaper",
          description: "normal posts",
        },
        {
          postType: "Git Post",
          key: "git",
          icon: "git",
          description: "link your git project",
        },
        {
          postType: "Book Post",
          key: "book",
          icon: "book",
          description: "for book review",
        },
        {
          postType: "Series",
          key: "series",
          icon: "ballot",
          description: "sum up the posts",
        },
      ],
      writingModel: Object.assign({}, defaultModels)
    }
  },
  created () {
    window.addEventListener("beforeunload", this.save);
  },
  mounted () {
    const savedGeneral = JSON.parse(
      sessionStorage.getItem("inspired-by-general-post")
    );
    // const savedImagesToUpload = JSON.parse(
    //   sessionStorage.getItem("imagesToUpload")
    // );
    const savedAttachImages = JSON.parse(
      sessionStorage.getItem("inspired-by-attached-images")
    );
    console.debug("loaded generalPost: ", savedGeneral);
    if (savedGeneral != undefined) {
      this.writingModel.GENERAL = savedGeneral;
    }
    console.debug("loaded savedAttachImages: ", savedAttachImages);
    if (savedAttachImages != undefined) {
      this.$store.commit("loadImages", savedAttachImages);
    }
  },
  methods: {
    focus () {
      this.$scrollTo(document.querySelector("#config-box #col-content"), 1000, {
        offset: 100,
      });
    },
    imageToContent (file) {
      console.debug("file on imageToContent(): ", file);
      this.$store.commit("imageToContent", file);
    },
    openContentsManager () {
      this.$store.commit("setPopupContentsManager", true);
    },
    async loadPost (post) {
      if (post.postType === "GENERAL") {
        this.isPostLoaded = true;
        this.$apollo.query({
          client: "inspiredBy",
          fetchPolicy: 'no-cache',
          query: getGeneralPost,
          variables: {
            title: post.title,
          },
        })
          .then(async (res) => {
            console.debug("received getGeneralPost: ", res.data.getGeneralPost);
            const content = await this.parseContent(res.data.getGeneralPost.post.lastContent.content);
            // console.debug(`parsedContent: ${content}`);
            post.content = content;
            this.reviewing = false;
            this.editType = post.postType;
            for (let i in this.writingModel[post.postType]) {
              this.writingModel[post.postType][i] = post[i];
            }
          })
      }

    },
    save () {
      if (this.writingModel.GENERAL)
        sessionStorage.setItem(
          "inspired-by-general-post",
          JSON.stringify(this.writingModel.GENERAL)
        );
      // if (this.imagesToUpload)
      //   sessionStorage.setItem(
      //     "imagesToUpload",
      //     JSON.stringify(this.imagesToUpload)
      //   );
      if (this.attachedImages)
        sessionStorage.setItem(
          "inspired-by-attached-images",
          JSON.stringify(this.attachedImages)
        );
      console.debug("saved written data.");
      this.snackbar.tempContent = true;
    },
    async review (mode) {
      if (mode) {
        this.loading.checkPostTitle = true;
        this.titleToSearch = this.writingModel[this.editType].title
          .replace(/\./gi, "")
          .replace(/[ ]/gi, "-");
        console.debug("titleToSearch: ", this.titleToSearch);

        if (this.isPostLoaded) {
          this.loading.checkPostTitle = false;
          this.reviewing = true;
          return;
        }
        else {
          setTimeout(() => {
            this.loading.checkPostTitle = false;
          }, 3000);
        }

        await this.$apollo
          .query({
            client: "inspiredBy",
            query: checkPostTitle,
            variables: {
              title: this.titleToSearch,
            },
          })
          .then((res) => {
            console.debug("received checkPostTitle: ", res.data.checkPostTitle);
            this.loading.checkPostTitle = false;
            if (res.data.checkPostTitle.available) {
              this.reviewing = true;
            } else {
              this.snackbar.checkPostTitle = true;
            }
            // this.loading = false;
            // if (data.checkPostTitle.success) {
            // return data.checkPostTitle
            // this.reviewing = true;
            // }
          })
      } else {
        this.loading.checkPostTitle = false;
        this.reviewing = false;
      }
      // console.log('value: ', this.writingModel.GENERAL);
    },
    stringifyContent (content, contentImages) {
      // NOTE: This logic may be similar to contentToContentRaw in Reviewer.vue
      const contents = content.split(", side](from attached)");
      let retContent = "";
      for (let i in contents) {
        if (i != contents.length - 1) {
          let temp1 = contents[i].split("![");
          let name1 = temp1.pop()
          // TODO: should find a way to reduce loop counts.
          // let img1 = contentImages.filter(val => val.alias === name1)[0]
          let img1 = contentImages[name1]
          if (!img1) {
            console.warn("There is no image file when stringifyContent(), file:", name1)
          }
          let tag1 = '![insp-img-side](' + img1.registeredId + ')';
          for (let j in temp1) {
            let temp2 = temp1[j].split("](from attached)");
            let tag2 = '';
            if (temp2.length > 1) {
              let name2 = temp2[0];
              // let img2 = contentImages.filter(val => val.alias === name2)[0]
              let img2 = contentImages[name2]
              if (!img2) {
                console.warn("There is no image file when stringifyContent(), file:", name2)
              }
              tag2 = '![insp-img](' + img2.registeredId + ')' + temp2[1];
            } else if (temp2[0].includes('](')) {
              //NOTE: for normal image url
              tag2 = '![' + temp2[0];
            } else {
              //NOTE: no img tags found
              tag2 = temp2[0]
            }
            retContent += tag2;
          }
          retContent += tag1;
        } else {
          retContent += contents[i]
        }
      }
      return retContent;
    },
    async parseContent (content) {
      // NOTE: This flow is in reverse order of stringifyContent()
      const contents = content.split("![insp-img");
      console.debug("on parseContent(): ", contents)
      let retContent = "";
      for (let i in contents) {
        let temp1 = contents[i].split(")");
        if (temp1[0].startsWith("](")) {
          console.debug("image: ", temp1[0].slice(2));
          const res = await this.$apollo.query({
            query: getImage,
            variables: {
              id: temp1[0].slice(2)
            }
          });
          console.debug('res: ', res);
          if (res.data.getImage.success) {
            retContent += '![' + res.data.getImage.file.alias + '](from attached)' + temp1.slice(1).join(")");
          } else {
            retContent += '![Unknown Image](' + temp1[0].slice(2) + ')';
          }
        }
        else if (temp1[0].startsWith("-side](")) {
          console.debug("side image: ", temp1[0].slice(7));
          const res = await this.$apollo.query({
            client: "inspiredBy",
            query: getImage,
            variables: {
              id: temp1[0].slice(7)
            }
          })
          console.debug('res: ', res);
          if (res.data.getImage.success) {
            retContent += '![' + res.data.getImage.file.alias + ', side](from attached)' + temp1.slice(1).join(")");
            // this.$store.commit("updateImage")
            // image = {

            // }
            // this.$store.commit("imageToContent", image)
          } else {
            retContent += '![Unknown Image, side](' + temp1[0].slice(7) + ')';
          }
        }
        else {
          retContent += temp1.join(")");
        }
      }
      return retContent;
    },
    checkUploadStatus () {
      // TODO: Finish this
      return true
    },
    async publish (type) {
      this.loading.publishPost = true;
      const target = this.writingModel[type]

      if (!this.checkUploadStatus()) {
        this.loading.publishPost = false;
        return;
      };
      setTimeout(() => {
        this.loading.publishPost = false;
      }, 1000);

      let form = {
        ...target,
        publishedAt: target.publishedAt | new Date().getTime(),
        content: this.stringifyContent(target.content, this.attachedImages),
        topics: Array.from(target.topics, val => val.name).toString()
      };
      delete form.contentRaw

      console.debug("on publish()", form, this.attachedImages);

      if (this.isPostLoaded) {
        await this.$apollo
          .mutate({
            client: "inspiredBy",
            mutation: updateGeneralPost,
            variables: form,
            context: {
              headers: {
                authorization: "Bearer " + this.userInfo.accessToken,
              },
            },
          })
          .then((res) => {
            console.debug("updateGeneralPost(): ", res);
            this.editType = "Success"
          })
      } else {
        await this.$apollo
          .mutate({
            client: "inspiredBy",
            mutation: addGeneralPost,
            variables: form,
            context: {
              headers: {
                authorization: "Bearer " + this.userInfo.accessToken,
              },
            },
          })
          .then((res) => {
            console.debug("addGeneralPost(): ", res);
            this.editType = "Success"
          })
      }
    },
    resetForm (type = "GENERAL") {
      if (type = "GENERAL") {
        this.writingModel.GENERAL = {};
        this.reviewing = false;
        for (let i in this.loading) {
          this.loading[i] = false;
        }
      }
    }
  },
  computed: {
    topic () {
      return this.$store.getters.getTopic;
    },
    topicList () {
      return this.$store.getters.getTopicList;
    },
    posts () {
      if (this.viewType == "Written")
        return this.$apolloData.data.writtenPosts;
      if (!this.$apolloData.data["topic"]) return {};
      return this.$apolloData.data.topic.posts;
    },
    selectedTopic () {
      return this.viewType == "Select" || this.viewType == "Written"
        ? ""
        : this.viewType;
    },
    isXs () {
      return this.$vuetify.breakpoint.xs;
    },
    isPostEditing () {
      return this.$store.getters.getIsPostEditing;
    },
    attachedImages () {
      return this.$store.getters.getAttachedImages;
    },
    userInfo () {
      return this.$store.getters.getUserInfo;
    },
    numberEditRequest () {
      return this.$store.getters.getNumberEditRequest;
    }
  },
  watch: {
    viewType (newVal) {
      if (newVal) {
        this.mode = "view";
        this.editType = "";
        this.isPostLoaded = false;
      }
    },
    editType (newVal, oldVal) {
      if (newVal && !oldVal) {
        this.mode = "edit";
        this.viewType = "";
        document.getElementsByTagName("html")[0].style.overflowY = "hidden";
        this.$store.commit("setIsPostEditing", true);
      } else {
        document.getElementsByTagName("html")[0].style.overflowY = "auto";
      }
    },
    isPostEditing (newVal, oldVal) {
      console.log("on watch isPostEditing:", newVal, oldVal);
      if (!newVal && oldVal) {
        this.editType = "Success";
      }
    },
    numberEditRequest (newVal) {
      if (this.editType) return;

      this.save();
      const post = this.$store.getters.popEditRequest;
      console.debug('edit request popped.', post);
      if (newVal > 0)
        this.loadPost(post)
    }
    // imagesToUpload (newVal) {
    //   this.writingModel.GENERAL.contentImages = newVal;
    //   this.writingModel.book.contentImages = newVal;
    // }
    // _attachedImages: {
    //   deep: true,
    //   handler(newVal) {
    //     console.warn("watched attachedImages", newVal);

    //     // this.attachedImages.push()
    //   },
    // },
  },
};
</script>

<style lang="scss" scoped>
#col-content {
  height: calc(100vh - 7em);
  overflow: auto;
  overflow-x: hidden;
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
