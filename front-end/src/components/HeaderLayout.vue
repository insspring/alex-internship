<template>
  <div class="header" v-on:keyup.esc="inactivePopup">
    <router-link to="/feed" class="imageLink">
      <h1 class="fullScreenSize" v-if="!isMobileSize">goodreads</h1>
      <img
        src="../assets/logo.svg"
        class="mobileScreenSize logo"
        v-if="isMobileSize"
        alt="logo"
      />
    </router-link>
    <SearchBar></SearchBar>
    <div class="headerMenu" v-bind:class="{ headerMenu_active: sidebarWidth }">
      <LocaleChanger class="locale-changer"></LocaleChanger>
      <router-link
        :to="'/user/id' + this.userID"
        :key="userID"
        class="imageLink"
      >
        <div class="userInfo" v-if="currentUser">
          <img v-if="userImage" :src="userImage" alt="user-image" class="userImage" />
          <img v-else src="../assets/default-user-image.png" alt="user-image" class="userImage" />
          <h2>
            {{ userDefaultName }}
          </h2>
        </div>
      </router-link>
      <div class="authButtons">
        <ButtonBasic
          class="popup_active button__signup_green"
          :methodArguments="['In']"
          :text="$t('signIn')"
          :method="activePopup"
          v-if="isLogout"
        />
        <ButtonBasic
          class="popup_active button__signup_green"
          :methodArguments="['Up']"
          :text="$t('signUp')"
          :method="activePopup"
          v-if="isLogout"
        />
        <ButtonBasic
          class="popup_active button__signup_green button_logout"
          :methodArguments="['Logout']"
          :text="$t('logout')"
          :method="activePopupLogout"
          v-if="!isLogout"
        />
      </div>
    </div>
    <img
            v-if="userImage"
      :src="userImage"
      alt="user-image"
      class="userImage"
      @click="activeSidebar"
    />
    <img
            v-else src="../assets/default-user-image.png"
            alt="user-image"
            class="userImage"
            @click="activeSidebar"
    />
    <ShadowScreen v-if="sidebarWidth" :method="inactiveSidebar"></ShadowScreen>
    <ShadowScreenDark
      v-if="getActivePopup || getActiveLogout"
      :method="inactivePopup"
    ></ShadowScreenDark>
    <div class="popup" v-if="getActivePopup">
      <div class="popupGreeting">
        <h2 class="h2Greeting_fullWidth">
          {{ toggle ? $t("signUpGreeting") : $t("signInGreeting") }}
        </h2>
        <img
          src="../assets/header_components/cancel-button.svg"
          class="close"
          @click="inactivePopup"
          alt="close"
        />
      </div>
      <form
        name="createForm"
        id="userSignupForm"
        autocomplete="off"
        @submit="checkForm"
        novalidate
      >
        <label for="user_first_name" v-if="this.toggle">
          <p>{{ $t("name") }}</p>
          <input
            type="text"
            id="user_first_name"
            class="popup__input"
            placeholder="Name"
            v-model="userName"
            v-bind:class="{ isValid: isValidName }"
            v-on:keyup="isValidNameError"
          />
        </label>
        <label for="user_email">
          <p>{{ $t("email") }}</p>
          <input
            type="email"
            id="user_email"
            class="popup__input"
            placeholder="Email"
            v-model="userEmail"
            v-bind:class="{ isValid: isValidEmail }"
            v-on:keyup="isValidEmailError"
          />
          <p class="input_error" v-if="this.message">
            {{ message }}
          </p>
        </label>
        <label for="user_password">
          <p>{{ $t("password") }}</p>
          <input
            type="password"
            id="user_password"
            class="popup__input"
            v-model="userPassword"
            v-bind:class="{ isValid: isValidPassword }"
            v-on:keyup="isValidPasswordError"
          />
        </label>
        <label for="user_repeat_password" v-if="this.toggle">
          <p>{{ $t("repeatPassword") }}</p>
          <input
            type="password"
            id="user_repeat_password"
            class="popup__input"
            v-model="userRepeatPassword"
            v-bind:class="{ isValid: isValidRepeatPassword }"
            v-on:keyup="isValidRepeatPasswordError"
          />
        </label>
        <div class="signup_terms">
          <div class="signup_field">
            <button class="signup_button button button__signup_blue">
              {{ toggle ? $t("signUp") : $t("signIn") }}
            </button>
            <p v-if="toggle">
              By clicking 'Sign up' I agree to the Goodreads
              <a href="https://www.goodreads.com/about/terms"
                >Terms of Service</a
              >
              and confirm that I am at least 13 years old.
            </p>
          </div>
        </div>
      </form>
    </div>
    <div class="popup" v-if="getActiveLogout">
      <div class="popupGreeting">
        <h2>
          {{ $t("logoutMessage") }}
        </h2>
        <img
          src="../assets/header_components/cancel-button.svg"
          class="close"
          @click="inactivePopupLogout"
          alt="close"
        />
      </div>
      <div class="buttonsLogout">
        <ButtonBasic
          class="button__signup_cornsilk"
          :method="inactivePopupLogout"
          :text="$t('logoutNo')"
        ></ButtonBasic>
        <ButtonBasic
          class="button__signup_blue"
          :method="logout"
          :text="$t('logout')"
        ></ButtonBasic>
      </div>
    </div>
  </div>
</template>

<script>
import { signupUser } from "../helpers/api";
import { signinUser } from "../helpers/api";
import { isValid } from "../helpers/isValid";
import axios from "axios";
import ButtonBasic from "./ButtonBasic";
import ShadowScreen from "./ShadowScreen";
import LocaleChanger from "./LocaleChanger";
import ShadowScreenDark from "./ShadowScreenDark";
import User from "../helpers/user";
import SearchBar from "./SearchBar";

export default {
  name: "HeaderLayout",
  components: {
    SearchBar,
    ShadowScreenDark,
    ShadowScreen,
    LocaleChanger,
    ButtonBasic
  },
  created: function() {
    if (localStorage.getItem("accessToken")) {
      this.$store.commit("SET_TOKEN", localStorage.getItem("accessToken"));
      this.isLogout = false;
    }
    axios.get("/users").then(result => {
      let users = result.data;
      let token = this.$store.getters.TOKEN;
      for (let i = 0; i < users.length; i++) {
        if (token.email === users[i].email) {
          this.$store.commit("SET_USER", users[i]);
          this.$store.commit("SET_USER_NAME", users[i].name);
          this.$store.commit("SET_USER_EMAIL", users[i].email);
          this.$store.commit("SET_USER_PASSWORD", users[i].password);
          this.$store.commit("SET_USER_DEFAULT_IMAGE", users[i].image);
          this.$store.commit("SET_USER_ID", users[i].id);
        }
      }
    });
    this.windowWidth = window.innerWidth;
    window.addEventListener("resize", this.updateWidth);
  },
  data: function() {
    return {
      toggle: false,
      getActivePopup: false,
      getActiveLogout: false,
      name: undefined,
      userName: null,
      userEmail: null,
      userPassword: null,
      userRepeatPassword: null,
      userSigninErrors: [],
      userSignupErrors: [],
      wasValidated: false,
      isValidName: false,
      isValidEmail: false,
      isValidPassword: false,
      isValidRepeatPassword: false,
      user: { type: User },
      message: "",
      sidebarWidth: null,
      isLogout: true,
      result: {},
      windowWidth: 0
    };
  },
  computed: {
    userDefaultName() {
      return this.$store.getters.USER_NAME;
    },
    userID() {
      return this.$store.getters.USER_ID;
    },
    currentUser() {
      return this.$store.getters.USER;
    },
    userImage() {
      return this.currentUser.image;
    },
    isMobileSize() {
      return this.windowWidth < 600;
    }
  },
  methods: {
    activePopup(name) {
      if (name === "Up") {
        this.toggle = true;
      } else if (name === "In") {
        this.toggle = false;
      }
      this.getActivePopup = true;
    },
    inactivePopup: function() {
      if (this.getActivePopup) {
        this.getActivePopup = false;
        this.isValidName = false;
        this.isValidEmail = false;
        this.isValidPassword = false;
        this.isValidRepeatPassword = false;
        this.userName = null;
        this.userEmail = null;
        this.userPassword = null;
        this.userRepeatPassword = null;
        this.message = "";
      }
      if (this.getActiveLogout) {
        this.getActiveLogout = false;
      }
    },
    activePopupLogout: function() {
      this.getActiveLogout = true;
    },
    inactivePopupLogout: function() {
      this.getActiveLogout = false;
    },
    activeSidebar: function() {
      this.sidebarWidth = true;
    },
    inactiveSidebar: function() {
      this.sidebarWidth = false;
    },
    logout: function() {
      localStorage.removeItem("accessToken");
      this.inactivePopupLogout();
      this.isLogout = true;
      this.$store.commit("SET_TOKEN", "");
      this.$store.commit("SET_USERS", []);
      this.$store.commit("SET_USER_NAME", "Perry the Platypus");
      this.$store.commit("SET_USER_EMAIL", "perry@fbi.com");
      this.$store.commit("SET_USER_PASSWORD", "");
      this.$store.commit(
        "SET_USER_DEFAULT_IMAGE",
        "https://upload.wikimedia.org/wikipedia/en/d/dc/Perry_the_Platypus.png"
      );
      this.$store.commit("SET_USER_ID", "");
    },
    userCreate: function() {
      this.user = new User(this.userName, this.userEmail, this.userPassword);
    },
    checkForm: function(e) {
      this.userSigninErrors = [];
      this.userSignupErrors = [];

      if (!this.userName) {
        this.userSignupErrors.push("Bla");
        this.isValidName = true;
      } else if (!isValid(this.userName, "name")) {
        this.userSignupErrors.push("BlaBla");
        this.isValidName = true;
      }

      if (!this.userEmail) {
        this.userSigninErrors.push("BlaE");
        this.isValidEmail = true;
      } else if (!isValid(this.userEmail, "email")) {
        this.userSigninErrors.push("BlaBlaE");
        this.isValidEmail = true;
      }

      if (!this.userPassword) {
        this.userSigninErrors.push("BlaP");
        this.isValidPassword = true;
      } else if (!isValid(this.userPassword, "password")) {
        this.userSigninErrors.push("BlaBlaP");
        this.isValidPassword = true;
      }

      if (!this.userRepeatPassword) {
        this.userSignupErrors.push("BlaRP");
        this.isValidRepeatPassword = true;
      } else if (
        !isValid(this.userPassword, "repeatPassword", this.userRepeatPassword)
      ) {
        this.userSignupErrors.push("BlaBlaRP");
        this.isValidRepeatPassword = true;
      }

      if (!this.userSigninErrors.length && !this.userSignupErrors.length) {
        this.userCreate();
        signupUser(this.user).then(this.onFulfilledSignup, this.onRejected);
        e.preventDefault();
        return true;
      } else if (!this.userSigninErrors.length && !this.toggle) {
        this.userCreate();
        signinUser(this.user).then(this.onFulfilledSignin, this.onRejected);
        e.preventDefault();
        return true;
      }

      e.preventDefault();
    },
    onFulfilledSignup: function() {
      signinUser(this.user)
        .then(this.onFulfilledSignin)
        .catch(this.onRejected);
    },
    onRejected: function(error) {
      this.message = error.response.data.message;
    },
    onFulfilledSignin: function(result) {
      if (!localStorage.getItem("accessToken")) {
        localStorage.setItem("accessToken", result.data.access_token);
        axios.defaults.headers.common["authorization"] =
          "bearer " + localStorage.getItem("accessToken");
        this.$store.commit("SET_TOKEN", localStorage.getItem("accessToken"));
      }
      this.isLogout = false;
      this.inactivePopup();
      axios.get("/users").then(result => {
        let token = this.$store.getters.TOKEN;
        let users = result.data;
        for (let i = 0; i < users.length; i++) {
          if (token.email === users[i].email) {
            this.$store.commit("SET_USER", users[i]);
            this.$store.commit("SET_USER_NAME", users[i].name);
            this.$store.commit("SET_USER_EMAIL", users[i].email);
            this.$store.commit("SET_USER_PASSWORD", users[i].password);
            this.$store.commit("SET_USER_DEFAULT_IMAGE", users[i].image);
            this.$store.commit("SET_USER_ID", users[i].id);
          }
        }
      });
    },
    isValidNameError: function() {
      this.isValidName = false;
    },
    isValidEmailError: function() {
      this.isValidEmail = false;
    },
    isValidPasswordError: function() {
      this.isValidPassword = false;
    },
    isValidRepeatPasswordError: function() {
      this.isValidRepeatPassword = false;
    },
    updateWidth() {
      this.windowWidth = window.innerWidth;
    }
  }
};
</script>

<style scoped lang="scss">
@import "../scss/_variables.scss";
@import "../scss/_breakpoints.scss";

html {
  width: 62.5%;
}

.header {
  align-items: center;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  position: fixed;
  top: 0;
  z-index: 1;
  width: 100%;

  @media only screen and (max-width: $screen-mobile-max) {
    overflow-x: hidden;
  }
}

.popup {
  background-color: $c-mediumseagreen;
  border-radius: 1rem;
  box-shadow: 0 0 2rem #000;
  flex-direction: column;
  justify-content: space-between;
  left: 0;
  margin: 5rem auto;
  padding: 0 0.5rem 1rem;
  position: fixed;
  right: 0;
  top: 0;
  width: 25rem;
  z-index: 103;
}

.button {
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  margin: 1rem;
  max-width: 10rem;
  padding: 0.5rem 1rem;
}

.button__signup_green {
  background-color: $c-mediumseagreen;
  color: #fff;

  &:hover {
    background-color: $c-brightgreen;
  }
}

.button__signup_blue {
  background-color: $c-darkcyan;
  color: #fff;

  &:hover {
    background-color: $c-darkblue;
  }
}

.button__signup_cornsilk {
  background-color: $c-cornsilk;
  color: #000;

  &:hover {
    background-color: $c-yellow;
  }
}

.button_logout {
  grid-area: hd;
}

.close {
  cursor: pointer;
  outline: none;
  width: 1.5rem;
}

.authButtons {
  align-items: baseline;
  display: flex;
}

.popup__input {
  border: none;
  padding: 0.5rem;
}

.burgerMenu {
  display: none;
  padding: 1rem 2rem;
  place-self: center;

  @media only screen and (max-width: $screen-mobile-max) {
    display: none;
    padding: 0;
  }
}

.input_error {
  background-color: $c-lightgray;
  border-radius: 1rem;
  padding: 1rem 0;
  position: absolute;
  right: -4rem;
  top: 6rem;
  width: 10rem;

  @media only screen and (max-width: $screen-mobile-max) {
    right: -2rem;
  }
}

.isValid {
  background-color: $c-lightpink;
  border-bottom: 0.3rem solid $c-red;
}

.popupGreeting {
  align-items: baseline;
  display: flex;
  justify-content: space-around;
}

.h2Greeting_fullWidth {
  width: 100%;
}

.headerMenu {
  background-color: #fff;
  box-sizing: border-box;
  grid-template-columns: 5rem;
  grid-template-rows: 5rem 5rem 5rem;
  height: 100%;
  padding: 1rem;
  position: fixed;
  right: -100%;
  top: 0;
  transition: all 0.7s ease;
  z-index: 102;
  width: 50%;
}

.headerMenu_active {
  right: 0;
}

.headerMenu_active + body {
  overflow: hidden;
}

.mobileScreenSize {
  display: none;

  @media only screen and (max-width: $screen-mobile-max) {
    display: grid;
  }
}

.fullScreenSize {
  display: grid;

  @media only screen and (max-width: $screen-mobile-max) {
    display: none;
  }
}

.logo {
  width: 2rem;
}

.userImage {
  border-radius: 50%;
  cursor: pointer;
  width: 2rem;
}

.userInfo {
  align-items: center;
  display: flex;
}

.router-link {
  color: $c-danube;
  cursor: pointer;
  margin: 1rem;
  text-decoration: none;
}

.imageLink {
  color: #000;
  cursor: pointer;
  text-decoration: none;
}
</style>
