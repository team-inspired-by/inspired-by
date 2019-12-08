<template>
  <div>
    <transition appear name="page-move">
      <v-container v-show="show" id="body-container" class="pb-0">
        <v-row>
          <v-carousel
            id="head-banner"
            class="mb-5"
            :show-arrows="false"
            hide-delimiters
            :height="carouselHeight"
          >
            <!-- <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item> -->
            <v-carousel-item>
              <v-row
                class="overflow-hidden"
                :height="isCarouselOpen ? 0 : carouselHeight"
              >
                <v-col cols="12" sm="8" class="px-5 serif">
                  <div
                    class="d-inline-block float-left"
                    style="width: 4.6em; height: 100%;"
                  ></div>
                  <div>
                    <h1 class="align-self-end font-weight-medium">
                      See Chromized livestream
                    </h1>
                    <p>see livestream that are chromized livestream</p>
                    <p>
                      <v-btn
                        class="ma-0"
                        outlined
                        color="white"
                        @click="expandCarousel()"
                        >Turn on livestream</v-btn
                      >
                    </p>
                  </div>
                </v-col>
                <v-col cols="12" sm="4">
                  <img
                    width="90%"
                    height="250"
                    src="https://picsum.photos/200/300?grayscale"
                  />
                  <!-- <input type="file" accept="video/*;capture=camcorder"> -->
                </v-col>
              </v-row>
              <v-row
                class="overflow-hidden"
                :height="isCarouselOpen ? 0 : carouselHeight"
              >
                <div>
                  <!-- <video
                  ref="video"
                  id="video"
                  width="640"
                  height="480"
                  autoplay
              ></video>-->
                  <!-- <input type="file" accept="image/*;capture=camera"> -->
                  <!-- <input type="file" accept="video/*;capture=camcorder" /> -->
                  <video ref="video" id="video" autoplay></video>
                </div>
                <div>
                  <button id="snap" v-on:click="capture()">Snap Photo</button>
                </div>
                <canvas
                  ref="videoCanvas"
                  id="videoCanvas"
                  width="640"
                  height="480"
                ></canvas>
                <ul>
                  <li :key="c" v-for="c in videoCaptures">
                    <img v-bind:src="c" height="50" />
                  </li>
                </ul>
              </v-row>
            </v-carousel-item>
          </v-carousel>
        </v-row>
        <v-row class="bubble-box">
          <v-col id="category-box" cols="12" sm="4">
            <v-select
              :items="sortType"
              label="Bubbles sorted by"
              solo
              flat
              hide-details
            ></v-select>
            <div class="timeline-box">
              <v-timeline dense>
                <v-timeline-item
                  :key="key"
                  :color="key % 2 == 0 ? 'pink' : 'teal lighten-3'"
                  class="py-5"
                  v-for="(category, key) in categories"
                  small
                >
                  <strong>{{ category }}</strong>
                  <p>Lorem ipsum dolor sit amet.</p>
                </v-timeline-item>
              </v-timeline>
            </div>
          </v-col>
          <v-col cols="12" sm="8">
            <v-sheet id="contents-box" class="overflow-y-auto text-center">
              <v-card
                class="inspiration-card"
                :class="['ma-' + content.level]"
                :key="content.id"
                :style="{
                  'max-width': content.level * 2 + 4 + 'em',
                  'max-height': content.level * 2 + 4 + 'em'
                }"
                color="#aaaaaa33"
                dark
                ripple
                v-for="content in contents"
                @click="content.minimized = !content.minimized"
              >
                <v-card-text
                  class="keyword headline font-weight-bold"
                  :class="{ minimized: content.minimized }"
                  :style="{
                    'line-height': content.level * 2 + 1 + 'em'
                  }"
                >
                  {{
                    content.description.split(" ")[
                      Math.floor(Math.random() * 20, 20)
                    ]
                  }}
                </v-card-text>

                <v-card-text class="headline font-weight-bold">
                  {{ content.description }}
                </v-card-text>

                <v-card-actions>
                  <v-list-item class="grow">
                    <!-- <v-list-item-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
                </v-list-item-avatar>-->

                    <v-list-item-content>
                      <v-list-item-title>2019-11-28</v-list-item-title>
                    </v-list-item-content>

                    <v-row align="center" justify="end">
                      <v-btn text color="primary" @click="alert('hi')"
                        >More2</v-btn
                      >
                    </v-row>
                  </v-list-item>
                </v-card-actions>
              </v-card>
            </v-sheet>
          </v-col>
        </v-row>
        <v-row class="subheader-box">
          <v-col class="pt-0 mt-0" cols="12">
            <div class="leftside edge"></div>
            <div id="title-recent-issues">
              <span>Recent Issues</span>
            </div>
            <div class="rightside edge"></div>
          </v-col>
        </v-row>
        <v-row class="issue-box pb-0">
          <v-col class="py-0">
            <v-item-group class="pa-5">
              <v-card :key="key" v-for="key in [1, 2, 3]" class="mb-4">
                <v-row class="px-5">
                  <v-col cols="12" sm="4">
                    <img
                      width="100%"
                      src="https://picsum.photos/200/300?grayscale"
                    />
                  </v-col>
                  <v-col cols="12" sm="8">
                    <v-subheader>
                      <h5 class="mr-3">github</h5>
                      <h3>Lorem ipsum dolor sit amet.</h3>
                    </v-subheader>

                    <v-divider></v-divider>
                    <v-card-text
                      >Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Enim reiciendis recusandae eaque, facere nesciunt
                      quibusdam suscipit ipsam nisi sequi explicabo ducimus
                      itaque, illo harum cumque repellat inventore aperiam unde
                      incidunt!</v-card-text
                    >
                    <v-divider></v-divider>

                    <v-row>
                      <v-btn text color="primary" @click="routeTo('more')"
                        >More2</v-btn
                      >
                    </v-row>
                  </v-col>
                </v-row>
              </v-card>
            </v-item-group>
          </v-col>
        </v-row>
        <v-row class="copyright-box align-center">
          <v-card flat class="ma-1 pa-0 mt-0">
            <v-card-text class="px-3 py-1">2020 ⓒ KJHRicky</v-card-text>
          </v-card>
        </v-row>
      </v-container>
    </transition>
    <v-container v-if="!show">
      <v-lazy :options="{ threshold: 0.5 }" min-width="100" transition="loader">
        <v-row>
          <v-skeleton-loader
            :loading="nextPageLoading"
            transition="page-move"
            type="article"
            width="100%"
          >
            <v-card>
              <v-card-title>Title</v-card-title>
              <v-card-text>Card Text</v-card-text>
              <v-card-text>Card Text</v-card-text>
              <v-card-text>Card Text</v-card-text>
            </v-card>
          </v-skeleton-loader>
        </v-row>
      </v-lazy>
    </v-container>
  </div>
</template>

<script>
import gql from "graphql-tag";
import { RecentRepo, RecentRepo2, Topics } from "../queries/repo";
import * as easings from "vuetify/es5/services/goto/easing-patterns";

export default {
  name: "HelloWorld",
  apollo: {
    clients: {
      query() {
        return Topics;
      },
      update: data => data
    }
  },
  data: () => ({
    show: false,
    nextPageLoading: true,
    isCarouselOpen: false,
    carouselHeight: 250,
    sortType: ["Recent", "Keywords", "Views"],
    categories: [
      "2019-04-21",
      "2019-05-02",
      "2019-07-02",
      "2019-07-07",
      "2019-08-02",
      "2019-09-17"
    ],
    isVideoPlaying: false,
    video: {},
    videoCanvas: {},
    videoCaptures: [],
    contents: [
      {
        id: "1",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true,
        level: 2
      },
      {
        id: "2",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true,
        level: 5
      },
      {
        id: "3",
        title: "테스트",
        description:
          "'Turns out semicolon - less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true,
        level: 4
      },
      {
        id: "4",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true,
        level: 1
      },
      {
        id: "5",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true,
        level: 3
      },
      {
        id: "6",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true,
        level: 4
      },
      {
        id: "7",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true,
        level: 2
      },
      {
        id: "8",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true,
        level: 5
      },
      {
        id: "9",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true,
        level: 2
      }
    ]
  }),
  computed: {
    topic() {
      return this.$store.getters.getTopic;
    },
    isMain() {
      return this.$store.getters.getIsMain;
    },
    sampleText() {
      console.log("client", this.clients);
      // if (this.client.viewer.properties[0].name != '') {
      //   return this.client.viewer.properties[0].name
      // }
      if (this.clients) return this.clients;
      return "";
    }
  },
  mounted() {
    console.log(this.sample);
    this.show = true;
    this.video = this.$refs.video;
    // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //   navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    //     console.log(stream);
    //     // this.video.src = window.URL.createObjectURL(stream);
    //     this.video.src = HTMLMediaElement.srcObject = stream;
    //     // this.video.play();
    //   });
    // }

    function hasGetUserMedia() {
      return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    }

    if (hasGetUserMedia()) {
      // Good to go!
    } else {
      alert("getUserMedia() is not supported by your browser");
    }
  },
  methods: {
    expandTopic() {
      this.expand = !this.expand;
    },
    expandCarousel() {
      this.isCarouselOpen = !this.isCarouselOpen;
      if (this.isCarouselOpen) {
        this.carouselHeight = 700;
      } else {
        this.carouselHeight = 250;
      }
    },
    capture() {
      this.videoCanvas = this.$refs.videoCanvas;
      var videoCanvas = this.videoCanvas
        .getContext("2d")
        .drawImage(this.video, 0, 0, 640, 480);
      this.videoCaptures.push(videoCanvas.toDataURL("image/png"));
      // this.videoCaptures.push(videoCanvas.toDataURL("image/webp"));
    },
    playVideo() {
      navigator.mediaDevices
        .getUserMedia({ video: this.isVideoPlaying })
        .then(stream => {
          console.log(stream, this.$refs.video);
          this.video.srcObject = stream;
        });
    },
    beforeLeave() {
      // alert('hi')
    },
    routeTo(path) {
      this.show = false;
      // this.$vuetify.goTo("#head-banner", {
      //   duration: 400,
      //   offset: 2,
      //   easing: "easeInOutCubic"
      // });
      setTimeout(() => {
        this.$router.push(path);
      }, 2000);
    }
  }
};
</script>

<style lang="scss">
#body-container {
  .serif {
    font-family: "Times New Roman", Times, serif !important;
  }
  #head-banner {
    margin-top: -1em;
    width: 900px;
    img {
      position: absolute;
      top: -4em;
    }
  }
  .bubble-box {
    padding-bottom: 0;
    margin-bottom: 0;
    overflow-x: hidden;
    #category-box {
      display: flex;
      flex-direction: column;
      padding-bottom: 0;
      max-height: 500px;
      overflow-x: hidden;
      .v-input {
        flex: none;
        .v-input__slot {
          background-color: rgba(100, 100, 100, 0.5);
        }
      }
      .timeline-box {
        display: flex;
        flex-direction: column;
        flex: 1;
        min-width: 30vw;
        overflow-y: scroll;
        .v-timeline {
          flex: 1;
        }
      }
    }

    #contents-box {
      height: 55vh;
      overflow: scroll;
      padding: 1em 0 1em 3em;
      background-color: transparent;
      // background-color: rgba(100, 100, 100, 0.5);
      .inspiration-card {
        display: inline-block;
        overflow: hidden;
        transition: max-width 1s, max-height 1s, margin 1s, border-radius 0.5s;
        text-overflow: ellipsis;
        max-width: 20em;
        max-height: 20em;
        border-radius: 50% !important;
        align-self: center;
        &.minimized {
          text-align: center;
          max-width: 7em;
          max-height: 7em;
        }
        .keyword {
          overflow: hidden;
          transition: max-width 1s, max-height 1s, padding 1s;
          max-width: 0;
          max-height: 0;
          padding: 0;
          &.minimized {
            max-width: 20em;
            min-height: 7em;
            max-height: 7em;
            line-height: 4.5em;
          }
        }
      }
    }
  }
  .subheader-box {
    .col {
      display: flex;
      margin-top: -2em;
      margin-bottom: 1.1em;
      .edge {
        display: block;
        width: 2em;
        height: 2em;
        // margin-top: -0.9em;
        // margin-bottom: -2em;
        border: 2px solid rgba(255, 255, 255, 0.12);
        &.leftside {
          margin-left: 2.95em;
          border-top: none;
          border-right: none;
          border-bottom-left-radius: 2em;
        }
        &.rightside {
          position: relative;
          top: calc(2em - 2px);
          border-bottom: none;
          border-left: none;
          border-top-right-radius: 2em;
        }
      }
      #title-recent-issues {
        flex: 1;
        text-align: center;
        padding-top: 0;
        border-bottom: 2px solid rgba(255, 255, 255, 0.12);
        span {
          position: relative;
          top: 0.9em;
          color: #ccc;
          font-size: large;
          padding: 0 10px;
        }
      }
    }
  }
  .issue-box {
    padding-left: 1.5em;
    .v-item-group {
      border-right: 2px solid rgba(255, 255, 255, 0.12);
      .v-card {
        background-color: rgba(100, 100, 100, 0.5);
        img {
          object-fit: cover;
          max-height: 14em;
        }
      }
    }
  }
  .copyright-box {
    display: flex;
    align-items: right;
    flex-direction: row-reverse;
  }
}
#skeleton-loader {
  position: relative;
}
</style>
