<template>
  <v-row id="event-box">
    <v-col cols="12" class="pa-0">
      <v-carousel :show-arrows="false" hide-delimiters height="inherit">
        <!-- <v-carousel-item v-for="(item,i) in items" :key="i" :src="item.src"></v-carousel-item> -->
        <v-carousel-item v-if="pageTo != 'admin'">
          <div>
            <v-row class="event-item">
              <v-col cols="12" sm="8" class="description px-5 serif">
                <div>
                  <h1 class="align-self-end font-weight-medium">See Chromized livestream</h1>
                  <p>see livestream that are chromized livestream</p>
                  <p>
                    <v-btn
                      class="ma-0"
                      outlined
                      color="white"
                      @click="expandCarousel()"
                    >Turn on livestream</v-btn>
                  </p>
                </div>
              </v-col>
              <v-col class="image-box py-0" cols="12" sm="4">
                <img src="../assets/sample_event.png" />
                <div class="color-box" id="c1"></div>
                <div class="color-box" id="c2"></div>
              </v-col>
            </v-row>
            <v-row class="text-center" v-if="isCarouselOpen">
              <v-col cols="1"></v-col>
              <v-col cols="5">
                <video ref="video" id="video" height="280px" autoplay></video>
                <h3 class="text-center serif font-weight-light">Original</h3>
              </v-col>
              <v-col cols="5">
                <v-card outlined flat class="mx-auto" width="373px" height="280px"></v-card>
                <h3 class="text-center serif font-weight-light">Filtered</h3>
              </v-col>
              <v-col cols="2"></v-col>
            </v-row>
            <v-row v-if="isCarouselOpen">
              <v-col cols="4">
                <div>
                  <button id="snap" v-on:click="capture()">Snap Photo</button>
                </div>
                <canvas ref="videoCanvas" id="videoCanvas" width="640" height="480"></canvas>
                <ul>
                  <li :key="c" v-for="c in videoCaptures">
                    <img v-bind:src="c" height="50" />
                  </li>
                </ul>
              </v-col>
            </v-row>
          </div>
        </v-carousel-item>
        <v-carousel-item v-if="pageTo == 'admin'">
          <div>
            <v-row class="event-item">
              <v-col cols="12" sm="12" class="description px-5 serif">
                <div>
                  <h1 class="align-self-end font-weight-medium">We inspires people</h1>
                  <p>See all the information here</p>
                  <p>
                    <v-btn
                      class="my-0 mr-2"
                      outlined
                      color="white"
                      @click="routeTo('/admin/statistics')"
                    >Statistics</v-btn>
                    <v-btn
                      class="my-0 mr-2"
                      outlined
                      color="white"
                      @click="routeTo('/admin/general')"
                    >General Settings</v-btn>
                    <v-btn
                      class="my-0 mr-2"
                      outlined
                      color="white"
                      @click="routeTo('/admin/post')"
                    >Contents Editor</v-btn>
                    <v-btn class="my-0" outlined color="white" @click="routeTo('/admin/user')">Users</v-btn>
                  </p>
                </div>
              </v-col>
              <v-col cols="12" sm="4"></v-col>
            </v-row>
          </div>
        </v-carousel-item>
      </v-carousel>
    </v-col>
  </v-row>
</template>

<script>
import vuePlayer from "@algoz098/vue-player";
export default {
  name: "custom-event",
  components: {
    vuePlayer
  },
  data: () => ({
    isCarouselOpen: false,
    isVideoPlaying: false,
    video: {},
    videoCanvas: {},
    videoCaptures: []
  }),
  mounted () {
    this.video = this.$refs.video;
    // if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    //   navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    //     console.log(stream);
    //     // this.video.src = window.URL.createObjectURL(stream);
    //     this.video.src = HTMLMediaElement.srcObject = stream;
    //     this.video.play();
    //   });
    // }

    // function hasGetUserMedia () {
    //   return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    // }

    // if (hasGetUserMedia()) {
    //   // Good to go!
    // } else {
    //   alert("getUserMedia() is not supported by your browser");
    // }
  },
  computed: {
    pageTo () {
      return this.$store.getters.getPageTo;
    }
  },
  methods: {
    expandCarousel () {
      this.isCarouselOpen = !this.isCarouselOpen;
      //   if (this.isCarouselOpen) {
      //     this.carouselHeight = 500;
      //     this.isVideoPlaying = true;
      //   } else {
      //     this.carouselHeight = 150;
      //     this.isVideoPlaying = false;
      //   }
      //   this.playVideo();
    },
    capture () {
      this.videoCanvas = this.$refs.videoCanvas;
      var videoCanvas = this.videoCanvas
        .getContext("2d")
        .drawImage(this.video, 0, 0, 640, 480);
      this.videoCaptures.push(videoCanvas.toDataURL("image/png"));
      // this.videoCaptures.push(videoCanvas.toDataURL("image/webp"));
    },
    playVideo () {
      navigator.mediaDevices
        .getUserMedia({ video: this.isVideoPlaying })
        .then(stream => {
          console.log(stream, this.$refs.video);
          this.video.srcObject = stream;
        });
    },
    routeTo (path) {
      this.$router.push({ path: path });
    }
  }
}
</script>

<style lang="scss" scoped>
#event-box {
  //   margin-bottom: calc(-1em + -4px);
  border-right: 2px solid rgba(255, 255, 255, 0.12);
  .col {
    .v-carousel {
      padding: 0;
      margin-bottom: -2em;
      .event-item {
        .description {
          margin: 9em -6em 3em 6em;
        }
        .image-box {
          display: flex;
          img {
            width: 100%;
            object-fit: cover;
            margin: 0 2em 0 -2em;
            align-self: flex-end;
          }
          .color-box {
            position: absolute;
            top: 5em;
            width: 30vw;
            height: 23vw;
            z-index: -1;
            &#c1 {
              background: rgba(81, 227, 238, 0.25);
              //   border: 2px solid rgba(255, 255, 255, 0.12);
              transform: rotate(-15deg);
              margin: 2em 0 0 -2em;
              filter: blur(4px);
            }
            &#c2 {
              background: rgba(81, 227, 238, 0.25);
              //   border: 2px solid rgba(255, 255, 255, 0.12);
              transform: rotate(-25deg);
              margin: 2em 0 0 -2em;
              filter: blur(2px);
            }
          }
        }
      }
    }
  }
}
</style>