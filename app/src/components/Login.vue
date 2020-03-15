<template>
  <div class="text-center">
    <v-bottom-sheet v-model="isPoppedUp" persistent>
      <v-sheet class="text-center" height="200px">
        <v-container v-if="!loggedIn">
          <h3 class="pb-2">Oops, you aren't logged in yet.</h3>
          <v-row class="text-center">
            <v-col cols="3">
              <v-btn
                class="ma-2"
                outlined
                large
                fab
                color="grey darken-2"
                @click.stop="validate('github')"
              >
                <v-icon>mdi-github-face</v-icon>
                <!-- <img src="../assets/logo_kakaotalk.png" @click.stop="validate()" /> -->
              </v-btn>
              <p @click.stop="validate('github')">Login with Github</p>
            </v-col>
            <v-col cols="3">
              <v-btn class="ma-2" outlined large fab color="grey darken-3">
                <img src="../assets/logo_google.png" />
              </v-btn>
              <p>Login with Google</p>
            </v-col>
            <v-col cols="3">
              <v-btn class="ma-2" outlined large fab color="grey darken-3">
                <img src="../assets/logo_apple.png" />
              </v-btn>
              <p>Login with Apple</p>
            </v-col>
            <v-col cols="3">
              <v-btn
                class="ma-2"
                outlined
                large
                fab
                color="red darken-3"
                @click="closePopup"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <p @click="closePopup">Nada.</p>
            </v-col>
          </v-row>
        </v-container>
        <div v-if="loggedIn">
          <v-container v-if="step == 0">
            <h3>Hello, {{ name }}!</h3>
            <v-row>
              <v-col cols="6">
                <v-btn
                  class="ma-2"
                  outlined
                  large
                  fab
                  color="grey darken-3"
                  @click="logout"
                >
                  <v-icon>mdi-logout</v-icon>
                </v-btn>
                <p @click="logout">Logout.</p>
              </v-col>
              <v-col cols="6">
                <v-btn
                  class="ma-2"
                  outlined
                  large
                  fab
                  color="red darken-3"
                  @click="closePopup"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <p @click="closePopup">Nada.</p>
              </v-col>
            </v-row>
          </v-container>
          <v-container v-if="step == 1">
            <h3>Hello, New commers!</h3>
            <v-row align="baseline">
              <v-col cols="5" class="text-end">
                <h4>Please put</h4>
              </v-col>
              <v-col cols="2" class="py-0">
                <v-text-field
                  label="Alias"
                  hint="Big Bro"
                  maxlength="8"
                  counter="8"
                  autofocus
                  dense
                  single-line
                ></v-text-field>
              </v-col>
              <v-col cols="5" class="py-0 text-left">
                <v-btn outlined text @click="step = 2">Next</v-btn>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-btn text class="red darken-5" @click="closePopup"
                  >No, I don't want to register</v-btn
                >
              </v-col>
            </v-row>
          </v-container>

          <v-container v-if="step == 2">
            <v-row>
              <v-col cols="3"></v-col>
              <v-col cols="6">
                <v-checkbox class="py-0 my-0" v-model="form.terms">
                  <template v-slot:label>
                    <div @click.stop>
                      I agreed to collect some user data in inspired_by page
                    </div>
                  </template>
                </v-checkbox>
                <v-checkbox class="py-0 my-0" v-model="form.subscribe">
                  <template v-slot:label>
                    <div @click.stop>
                      I want to subscribe new posts by email.
                    </div>
                  </template>
                </v-checkbox>
              </v-col>
              <v-col cols="3"></v-col>
            </v-row>
            <v-btn outlined text @click="register">Register</v-btn>
          </v-container>

          <v-container v-if="step == 3">
            <v-btn class="ma-2" outlined large fab disabled color="blue">
              <v-icon>mdi-check</v-icon>
            </v-btn>
            <h3 class="pt-3">Hello, {{ name }}!</h3>
            <h2>Enjoy our blog!</h2>
          </v-container>
        </div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  name: "custom-login",
  data() {
    const defaultForm = Object.freeze({
      alias: "",
      email: "",
      term: false,
      subscribe: false
    });
    return {
      form: Object.assign({}, defaultForm),
      rules: {
        alias: [val => (val || "").length > 0 || "This field is required"]
      },
      terms: false,
      loggedIn: false,
      step: 0,
      name: "guest"
    };
  },
  computed: {
    isPoppedUp() {
      return this.$store.getters.getPopupLogin;
    }
  },
  watch: {
    isPoppedUp(newVal, oldVal) {
      if (newVal) {
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
      } else {
        document.getElementsByTagName("html")[0].style.overflow = "scroll";
      }
    }
  },
  methods: {
    closePopup() {
      this.$store.commit("setPopupLogin", false);
    },
    validate(loginType) {
      if (loginType == "github") {
        window.open("https://github.com/login/oauth/authorize", "_blank");
      }
      this.loggedIn = true;
      this.step = 1;
    },
    register() {
      this.step = 3;
      this.$store.commit("login", true);
      setTimeout(() => {
        this.closePopup();
        this.step = 0;
      }, 3000);
    },
    logout() {
      this.loggedIn = false;
      this.step = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.col {
  p {
    color: grey;
  }
  img {
    width: 3em;
  }
}
</style>

<style lang="scss">
.v-overlay__scrim {
  background-color: black !important;
}
.v-bottom-sheet {
  .v-sheet {
    background: linear-gradient(rgba(0, 0, 0, 0.1), rgb(0, 0, 0));
    background-color: transparent !important;
  }
}
</style>
