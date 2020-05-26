<template>
  <transition name="item-fade">
    <v-row
      v-if="loaded"
      id="git-post"
      :class="[posName, hide ? 'hide' : '', intro ? 'intro' : '', 'detail']"
      no-gutters
    >
      <v-col class="fill-height">
        <transition name="item-fade">
          <div v-show="currentPage <= 1" class="post-cover" :class="['page-' + currentPage]">
            <img id="cover-bg" src="../assets/project_mask.jpg" />
            <img id="cover-fg" src="../assets/project-cover-sample.png" />
          </div>
        </transition>
        <v-carousel
          v-model="currentPage"
          height="100%"
          hide-delimiter-background
          :class="['page-' + currentPage]"
          class="overflow-y-auto"
        >
          <v-carousel-item key="0">
            <v-row class="overflow-hidden" style="height: calc(100% - 10em);">
              <v-col cols="1" />
              <v-col cols="auto" id="page-cover-header" class="text-right mt-5">
                <h5>Git Project</h5>
                <h2>{{ data.gitInfo["name"].toUpperCase().replace(/-/gi, ' ') }}</h2>
                <p>
                  <v-icon>mdi-github</v-icon>
                  {{ data.gitInfo["nameWithOwner"] }}
                </p>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="text-right">
                <v-btn text @click="currentPage = 1">See detail ></v-btn>
              </v-col>
            </v-row>
          </v-carousel-item>
          <v-carousel-item key="1">
            <v-row class="mt-5 pl-5" no-gutters>
              <v-col cols="9">
                <h2>Introducing, {{data["title"]}}</h2>
                <p class="mt-2">{{ data.gitInfo["description"] }}</p>
              </v-col>
            </v-row>
          </v-carousel-item>
          <v-carousel-item key="2" class="page-document">
            <v-row>
              <v-col class="ma-5 pa-5">
                <h2>README</h2>
                <vue-markdown>{{readme}}</vue-markdown>
              </v-col>
            </v-row>
          </v-carousel-item>
          <v-carousel-item key="3" class="page-document">
            <v-row>
              <v-col class="ma-5 pa-5">
                <h2>FILES</h2>
                <vue-markdown>{{data}}</vue-markdown>
              </v-col>
            </v-row>
          </v-carousel-item>
          <!-- <v-carousel-item v-for="(color, i) in colors" :key="color">
            <v-sheet class="fill-height" color="transparent" tile>
              <v-row class="fill-height" align="center" justify="center">
                <div class="display-3">Slide {{ i + 1 }}</div>
              </v-row>
            </v-sheet>
          </v-carousel-item>-->
        </v-carousel>
      </v-col>
    </v-row>
  </transition>
</template>

<script>
import { TestGitRepository, TestGitReadme } from '../queries/repo';
import {
  getImage,
} from "../queries/queryContents";
export default {
  name: "custom-git-post",
  props: {
    'position': Number,
    'post': Object,
    'intro': Boolean,
    'hide': Boolean
  },
  apollo: {
    readme: {
      client: "github",
      query () {
        return TestGitReadme
      },
      variables: {
        // owner: "100kimch",
        // name: "ros_galapagos_cormorant",
        owner: "team-inspired-by",
        name: "inspired-by"
      },
      update: data => data,
    },
    repo: {
      client: "github",
      query () {
        return TestGitRepository;
      },
      variables: {
        number_of_repos: 5,
        object_expression: "master:docs/"
      },
      update (data) {
        console.log("received repo: ", data.repository);
        this.data.gitInfo = data.repository;
        this.loaded = true;
        return data;
      }
    }
  },
  data () {
    const gitPostModel = Object.freeze({
      title: '',
      subtitle: '',
      postType: '',
      languages: '',
      author: {},
      thumbnail: {},
      topics: {},
      summary: '',
      numLikes: 0,
      gitInfo: {
        description: "",
        homepageUrl: "",
        licenseInfo: {},
        name: "",
        nameWithOwner: "",
        primaryLanguage: {},
      },
      createdAt: '',
      updatedAt: ''
    })
    return {
      loaded: false,
      showDetail: false,
      currentPage: 0,
      data: Object.assign({}, gitPostModel),
      colors: [
        'primary',
        'secondary',
        'yellow darken-2',
        'red',
        'orange',
      ],
      model: 0,
      parsedContent: [],
      images: [],
    }
  },
  mounted () {
    this.data = this.post
    setTimeout(() => {
      this.showDetail = true;
    }, 3000);
  },
  computed: {
    pageTo () {
      return this.$store.getters.getPageTo;
    },
    posName () {
      const posName = [
        'ttop',
        'top',
        'center',
        'bottom',
        'bbottom'
      ]
      return posName[this.position]
    },
    postDate () {
      if (this.data.publishedAt)
        return new Date(this.data.publishedAt).toDateString();
      return new Date().toDateString();
    },
    isLoggedIn () {
      return this.$store.getters.getIsLoggedIn;
      // TODO Check getLoginStatus is still available
      // return this.$store.getters.getLoginStatus;
    },
    userInfo () {
      return this.$store.getters.getUserInfo;
    },
    readme () {
      if (!this.$apollo.data.readme) return {}
      return this.$apollo.data.readme.repository.object.text
    },
    // repo () {
    //   if (!this.$apollo.data.repo) return {}
    //   return this.$apollo.data.repo
    // },
    documents () {
      if (!this.repo['object']) return []
      let files = this.repo.object.entries
      for (let i in files) {
        files[i]['format'] = files[i]['name'].split(".")[1]
      }
      console.log(files)
      return files
    }
  },
  watch: {
    pageTo: (newVal, oldVal) => {
      if (oldVal == 'post' && newVal != 'post') {
        this.showDetail = false;
        this.$store.commit('setSelectedPost', {});
      }
    },
    post (newVal) {
      console.debug("post: ", newVal);
      this.readGeneralPost(newVal.title)
      // if (!this.active) {
      //   this.active = true;
      // }
    },
    position (newVal, oldVal) {
      if (Math.abs(newVal - oldVal) >= 3) {
        console.warn("hidden position: ", newVal, oldVal);
        this.loaded = false;
      }
      if (newVal == 2 && this.parsedContent) {
        setTimeout(() => {
          this.loaded = true;
        }, 1000);
      }
    },
  },
  methods: {
    async parseContent (content) {
      // NOTE: This flow is in reverse order of stringifyContent()
      // this code is from Reviewer.vue but modified
      const contents = content.split("![insp-img");
      console.debug("on parseContent(): ", contents)
      let retContent = "";
      let retParsedContent = [];
      let retImages = [];

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
            retImages.push({
              side: false,
              ...res.data.getImage.file,
            });
            retParsedContent.push(temp1.slice(1).join(")"));
            retContent += '![' + res.data.getImage.file.alias + '](from attached)' + temp1.slice(1).join(")");
          } else {
            retImages.push({
              side: false
            });
            retParsedContent.push(temp1[0].slice(2).join(")"));
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
            retImages.push({
              side: true,
              ...res.data.getImage.file
            })
            console.warn("on images: ", retImages);
            retParsedContent.push(temp1.slice(1).join(")"));
            retContent += '![' + res.data.getImage.file.alias + ', side](from attached)' + temp1.slice(1).join(")");
            // this.$store.commit("updateImage")
            // image = {

            // }
            // this.$store.commit("imageToContent", image)
          } else {
            retImages.push({
              side: true
            })
            retParsedContent.push(temp1[0].slice(7));
            retContent += '![Unknown Image, side](' + temp1[0].slice(7) + ')';
          }
        }
        else {
          retParsedContent.push(temp1.join(")"));
          retContent += temp1.join(")");
        }
      }
      this.parsedContent = retParsedContent;
      this.images = retImages;
      return retContent;
    },

    login () {
      this.$store.commit("setPopupLogin", true);
    },
  }
}
</script>

<style lang="scss" scoped>
@keyframes intro {
  from {
    background: transparent;
    height: 9em;
    // opacity: 0;
  }
  50% {
    // border: 1px solid rgba(255, 255, 255, 0.7);
  }
  to {
    height: 80vh;
    border: 1px solid transparent;
    border-color: transparent;
    background: rgb(230, 230, 230);
    color: black;
    // opacity: 1;
  }
}
@keyframes intro-thumb {
  from {
    margin-top: -3em;
    margin-left: -7em;
  }

  to {
    margin-top: 0em;
    margin-left: 0em;
  }
}
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

#git-post {
  position: absolute;
  top: 130vh;
  right: 0;
  color: white;
  min-width: 37em;
  min-width: 37em;
  height: 80vh;
  transition: all 1s, top 1.5s;
  overflow-x: hidden;
  overflow-y: auto;
  border: 2px solid rgb(56, 50, 43);
  //   border: 2px solid rgba(255, 255, 255, 0.7);
  border-radius: 2em;
  background-size: cover;
  background-blend-mode: hue;
  will-change: top, transform;
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
  z-index: 400;

  &.detail {
    // min-width: 45vw;
    min-width: 50em;
    max-width: 50em;
    background: rgb(100, 100, 100);

    .img-box {
      width: 20vw;
      max-width: 15em;
      height: 25rem;
    }
  }

  &.ttop {
    // min-width: 60vw;
    // max-width: 60vw;
    transform: scale(0.9);
    top: 0vh;
    right: 1em;
    background: rgb(100, 100, 100);
    color: black;
    opacity: 0;
    filter: blur(5px);
    animation: fade-in 1s normal 2s;
    animation-fill-mode: forwards;
  }
  &.top {
    // min-width: 60vw;
    // max-width: 60vw;
    transform: scale(0.9);
    top: 29vh;
    right: 1em;
    background: rgb(100, 100, 100);
    color: black;
    filter: blur(5px);
  }
  &.bottom {
    // min-width: 60vw;
    // max-width: 60vw;
    transform: scale(0.9);
    top: 191vh;
    right: 1em;
    background: rgb(100, 100, 100);
    color: black;
    filter: blur(5px);
  }
  &.bbottom {
    // min-width: 60vw;
    // max-width: 60vw;
    transform: scale(0.9);
    top: 250vh;
    right: 2.5vw;
    background: rgb(100, 100, 100);
    color: black;
    opacity: 0;
    filter: blur(5px);
    animation: fade-in 1s normal 1s;
    animation-fill-mode: forwards;
  }

  &.center {
    top: 110vh;
    color: black;
    background: rgb(230, 230, 230);
    .img-box {
      img {
        opacity: 1;
      }
    }
    z-index: 450;
  }

  &.hide {
    &.center,
    &.top,
    &.bottom {
      top: 250vh;
    }
  }

  &.intro {
    opacity: 0;
  }
  &.intro.center {
    opacity: 1;
    animation-name: intro;
    animation-duration: 0.5s;
    animation-timing-function: ease-in;
    animation-delay: 3s;
    animation-fill-mode: forwards;
  }

  .post-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgb(56, 50, 43);
    overflow: hidden;
    z-index: 300;
    #cover-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      opacity: 0.3;
      object-fit: cover;
      object-position: 100%;
      mix-blend-mode: luminosity;
      transition: object-position 2s 0.5s;
      z-index: 500;
    }
    &.page-0 #cover-bg {
      object-position: 0%;
    }
    &.page-1 #cover-bg {
      object-position: 50%;
    }
    #cover-fg {
      position: absolute;
      margin-top: 25%;
      width: 100%;
      height: 75%;
      object-fit: cover;
      object-position: 100% 0%;
      transition: margin 2s;
      z-index: 510;
    }
    &.page-1 #cover-fg {
      margin-left: -40%;
    }
  }
  .v-carousel {
    z-index: 600;
    padding: 1em;
    &.page-0,
    &.page-1 {
      color: white;
    }
    #page-cover-header {
      font-size: x-large;
      color: white;
    }
  }
  // h4 {
  //   margin-top: 1.5rem;
  //   font-size: 1.4rem;
  // }
  // h2 {
  //   display: inline;
  //   font-size: 2.2rem;
  //   font-weight: 600;
  //   text-overflow: ellipsis;
  // }
  .img-box {
    display: block;
    float: left;
    width: 9em;
    height: 9em;
    margin: 0.5em 1em;
    border: 1px solid rgba(255, 255, 255, 0.7);
    border-radius: 2em;
    transition: margin 2s, width 1s, height 1s;
    overflow: hidden;
    &.thumb {
      margin-top: -1em;
      margin-left: -1em;
    }
    &.left {
      margin-left: -1em;
      float: left;
      clear: left;
    }
    &.right {
      margin-left: 1em;
      margin-right: -2em;
      float: right;
      clear: right;
    }
    img {
      width: 100%;
      height: 100%;
      opacity: 0.5;
      transition: opacity 1s;
      object-fit: cover;
    }
  }
}
</style>

<style lang="scss">
#git-post {
  .v-carousel {
    .v-window__prev,
    .v-window__next {
      .v-btn {
        display: block;
        height: 5em;
        background: #fff;
        box-shadow: inset 5px 5px 10px #d4d4d4, inset -5px -5px 10px #ffffff;
        margin-top: -1em;
        padding: 1em 0;
        color: black;
      }
    }
    .v-window__prev {
      margin-left: -1em;
      .v-btn {
        border-radius: 0 100% 100% 0;
      }
    }
    .v-window__next {
      margin-right: -1em;
      .v-btn {
        border-radius: 100% 0 0 100%;
      }
    }
    .page-document {
      .v-responsive__content {
        overflow-y: auto;
      }
    }
  }

  a {
    color: black;
    padding-left: 0.5em;
    padding-right: 0.5em;
    background: #b2e4e4 !important;
    caret-color: #b2e4e4 !important;
    text-decoration: none;
    border-radius: 1em;
    transition: background 0.5s, color 0.5s;
    &:hover {
      background: #139797 !important;
      color: white;
    }
  }

  li {
    p {
      display: inline;
    }
  }
  ul {
    list-style-position: inside;
  }

  .v-btn--contained {
    border-radius: 1em;
    box-shadow: none;
    transition: box-shadow 1s;
    &:hover {
      box-shadow: 4px 4px 12px #cfcdce, -4px -4px 12px #ffffff;
    }
  }

  code {
    color: #556;
  }
  &.ttop,
  &.top,
  &.bottom,
  &.bbottom,
  &.center.hide {
    a,
    code {
      background: rgb(100, 100, 100) !important;
      caret-color: rgb(100, 100, 100) !important;
    }
  }
  pre {
    code {
      display: inline-block;
      width: 100%;
      margin: 2em 0;
      padding: 1em;
      background: #ddd;
      border-radius: 1em;
      box-shadow: none;
      transition: box-shadow 0.5s;
      &:after {
        display: none;
      }
      &:hover {
        box-shadow: 10px 10px 20px #cfcdce, -10px -10px 20px #ffffff;
      }
    }
  }
  p > code {
    background: #ddd;
    box-shadow: none;
  }
}
</style>