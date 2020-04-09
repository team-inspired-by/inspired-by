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
                @click.stop="validate('github')"
              >
                <v-icon size="4em">mdi-github</v-icon>
                <!-- <img src="../assets/logo_kakaotalk.png" @click.stop="validate()" /> -->
              </v-btn>
              <p @click.stop="validate('github')">Login with Github</p>
            </v-col>
            <v-col cols="3">
              <v-btn
                class="ma-2"
                outlined
                large
                fab
                color="grey darken-3"
                @click.stop="validate('google')"
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
                @click.stop="validate('apple')"
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
            <v-btn text outlined class="darken-5" @click="step=0">Go previous</v-btn>
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
          <h3 class="pt-3">Hello, {{ name }}!</h3>
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
import { getAccessToken, checkAlias, checkEmail, registerUser } from "../queries/queryAuthentication";
import axios from "axios";
export default {
  name: "custom-login",
  apollo: {
    userInfo: {
      client: "inspiredBy",
      query () {
        return getAccessToken;
      },
      variables () {
        return {
          code: this.code,
          state: "testing"
        };
      },
      update: data => {
        console.debug("getAccessToken data:");
        console.debug(data);
        return data.signUpWithGithub;
      },
      skip () {
        return !this.enableQuery.userInfo;
      }
    },
    checkAlias: {
      client: "inspiredBy",
      query () {
        return checkAlias
      },
      variables () {
        return {
          alias: this.form.alias
        }
      },
      update: data => {
        console.debug("checkAlias: ");
        console.debug(data);
        return data.checkAlias;
      },
      skip () {
        return !this.enableQuery.checkAlias;
      }
    },
    checkEmail: {
      client: "inspiredBy",
      query () {
        return checkEmail
      },
      variables () {
        return {
          email: this.form.email
        }
      },
      update: data => {
        console.debug("checkEmail: ");
        console.debug(data);
        return data.checkEmail;
      },
      skip () {
        return !this.enableQuery.checkEmail;
      }
    },
    // register: {
    //   client: "inspiredBy",
    //   mutation () {
    //     return registerUser
    //   },
    //   variables () {
    //     return this.form
    //   },
    //   update: data => {
    //     console.debug("register: ");
    //     console.debug(data);
    //     return data.registerUser
    //   },
    // }
  },
  data () {
    const defaultForm = Object.freeze({
      idType: "",
      alias: "",
      email: "",
      terms: false,
      subscribeEmail: false,
      accessToken: ""
    });
    return {
      form: Object.assign({}, defaultForm),
      formAlias: true,
      formEmail: true,
      formAgreement: true,
      rules: {
        alias: [val => (val || "").length > 3 || "At least 4 characters",
        val => (val || "").length <= 10 || "At most 10 characters"],
        agree: [val => (val || "") == true || "You must agree to register"],
        email: [val => (val || "").split("@").length == 2 || "Check your email again",
        val => ((val.split("@")[1] || "").split(".").length || "") == 2 || "Check your email again"]
      },
      loggedIn: false,
      step: 0,
      // hasReceivedCode: false,
      enableQuery: {
        userInfo: false,
        checkAlias: false,
        checkEmail: false,
      },
      code: "",
      name: "guest",
      snackbar: {
        loginSupport: false,
        checkAlias: false,
        checkEmail: false
      },
      loading: false
    };
  },
  methods: {
    closePopup (success = false) {
      if (success == true) {
        this.$store.commit("setPopupLogin", false);
        this.step = 0;
      }
      this.step = 10;
      for (let i in this.enableQuery) {
        this.enableQuery[i] = false;
      }
      setTimeout(() => {
        this.$store.commit("setPopupLogin", false);
        this.step = 0;
      }, 3000);
    },
    validate (loginType) {
      if (loginType == "github") {
        this.form.idType = "GITHUB";
        window.open(
          "https://github.com/login/oauth/authorize/?client_id=" + process.env.VUE_APP_CLIENT_ID + "&state=" + process.env.VUE_APP_STATE + "&scope=user",
          "_blank"
        );
        window.addEventListener("storage", e => {
          this.code = e.newValue;
          // this.hasReceivedCode = true;
          this.enableQuery.userInfo = true;
          console.debug("received: true");
        });
      }
      else if (loginType == 'google' || loginType == 'apple') {
        this.form.idType = "GOOGLE";
        this.snackbar.loginSupport = true;
        return;
      }
      // this.loggedIn = true;
      this.step = 1;
    },
    checkAlias () {
      this.loading = true;
      this.enableQuery.checkAlias = true;
    },
    checkEmail () {
      this.loading = true;
      this.enableQuery.checkEmail = true;
    },
    async register () {
      this.loading = true;
      this.name = this.form.alias;
      await this.$apollo.mutate({
        client: "inspiredBy",
        mutation: registerUser,
        variables: this.form,
        update: ((data) => {
          console.debug("Register data: ");
          console.debug(data);
          this.loading = false;
          this.step = 6;
          this.$store.commit("login", true);
          setTimeout(() => {
            this.closePopup(true);
          }, 3000);
        }).bind(this)
      });
      // console.debug("on register: ");
      // console.debug(this.form);
      // setTimeout(() => {
      //   this.step = 6;
      //   this.$store.commit("login", true);
      //   setTimeout(() => {
      //     this.closePopup(true);
      //   }, 3000);
      // }, 3000);

      // console.debug("Register newVal: ");
      // console.log(newVal);
      // this.loading = false;
      // if (newVal.success) {
      //   this.step = 6;
      //   this.$store.commit("login", true);
      //   setTimeout(() => {
      //     this.closePopup(true);
      //   }, 3000);
      // }
    },
  },
  computed: {
    isPoppedUp () {
      return this.$store.getters.getPopupLogin;
    },
    apolloUserInfo () {
      return this.$apollo.data.userInfo;
    },
    apolloAlias () {
      return this.$apollo.data.checkAlias;
    },
    apolloEmail () {
      return this.$apollo.data.checkEmail;
    }
  },
  watch: {
    isPoppedUp (newVal, oldVal) {
      if (newVal) {
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
      } else {
        document.getElementsByTagName("html")[0].style.overflow = "scroll";
      }
    },
    apolloUserInfo (newVal, oldVal) {
      if (newVal) {
        this.step = 2;
        console.debug('userInfo newVal: ');
        console.debug(newVal);
        if (newVal['accessToken'])
          this.form.accessToken = newVal.accessToken;
        if (newVal['email'])
          this.form.email = newVal.email;
        if (newVal['alias'])
          this.form.alias = newVal.alias;

        console.debug("form: ");
        console.debug(this.form);
      }
    },
    apolloAlias (newVal, oldVal) {
      if (newVal) {
        console.debug('Alias newVal: ');
        console.debug(newVal);
        this.loading = false;
        if (newVal.available) {
          this.step = 3;
        } else {
          this.enableQuery.checkAlias = false;
          this.snackbar.checkAlias = true;
        }
      }
    },
    apolloEmail (newVal, oldVal) {
      if (newVal) {
        console.debug("Email newVal: ");
        console.debug(newVal);
        this.loading = false;
        if (newVal.available) {
          this.step = 4;
        } else {
          this.enableQuery.checkEmail = false;
          this.snackbar.checkEmail = true;
        }
      }
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
