<template>
  <div class="text-center">
    <v-bottom-sheet v-model="isPoppedUp" persistent>
      <v-sheet class="text-center" height="200px">
        <v-container v-if="step == 0">
          <h3 class="pb-2">Oops, you aren't logged in yet.</h3>
          <v-row class="text-center">
            <v-col cols="3">
              <v-btn
                class="ma-2"
                outlined
                large
                fab
                color="grey darken-2"
                @click.stop="login('GITHUB')"
              >
                <v-icon size="4em">mdi-github</v-icon>
                <!-- <img src="../assets/logo_kakaotalk.png" @click.stop="login()" /> -->
              </v-btn>
              <p @click.stop="login('GITHUB')">Login with Github</p>
            </v-col>
            <v-col cols="3">
              <v-btn
                class="ma-2"
                outlined
                large
                fab
                color="grey darken-3"
                @click.stop="login('GOOGLE')"
              >
                <img src="../assets/logo_google.png" />
              </v-btn>
              <p>Login with Google</p>
            </v-col>
            <v-col cols="3">
              <v-btn
                class="ma-2"
                outlined
                large
                fab
                color="grey darken-3"
                @click.stop="validate('APPLE')"
              >
                <img src="../assets/logo_apple.png" />
              </v-btn>
              <p>Login with Apple</p>
            </v-col>
            <v-snackbar v-model="snackbar.loginSupport">
              This login will be supported soon.
              <v-btn color="red" text @click="snackbar.loginSupport = false">close</v-btn>
            </v-snackbar>
            <v-col cols="3">
              <v-btn class="ma-2" outlined large fab color="red darken-3" @click="closePopup">
                <v-icon>mdi-close</v-icon>
              </v-btn>
              <p @click="closePopup">Nada.</p>
            </v-col>
          </v-row>
        </v-container>

        <v-container v-if="step == 1">
          <h3>Check the new window</h3>
          <div class="mt-5">
            <v-btn text class="red darken-5 mr-3" @click="closePopup">Cancel to register</v-btn>
            <v-btn text outlined class="darken-5" @click="step = 0">Go previous</v-btn>
          </div>
        </v-container>

        <v-container v-if="step == 2">
          <h3>Hello, New commers!</h3>
          <v-form ref="form-alias" v-model="formAlias">
            <v-row align="baseline">
              <v-col cols="3" sm="5" class="text-end">
                <h4>Please put</h4>
              </v-col>
              <v-col cols="6" sm="2" class="py-0">
                <v-text-field
                  v-model="form.alias"
                  :rules="rules.alias"
                  label="Alias"
                  hint="up to 10 characters"
                  maxlength="10"
                  counter="10"
                  autofocus
                  dense
                  single-line
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="3" sm="5" class="py-0 text-left">
                <v-btn
                  outlined
                  text
                  :disabled="!formAlias"
                  :loading="loading"
                  class="primary darken-4"
                  @click="checkAlias()"
                  @keyup.enter="checkAlias()"
                  @submit="checkAlias()"
                >Next</v-btn>
              </v-col>
              <v-snackbar v-model="snackbar.checkAlias">
                Alias is duplicated. Select another alias.
                <v-btn color="red" text @click="snackbar.checkAlias = false">close</v-btn>
              </v-snackbar>
            </v-row>
          </v-form>
          <v-row>
            <v-col>
              <v-btn outlined text @click="closePopup">No, I don't want to register</v-btn>
            </v-col>
          </v-row>
        </v-container>

        <v-container v-if="step == 3">
          <h3>What's your email?</h3>
          <v-form ref="form-email" v-model="formEmail">
            <v-row align="baseline">
              <v-col cols="1" sm="3"></v-col>
              <v-col cols="8" sm="5" class="py-0">
                <v-text-field
                  v-model="form.email"
                  :rules="rules.email"
                  type="email"
                  label="Email"
                  hint="your-email@inspired-by.me"
                  autofocus
                  dense
                  single-line
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="3" sm="4" class="py-0 text-left">
                <v-btn
                  outlined
                  text
                  class="primary darken-4 mr-3"
                  :disabled="!formEmail"
                  :loading="loading"
                  @click="checkEmail()"
                  @keyup.enter="checkEmail()"
                  @submit="checkEmail()"
                >Next</v-btn>
              </v-col>
              <v-snackbar v-model="snackbar.checkEmail">
                Email is duplicated. Select another email.
                <v-btn color="red" text @click="snackbar.checkEmail = false">close</v-btn>
              </v-snackbar>
            </v-row>
          </v-form>
          <v-row>
            <v-col>
              <v-btn outlined text class="mr-3" @click="step = 2">Previous</v-btn>
              <v-btn outlined text @click="closePopup">Cancel to register</v-btn>
            </v-col>
          </v-row>
        </v-container>

        <v-container v-if="step == 4">
          <v-form ref="form-agreement" v-model="formAgreement">
            <v-row>
              <v-col cols="0" sm="2"></v-col>
              <v-col cols="12" sm="8">
                <v-checkbox class="py-0 my-0" required v-model="form.terms" :rules="rules.agree">
                  <template v-slot:label>
                    <div @click.stop>I agreed to collect some user data in inspired_by page</div>
                  </template>
                </v-checkbox>
                <v-checkbox class="py-0 my-0" v-model="form.subscribeEmail">
                  <template v-slot:label>
                    <div @click.stop>I want to subscribe new posts by email.</div>
                  </template>
                </v-checkbox>
              </v-col>
              <v-col cols="0" sm="1"></v-col>
            </v-row>
            <v-btn
              text
              class="primary darken-4 mr-3"
              :disabled="!formAgreement"
              :loading="loading"
              @click="register"
            >Register</v-btn>
            <v-btn outlined text class="darken-5" @click="closePopup">Disagree</v-btn>
          </v-form>
        </v-container>

        <v-container v-if="step == 6">
          <v-btn class="ma-2" outlined large fab disabled color="blue">
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <h3 class="pt-3">Hello, {{ form.alias }}!</h3>
          <h2>Enjoy our blog!</h2>
        </v-container>

        <v-container v-if="step == 10">
          <h2 class="mt-5 my-3">Signing up cancelled.</h2>
          <h4>You can register again whenever you want.</h4>
        </v-container>
        <!-- <div v-if="loggedIn"> -->
        <!-- <v-container v-if="step == 0">
            <h3>Hello, {{ name }}!</h3>
            <v-row>
              <v-col cols="6">
                <v-btn class="ma-2" outlined large fab color="grey darken-3" @click="logout">
                  <v-icon>mdi-logout</v-icon>
                </v-btn>
                <p @click="logout">Logout.</p>
              </v-col>
              <v-col cols="6">
                <v-btn class="ma-2" outlined large fab color="red darken-3" @click="closePopup">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <p @click="closePopup">Nada.</p>
              </v-col>
            </v-row>
        </v-container>-->
        <!-- </div> -->
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
import gql from "graphql-tag";
import {
  getUserInfo,
  githubLogin,
  checkAlias,
  checkEmail,
} from "../queries/queryAuthentication";
import { registerUser } from "../queries/mutateAuthentication";
// import axios from "axios";
import randomstring from "randomstring";

export default {
  name: "custom-login",
  data () {
    const defaultForm = Object.freeze({
      idType: "",
      openId: "",
      alias: "",
      email: "",
      terms: false,
      subscribeEmail: false,
    });
    return {
      form: Object.assign({}, defaultForm),
      formAlias: true,
      formEmail: true,
      formAgreement: true,
      rules: {
        alias: [
          (val) => (val || "").length > 3 || "At least 4 characters",
          (val) => (val || "").length <= 10 || "At most 10 characters",
        ],
        agree: [(val) => (val || "") == true || "You must agree to register"],
        email: [
          (val) =>
            (val || "").split("@").length == 2 || "Check your email again",
          (val) =>
            ((val.split("@")[1] || "").split(".").length || "") == 2 ||
            "Check your email again",
        ],
      },
      loggedIn: false,
      step: 0,
      name: "guest",
      snackbar: {
        loginSupport: false,
        checkAlias: false,
        checkEmail: false,
      },
      loading: false,
    };
  },
  mounted () {
    this.setUserInfo();
  },
  methods: {
    setUserInfo () {
      console.debug("userInfo:", this.userInfo);
      let refreshToken, accessToken;
      if (this.userInfo.isLoggedIn) return;
      if (!this.userInfo.refreshToken) {
        refreshToken = localStorage.getItem("inspired-by-refresh-token");
        console.debug("refreshToken from local storage: ", refreshToken);
        if (refreshToken) {
          this.$store.commit("setRefreshToken", refreshToken);
        } else {
          return;
        }
      }
      if (!this.userInfo.accessToken) {
        accessToken = sessionStorage.getItem("inspired-by-access-token");
        console.debug("accessToken from session storage: ", accessToken);
        if (accessToken) {
          this.$store.commit("setAccessToken", accessToken);
        } else {
          return;
        }
      }
      this.$apollo
        .query({
          client: "inspiredBy",
          query: getUserInfo,
          context: {
            headers: {
              authorization: "Bearer " + accessToken,
            },
          },
        })
        .then((res) => {
          console.debug("on getUserInfo: ", res);
          if (res.data.getUserInfo.success) {
            this.$store.commit("login", {
              isLoggedIn: true,
              isUser: true,
              user: res.data.getUserInfo.user,
            });
          } else {
            this.$store.commit("logout");
            this.closePopup();
          }
        })
        .catch((err) => {
          console.error("error occurred on getUserInfo(): ", err);
        });
    },
    login (idType) {
      if (idType == "GITHUB") {
        let stateString = randomstring.generate(7);
        this.form.idType = "GITHUB";
        window.open(
          "https://github.com/login/oauth/authorize/?client_id=" +
          process.env.VUE_APP_CLIENT_ID +
          "&state=" +
          stateString +
          "&scope=user",
          "_blank"
        );
        window.addEventListener("storage", (e) => {
          if (e.key != "inspired-by-user-code") return;
          const code = e.newValue;
          // this.enableQuery.userInfo = true;
          console.debug("received:", code, stateString);
          // this.login(this.code, "GITHUB");
          // window.removeEventListener('storage', e => { }, false);
          this.$apollo
            .query({
              client: "inspiredBy",
              query: githubLogin,
              variables: {
                code: code,
                state: stateString,
              },
            })
            .then((res) => {
              let data = res.data.githubLogin;
              console.log("data on login(): ", data);
              if (res.data.githubLogin.isUser) {
                this.form.alias = data.user.alias;
                this.$store.commit("login", {
                  isLoggedIn: true,
                  isUser: true,
                  accessToken: data.accessToken,
                  refreshToken: data.refreshToken,
                  user: data.user,
                });
                this.step = 6;
                setTimeout(() => {
                  this.closePopup(true);
                }, 3000);
              } else {
                this.form.openId = data.openIdId;
                this.form.alias = data.openIdAlias;
                this.form.email = data.openIdEmail;
                this.step = 2;
              }
            })
            .catch((err) => {
              console.error("error occurred on login(): ", err);
            });
        });
      } else if (idType == "GOOGLE" || idType == "APPLE") {
        this.form.idType = "GOOGLE";
        this.snackbar.loginSupport = true;
        return;
      }
      this.step = 1;
    },
    checkAlias () {
      this.loading = true;
      // this.enableQuery.checkAlias = true;
      this.$apollo
        .query({
          client: "inspiredBy",
          query: checkAlias,
          variables: {
            alias: this.form.alias,
          },
        })
        .then((res) => {
          let data = res.data.checkAlias;
          console.log("data on checkAlias(): ", data);
          this.loading = false;
          if (data.available) this.step = 3;
          else this.snackbar.checkAlias = true;
        })
        .catch((err) => {
          console.error("error occurred on checkAlias(): ", err);
        });
    },
    checkEmail () {
      this.loading = true;
      // this.enableQuery.checkEmail = true;
      this.$apollo
        .query({
          client: "inspiredBy",
          query: checkEmail,
          variables: {
            email: this.form.email,
          },
        })
        .then((res) => {
          let data = res.data.checkEmail;
          console.log("data on checkEmail(): ", res);
          this.loading = false;
          if (data.available) this.step = 4;
          else this.snackbar.checkEmail = true;
        })
        .catch((err) => {
          console.error("error occurred on checkEmail(): ", err);
        });
    },
    register () {
      this.loading = true;
      console.log("on register(): ", this.form);
      this.$apollo
        .mutate({
          client: "inspiredBy",
          mutation: registerUser,
          variables: this.form,
        })
        .then((res) => {
          console.debug("Registered res: ");
          console.debug(res);
          this.loading = false;
          this.$store.commit("login", {
            isLoggedIn: true,
            isUser: true,
            accessToken: res.data.registerUser.accessToken,
            refreshToken: res.data.registerUser.refreshToken,
            user: {
              email: this.form.email,
              alias: this.form.alias,
              name: this.form.name,
              isHeavyUser: true,
              level: 'MEMBER'
            },
          });
          this.step = 6;
          setTimeout(() => {
            this.closePopup(true);
          }, 3000);
        })
        .catch((err) => {
          console.error("error occurred on register(): ", err);
        });
    },
    closePopup (success = false) {
      if (success == true) {
        this.$store.commit("setPopupLogin", false);
        setTimeout(() => {
          this.step = 0;
        }, 500);
      } else {
        this.step = 10;
        setTimeout(() => {
          this.$store.commit("setPopupLogin", false);
          setTimeout(() => {
            this.step = 0;
          }, 500);
        }, 3000);
      }
    },
  },
  computed: {
    userInfo () {
      return this.$store.getters.getUserInfo;
    },
    isPoppedUp () {
      return this.$store.getters.getPopupLogin;
    },
  },
  watch: {
    isPoppedUp (newVal, oldVal) {
      if (newVal) {
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
      } else {
        document.getElementsByTagName("html")[0].style.overflow = "scroll";
      }
    },
  },
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
