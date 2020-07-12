<template>
  <div>
    <v-card
      id="new-post-cover"
      :class="['type-'+key, (value && value == key) ? 'highlight-mode' : '', (value && value != key) ? 'hide-mode' : '', editMode ? 'edit-mode' : '']"
      flat
      :ripple="false"
      @click="selectAddPostBox(key)"
    >
      <v-row class="text-center">
        <transition name="item-fade">
          <v-col v-show="true" class="add-post-logo-box overflow-hidden pa-0" cols="12">
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
              v-model="writingModel.GIT.title"
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
                  :color="active ? 'grey lighten-2' : 'blue darken-1'"
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
          <v-col cols="12">
            <v-btn @click="closeAddPostBox" color="transparent" :ripple="false">
              <v-icon class="mr-2">mdi-arrow-left</v-icon>Go back
            </v-btn>
            <v-btn
              v-if="writingModel.GIT.title"
              @click="editMode=true"
              color="transparent"
              :ripple="false"
            >
              Next
              <v-icon class="ml-2">mdi-arrow-right</v-icon>
            </v-btn>
          </v-col>
        </template>
        <template v-if="key=='GENERAL'">
          <v-col class="mx-5">
            <h5>Write a title:</h5>
            <v-text-field
              v-model="writingModel.GENERAL.title"
              label="Any title to be posted"
              single-line
              solo
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-btn @click="closeAddPostBox" color="transparent" :ripple="false">
              <v-icon class="mr-2">mdi-arrow-left</v-icon>Go back
            </v-btn>
            <v-btn
              v-if="writingModel.GENERAL.title"
              @click="checkPostTitle()"
              color="transparent"
              :ripple="false"
              :loading="loading.checkPostTitle"
            >
              Next
              <v-icon class="ml-2">mdi-arrow-right</v-icon>
            </v-btn>
          </v-col>
        </template>
      </v-row>
    </v-card>
    <v-card id="new-post-back" :class="['type-'+key, editMode ? 'edit-mode' : '']">
      <v-row no-gutters>
        <!-- <v-col id="col-list" cols="12" sm="12">
          <v-btn @click="closeAddPostBox" color="transparent" :ripple="false">
            <v-icon class="mr-2">mdi-arrow-left</v-icon>Go back
          </v-btn>
          <v-subheader>Attached Images</v-subheader>
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
        </v-col>-->
        <v-col id="col-content" cols="12" sm="12" class="d-flex flex-column" :class="{ xs: isXs }">
          <transition name="item-fade" mode="out-in">
            <custom-writer v-if="!reviewingMode" v-model="writingModel[key]" fillHeight />
            <custom-reviewer v-else v-model="writingModel[key]" />
          </transition>
          <v-row class="mx-0 flex-0 flex-grow-0">
            <v-col v-if="!reviewingMode" class="text-right">
              <v-btn class="mr-2" @click="closeAddPostBox" outlined color="grey">
                <v-icon class="mr-2">mdi-cancel</v-icon>Discard
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
            <v-col v-else class="text-right">
              <v-btn class="mr-2" outlined color="grey" @click="review(false)">
                <v-icon class="mr-2">mdi-chevron-left</v-icon>Edit
              </v-btn>
              <v-btn
                class="mr-0"
                :loading="loading.publishPost"
                color="primary darken-4"
                @click="publish()"
              >
                <v-icon class="mr-2">mdi-check</v-icon>Publish Post
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
    <v-snackbar v-model="snackbar.checkPostTitle">
      Duplicated title. change the title to another
      <v-btn color="red" text @click="snackbar.checkPostTitle = false">close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { getRepositories } from "../queries/repo";
import { getTopic, checkPostTitle, getImage } from "../queries/queryContents";
import { addGeneralPost } from "../queries/mutateContents";

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
      GIT: {
        title: ""
      },
      BOOK: {
        title: "",
        content: "",
        contentRaw: "",
      },
    });
    return {
      editMode: false,
      reviewingMode: false,
      loading: {
        checkPostTitle: false,
        publishPost: false
      },
      snackbar: {
        checkPostTitle: false,
      },
      writingModel: Object.assign({}, defaultModels)
    }
  },
  computed: {
    key () {
      return this.$vnode.key;
    },
    topic () {
      return this.$store.getters.getTopic;
    },
    topicList () {
      return this.$store.getters.getTopicList;
    },
    isXs () {
      return this.$vuetify.breakpoint.xs;
    },
    userInfo () {
      return this.$store.getters.getUserInfo;
    },
    attachedImages () {
      return this.$store.getters.getAttachedImages;
    },
  },
  created () {
    window.addEventListener("beforeunload", this.save);
  },
  mounted () {
    const savedGeneral = JSON.parse(
      sessionStorage.getItem("inspired-by-general-post")
    );
    const savedAttachedImages = JSON.parse(
      sessionStorage.getItem("inspired-by-attached-images")
    );
    console.debug("loaded generalPost: ", savedGeneral);
    if (savedGeneral != undefined) {
      this.writingModel.GENERAL = savedGeneral;
    }
    console.debug("loaded savedAttachedImages: ", savedAttachedImages);
    if (savedAttachedImages != undefined) {
      this.$store.commit("loadImages", savedAttachedImages);
    }

  },
  methods: {
    selectAddPostBox (key) {
      this.$emit("input", key);
    },
    closeAddPostBox (e) {
      this.editMode = false;
      this.$emit("input", "");
      e.stopPropagation();
    },
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
    async checkPostTitle () {
      this.loading.checkPostTitle = true;
      setTimeout(() => {
        this.loading.checkPostTitle = false;
      }, 3000);

      this.titleToSearch = this.writingModel.GENERAL.title
        .replace(/\./gi, "")
        .replace(/[ ]/gi, "-")
        .toLowerCase();
      console.debug("titleToSearch: ", this.titleToSearch);
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
            this.editMode = true;
          } else {
            this.snackbar.checkPostTitle = true;
          }
        })
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
        this.titleToSearch = this.writingModel[this.key].title
          .replace(/\./gi, "")
          .replace(/[ ]/gi, "-")
          .toLowerCase();
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
              this.reviewingMode = true;
            } else {
              this.snackbar.checkPostTitle = true;
            }
          })
      } else {
        this.loading.checkPostTitle = false;
        this.reviewingMode = false;
      }
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
    async publish () {
      this.loading.publishPost = true;
      const target = this.writingModel[this.key]

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
}
</script>

<style lang="scss" scoped>
@keyframes new-post-back-intro {
  to {
    top: 110vh;
    right: 0;
    width: 85vw;
    height: 85vh;
  }
}

#new-post-cover {
  position: absolute;
  top: 130vh;
  width: 22em;
  height: 22em;
  transition: all 0.5s;
  overflow-x: hidden;
  overflow-y: hidden;
  color: white;
  border: 2px solid transparent;
  // border: 2px solid rgba(100, 100, 100, 0.7);
  border-radius: 2em !important;
  z-index: 150;
  &.type-SERIES {
    top: calc(130vh - 7em);
    right: 5em;
    transform: scale(0.55);
    background: linear-gradient(-45deg, rgb(211, 180, 4), rgb(216, 188, 94));
  }
  &.type-GENERAL {
    top: calc(130vh + 11em);
    right: 5em;
    transform: scale(0.78);
    background: linear-gradient(-45deg, rgb(83, 4, 211), rgb(131, 94, 216));
  }
  &.type-GIT {
    top: calc(130vh - 10em);
    right: 24em;
    transform: scale(0.7);
    background: linear-gradient(-45deg, rgb(4, 101, 211), rgb(94, 157, 216));
  }
  &.type-BOOK {
    top: calc(130vh + 7em);
    right: 23em;
    transform: scale(0.5);
    background: linear-gradient(-45deg, rgb(4, 145, 211), rgb(94, 167, 216));
  }
  .add-post-logo-box {
    transition: height 0.5s;
    height: 14em;
    .v-icon {
      mix-blend-mode: overlay;
    }
  }
  .add-post-input-box {
    height: 100%;
    // background: rgba(255, 255, 255, 0.1);
    backdrop-filter: brightness(0.9);
    border-radius: 2em 2em 0 0;
    // mix-blend-mode: overlay;
    h5 {
      padding-left: 1em;
      padding-right: 1em;
      line-height: 200%;
      color: #bbb;
    }
  }
  &.hide-mode {
    filter: blur(5px);
    z-index: 151;
  }
  &.highlight-mode {
    cursor: default;
    margin-top: -1em;
    margin-left: -1em;
    z-index: 152;
    transform: scale(1);
  }
  &.edit-mode {
    transition: transform 0.25s;
    transform: rotateY(90deg);
  }
  &.non-edit-mode {
    filter: blur(10px);
    &.type-SERIES {
      top: calc(130vh - 6em);
      right: 6em;
      transform: scale(0.55);
    }
    &.type-GENERAL {
      top: calc(130vh + 12em);
      right: 6em;
      transform: scale(0.78);
    }
    &.type-GIT {
      top: calc(130vh - 11em);
      right: 25em;
      transform: scale(0.7);
    }
    &.type-BOOK {
      top: calc(130vh + 8em);
      right: 24em;
      transform: scale(0.5);
    }
  }
  &.highlight-mode .add-post-logo-box {
    height: 0;
  }
  &.edit-mode {
    transform: rotateY(90deg);
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
}
#new-post-back {
  position: absolute;
  top: 130vh;
  width: 22em;
  height: 22em;
  cursor: default;
  margin-top: -1em;
  margin-left: -1em;
  overflow-x: hidden;
  overflow-y: hidden;
  color: #111;
  border: 2px solid transparent;
  border-radius: 2em !important;
  background: rgba(255, 255, 255, 0.22);
  backdrop-filter: blur(10px);
  transition: transform 0.25s 0.25s;
  transition-timing-function: ease-out;
  transform: rotateY(270deg);
  z-index: 155;
  &.type-SERIES {
    top: calc(130vh - 7em);
    right: 5em;
  }
  &.type-GENERAL {
    top: calc(130vh + 11em);
    right: 5em;
  }
  &.type-GIT {
    top: calc(130vh - 10em);
    right: 24em;
  }
  &.type-BOOK {
    top: calc(130vh + 7em);
    right: 23em;
  }
  &.edit-mode {
    transform: rotateY(360deg);
    animation: new-post-back-intro 0.5s ease 0.5s;
    animation-fill-mode: forwards;
  }
}
</style>

<style lang="scss">
#new-post-cover,
#new-post-back {
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
}
#new-post-cover {
  .v-text-field {
    border-radius: 1em;
    &.v-text-field.v-text-field--enclosed > .v-input__control > .v-input__slot {
      background: transparent;
      box-shadow: inset 5px 5px 10px #333, inset -5px -5px 10px #555;
      padding-left: 1.5em;
      padding-right: 1.5em;
    }
  }
  &.type-GENERAL {
    .v-btn--contained {
      &:hover {
        box-shadow: 5px 5px 10px #45265e, -5px -5px 10px #6e2db6;
      }
    }
    .v-text-field.v-text-field--enclosed > .v-input__control > .v-input__slot {
      box-shadow: inset 5px 5px 10px #45265e, inset -5px -5px 10px #6e2db6;
    }
  }
}
#new-post-back {
  & > .row {
    height: 100%;
    overflow: auto;
  }
  #col-list,
  #col-content {
    color: rgb(30, 30, 30);
  }
  #col-content {
    overflow: auto;
    background: rgba(230, 230, 230, 1) !important;
    border-radius: 2em;
    .col-header {
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

  .file-image {
    width: 3em;
    height: 3em;
    border-radius: 1rem;
    border: 1px solid rgba(100, 100, 100, 0.22);
    cursor: pointer;
    transition: background 0.5s, opacity 0.5s;
    .upload {
      display: none;
    }
    &.detail {
      width: 8em;
      height: 8em;
    }
    &.detail-thumbnail {
      width: 8em;
      height: 12em;
    }
    &.selector {
      img {
        transition: opacity 0.5s;
        &.v-item--active {
          opacity: 1;
        }
        &:not(.v-item--active) {
          opacity: 0.5;
        }
      }
      &.select-reverse img {
        &.v-item--active {
          opacity: 0.5;
        }
        &:not(.v-item--active) {
          opacity: 1;
        }
      }
    }
    &.uploading {
      .upload {
        position: absolute;
        z-index: 160;
      }
      img {
        opacity: 0.2;
        filter: grayscale(1);
      }
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
</style>