<template>
  <v-container>
    <v-app-bar
      v-show="!isMain"
      color="#303030aa"
      scroll-target="#contents-box"
      dark
      flat
      shrink-on-scroll
      prominent
    >
      <!-- <template v-slot:img="{ props }">
        <v-img v-bind="props" gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"></v-img>
      </template>-->
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->
      <v-btn icon @click="$router.back()">
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
    <v-container>
      <v-row>
        <v-carousel
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
              <v-col
                cols="12"
                sm="8"
                class="px-5 serif"
                style="padding-top: 3em;"
              >
                <div
                  class="d-inline-block float-left"
                  style="width: 4em; height: 100%;"
                ></div>
                <div class="ml-5 pt-5">
                  <h1 class="align-self-end font-weight-medium">
                    See Chromized livestream
                  </h1>
                  <p>see livestream that are chromized livestream</p>
                  <v-btn
                    class="ma-0"
                    outlined
                    color="white"
                    @click="expandCarousel()"
                    >Turn on livestream</v-btn
                  >
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
                ></video> -->
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
        <v-col cols="12" sm="4">
          <div id="category-box" max-height="50vh">
            <v-select
              :items="sortType"
              label="Bubbles sorted by"
              solo
              flat
              hide-details
            ></v-select>
            <v-timeline dense>
              <v-timeline-item
                :key="key"
                :color="key % 2 == 0 ? 'pink' : 'teal lighten-3'"
                class="py-5"
                v-for="(category, key) in categories"
                small
              >
                <strong>{{ category }}</strong>
                <p>This is the time we'd prefer the dream not just money</p>
              </v-timeline-item>
            </v-timeline>
          </div>
        </v-col>
        <v-col cols="12" sm="8">
          <v-sheet
            id="contents-box"
            class="d-flex justify-space-between flex-wrap overflow-y-auto pa-5"
            max-height="50vh"
          >
            <v-card
              class="inspiration-card mx-auto mb-5"
              :class="{ minimized: content.minimized }"
              :key="content.id"
              color="#aaaaaa33"
              dark
              ripple
              v-for="content in contents"
              @click="content.minimized = !content.minimized"
            >
              <!-- <v-card-title>
          <v-icon large left>mdi-twitter</v-icon>
          <span class="title font-weight-light">Twitter</span>
              </v-card-title>-->

              <v-card-text
                class="keyword headline font-weight-bold"
                :class="{ minimized: content.minimized }"
              >
                {{
                  content.description.split(" ")[
                    Math.floor(Math.random() * 20, 20)
                  ]
                }}
              </v-card-text>

              <v-card-text class="headline font-weight-bold">{{
                content.description
              }}</v-card-text>

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
                    <v-btn text color="primary" @click="$router.push('more')"
                      >More</v-btn
                    >
                  </v-row>
                </v-list-item>
              </v-card-actions>
            </v-card>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",
  data: () => ({
    isCarouselOpen: false,
    carouselHeight: 300,
    sortType: ["Recent", "Keywords", "Views"],
    categories: [
      "2019-04-21",
      "2019-05-02",
      "2019-07-02",
      "2019-07-07",
      "2019-08-02",
      "2019-09-17"
    ],
    playVideo: false,
    video: {},
    videoCanvas: {},
    videoCaptures: [],
    contents: [
      {
        id: "1",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true
      },
      {
        id: "2",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true
      },
      {
        id: "3",
        title: "테스트",
        description:
          "'Turns out semicolon - less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true
      },
      {
        id: "4",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true
      },
      {
        id: "5",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true
      },
      {
        id: "6",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true
      },
      {
        id: "7",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true
      },
      {
        id: "8",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true
      },
      {
        id: "9",
        title: "테스트",
        description:
          "'Turns out semicolon- less style is easier and safer in TS because most gotcha edge cases are type invalid as well.'",
        minimized: true
      }
    ]
  }),
  created() {
    for (let i in this.topics) {
      this.topics[i]["top"] = this.randomPosY() + "vh";
      this.topics[i]["left"] = this.randomPosX() + "vw";
    }
  },
  computed: {
    topic() {
      return this.$store.getters.getTopic;
    },
    isMain() {
      return this.$store.getters.getIsMain;
    }
  },
  mounted() {
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

    navigator.mediaDevices
      .getUserMedia({ video: this.playVideo })
      .then(stream => {
        console.log(stream, this.$refs.video);
        this.video.srcObject = stream;
      });
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
    selectTopic(key) {
      this.selectedTopic = key;
      this.isTopicSelected = true;
    },
    randomPosX() {
      return Math.floor(Math.random() * 80, 80) + 10;
    },
    randomPosY() {
      var val = Math.floor(Math.random() * 50, 50) + 5;
      return val > 25 ? val + 35 : val;
    },
    capture() {
      this.videoCanvas = this.$refs.videoCanvas;
      var videoCanvas = this.videoCanvas
        .getContext("2d")
        .drawImage(this.video, 0, 0, 640, 480);
      this.videoCaptures.push(videoCanvas.toDataURL("image/png"));
      // this.videoCaptures.push(videoCanvas.toDataURL("image/webp"));
    },
    play() {}
  }
};
</script>

<style lang="scss" scoped>
.v-app-bar {
  span {
    font-family: "Times New Roman", Times, serif !important;
    font-weight: 500;
  }
  #topic {
    color: #999;
  }
}

.container {
  .serif {
    font-family: "Times New Roman", Times, serif !important;
  }
  .bubble-box {
    padding-bottom: 0;
    margin-bottom: 0;
    &::after {
      display: inline-block;
      content: "";
      clear: both;
      width: 2em;
      height: 2em;
      margin-left: 3.7em;
      margin-top: -0.9em;
      border-bottom-left-radius: 2em;
      border: 2px solid rgba(255, 255, 255, 0.12);
      border-top: none;
      border-right: none;
    }

    > div:first-child {
      max-height: 55vh;
      overflow: scroll;
      padding-bottom: 0;
    }
    .v-timeline {
      min-width: 30vw;
    }

    #contents-box {
      overflow: hidden;
    }
    .inspiration-card {
      overflow: hidden;
      transition: max-width 1s, max-height 1s, margin 1s;
      text-overflow: ellipsis;
      max-width: 20em;
      max-height: 20em;
      border-radius: 2rem !important;
      align-self: center;
      &.minimized {
        text-align: center;
        max-width: 12em;
        max-height: 5em;
      }
      .keyword {
        overflow: hidden;
        transition: max-width 1s, max-height 1s, padding 1s;
        max-width: 0;
        max-height: 0;
        padding: 0;
        &.minimized {
          max-width: 20em;
          max-height: 4em;
          padding: 1em 1em;
        }
      }
    }
  }
}
</style>
