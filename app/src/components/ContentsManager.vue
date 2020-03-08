<template>
  <div id="contents-manager-box">
    <v-bottom-sheet v-model="isPoppedUp" persistent>
      <v-sheet class="text-center">
        <v-container>
          <h3 class="mb-2">{{ descriptiveTitle }}</h3>
          <v-row v-if="!selectedImage" class="text-center" align="baseline">
            <v-col cols="3"></v-col>
            <v-col cols="6" class="pa-0">
              <v-text-field
                ref="search-box"
                v-model="searchString"
                label="Image title"
                single-line
                dense
                class="text-center"
                :error="loadedString != '' && !foundImages"
              ></v-text-field>
            </v-col>
            <v-col cols="3"></v-col>
          </v-row>
          <v-row class="image-box" :class="{ active: foundImages && !selectedImage }">
            <v-col>
              <v-container fluid>
                <v-row dense>
                  <v-col
                    v-for="(image, key) in images"
                    :key="key"
                    :cols="3"
                    class="px-2 py-1"
                    @click="selectImage(image)"
                  >
                    <img :src="image.urls.small" />
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
          <v-row v-if="selectedImage">
            <v-col>
              <img :src="selectedImage['urls']['small']" />
            </v-col>
          </v-row>
          <v-row v-if="!selectedImage">
            <v-col>
              <h4>Press esc to cancel</h4>
            </v-col>
          </v-row>
          <v-row v-if="selectedImage">
            <v-col cols="2"></v-col>
            <v-col cols="8">
              <v-btn outlined class="darken-5 mr-3" @click="attachImage('outside')">ATTACH ON COVER</v-btn>
              <v-btn outlined class="darken-5 mr-3" @click="attachImage('inside')">ATTACH INSIDE</v-btn>
              <v-btn outlined text class="red darken-5" @click="cancelImage()">NO</v-btn>
            </v-col>
            <v-col cols="2"></v-col>
          </v-row>
        </v-container>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "custom-contents-manager",
  data: () => ({
    keyListener: null,
    searchString: "",
    loadedString: "",
    images: null,
    selectedImage: null
  }),
  mounted () {
    this.keyListener = window.addEventListener("keyup", ev => {
      if (!this.isPoppedUp) return;
      if (ev.keyCode == 27) {
        this.$store.commit("setPopupContentsManager", false);
      } else if (ev.keyCode == 13) {
        if (this.loadedString == this.searchString) return;
        axios
          .get(
            "https://api.unsplash.com/search/photos/?client_id=RIKLfPLvf8YseCYe8C3uqeTgJPXqceJa1uaRmb6yBB0&query=" +
            this.searchString
          )
          .then(res => {
            this.images = res.data.results;
            console.log(this.images, res.data.results);
            this.loadedString = this.searchString;
          });
      } else {
        event.preventDefault();
        return false;
      }
    });
  },
  destroyed () {
    window.removeEventListener("keyup", this.keyListener);
  },
  computed: {
    descriptiveTitle () {
      if (this.selectedImage) {
        return "Attach this?";
      } else {
        return "Add an image of";
      }
    },
    foundImages () {
      if (this.images) {
        return this.images.length ? true : false;
      }
      else return false
    },
    isPoppedUp () {
      return this.$store.getters.getPopupContentsManager;
    }
  },
  watch: {
    isPoppedUp (newVal, oldVal) {
      if (newVal) {
        setTimeout(() => {
          this.loadedString = this.searchString = "";
          this.$refs["search-box"].focus();
        }, 100);
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
      } else {
        document.getElementsByTagName("html")[0].style.overflow = "scroll";
        // document.getElementsByClassName("CodeMirror-scroll")[0].focus();
      }
    }
  },
  methods: {
    selectImage (image) {
      this.selectedImage = image;
    },
    attachImage (position = "inside") {
      var file = {
        type: 'unsplash',
        position: position,
        data: this.selectedImage
      }
      this.$store.commit("uploadImage", file);
      setTimeout(() => {
        this.cancelImage();
      }, 1000);
      this.closePopup();
    },
    cancelImage () {
      this.selectedImage = null;
    },
    closePopup () {
      this.$store.commit("setPopupContentsManager", false);
    }
  }
};
</script>

<style lang="scss" scoped>
img {
  max-height: 50vh;
}
.image-box {
  height: 0;
  overflow-y: hidden;
  transition: height 0.5s;
  &.active {
    height: 50vh;
  }
  .container {
    height: 50vh;
    overflow-y: auto;
    .col {
      width: 25vw;
      height: 40vw;
      overflow-x: hidden;
      overflow-y: hidden;
      transition: padding 0.5s;
      // .col:hover {
      //   padding: 0;
      // }
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: width 0.5s, height 0.5s;
      }
      img:hover {
        margin-left: -25%;
        width: 150%;
      }
    }
  }
}
</style>

<style lang="scss">
#contents-manager-box {
  input {
    text-align: center !important;
  }
}
</style>