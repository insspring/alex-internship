<template>
  <div class="header" v-on:keyup.esc="inactivePopup">
    <h1>goodreads</h1>
    <div class="headerMenu" v-bind:class="{ headerMenu_active: sidebarWidth }">
      <LocaleChanger class="locale-changer"></LocaleChanger>
      <div class="authButtons">
        <ButtonBasic
          class="popup_active button__signup_green"
          :methodArguments="['In']"
          :text="$t('signIn')"
          :method="activePopup"
        />
        <ButtonBasic
          class="popup_active button__signup_green"
          :methodArguments="['Up']"
          :text="$t('signUp')"
          :nameAuth="name"
          :method="activePopup"
        />
      </div>
    </div>
    <BurgerMenu class="burgerMenu" :method="activeSidebar"></BurgerMenu>
    <!--<div class="mobileScreenSize">
      <BurgerMenu class="burgerMenu&#45;&#45;center" :method="activeSidebar">
      </BurgerMenu>
      <ShadowScreen v-if="sidebarWidth"></ShadowScreen>
      <RightSidebarMenu v-bind:class="{ sidebarMenu_open: sidebarWidth }">
        <div class="authButtons authButtons__sidebarMenu">
          <ButtonBasic
            class="popup_active button__signup_green button__sidebarMenu"
            :methodArguments="['In']"
            :text="$t('signIn')"
            :nameAuth="name"
            :method="activePopup"
          />
          <ButtonBasic
            class="popup_active button__signup_green button__sidebarMenu"
            :methodArguments="['Up']"
            :text="$t('signUp')"
            :nameAuth="name"
            :method="activePopup"
          />
        </div>
        <img
          src="../assets/header_components/cancel-button.svg"
          class="close close__sidebarMenu"
          @click="inactiveSidebar"
          alt="close"
        />
        <locale-changer></locale-changer>
      </RightSidebarMenu>
    </div>-->
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
              By clicking "Sign up" I agree to the Goodreads
              <a href="https://www.goodreads.com/about/terms"
                >Terms of Service</a
              >
              and confirm that I am at least 13 years old.
            </p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { signupUser } from "../helpers/api";
import { signinUser } from "../helpers/api";
import { isValid } from "../helpers/isValid";
import ButtonBasic from "./ButtonBasic";
import BurgerMenu from "./BurgerMenu";
/*import ShadowScreen from "./ShadowScreen";*/
import LocaleChanger from "./LocaleChanger";
/*import RightSidebarMenu from "./RightSidebarMenu";*/

export default {
  name: "HeaderLayout",
  components: {
    BurgerMenu,
    /*ShadowScreen,
    RightSidebarMenu,*/
    LocaleChanger,
    ButtonBasic,
  },
  data: function() {
    return {
      toggle: false,
      getActivePopup: false,
      name: undefined,
      userName: null,
      userErrors: [],
      userEmail: null,
      userPassword: null,
      userRepeatPassword: null,
      wasValidated: false,
      isValidName: false,
      isValidEmail: false,
      isValidPassword: false,
      isValidRepeatPassword: false,
      user: "",
      message: "",
      sidebarWidth: null
    };
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
    },
    activeSidebar: function() {
      this.sidebarWidth = true;
    },
    inactiveSidebar: function() {
      this.sidebarWidth = false;
    },
    userCreate: function() {
      this.user = {
        name: this.userName,
        email: this.userEmail,
        password: this.userPassword
      };
    },
    checkForm: function(e) {
      this.userErrors = [];

      if (!this.userName) {
        this.userErrors.push("Bla");
        this.isValidName = true;
      } else if (!isValid(this.userName, 'name')) {
        this.userErrors.push("BlaBla");
        this.isValidName = true;
      }

      if (!this.userEmail) {
        this.userErrors.push("BlaE");
        this.isValidEmail = true;
      } else if (!isValid(this.userEmail, 'email')) {
        this.userErrors.push("BlaBlaE");
        this.isValidEmail = true;
      }

      if (!this.userPassword) {
        this.userErrors.push("BlaP");
        this.isValidPassword = true;
      } else if (!isValid(this.userPassword, 'password')) {
        this.userErrors.push("BlaBlaP");
        this.isValidPassword = true;
      }

      if (!this.userRepeatPassword) {
        this.userErrors.push("BlaRP");
        this.isValidRepeatPassword = true;
      } else if (
        !isValid(
          this.userPassword, 'repeatPassword',
          this.userRepeatPassword
        )
      ) {
        this.userErrors.push("BlaBlaRP");
        this.isValidRepeatPassword = true;
      }

      if (
        !this.userErrors.length && this.toggle
      ) {
        this.userCreate();
        signupUser(this.user).then(this.onFulfilledSignup, this.onRejected);
        e.preventDefault();
        return true;
      } else if (
        !this.userErrors.length &&
        !this.toggle
      ) {
        this.userCreate();
        signinUser(this.user)
          .then(this.onFulfilledSignin)
          .catch(this.onRejected);
        e.preventDefault();
        return true;
      }

      e.preventDefault();
    },
    onFulfilledSignup: function() {
      alert("Success sign up");
      signinUser(this.user)
        .then(this.onFulfilledSignin)
        .catch(this.onRejected);
    },
    onRejected: function(error) {
      this.message = error.response.data.message;
    },
    onFulfilledSignin: function() {
      alert("Success sign in");
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
    }
  }
};
</script>

<style scoped lang="scss">
@import "../scss/_variables.scss";
@import "../scss/_mixins.scss";

html {
  width: 62.5%;
}

.header {
  display: grid;
  grid-template-columns: 1fr auto auto auto;
  background-color: $c-cornsilk;

  @include for-phone-only {
    grid-template-columns: auto 50px;
    grid-column-gap: 0.2rem;
    padding: 0 2rem;
  }
}

.popup {
  background-color: $c-mediumseagreen;
  border-radius: 1rem;
  box-shadow: 0px 0px 2rem #000;
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

  @include for-phone-only {
    width: 15rem;
  }
}

.section {
  height: 100vh;
  background-color: purple;
  display: none;
  justify-content: center;
  align-items: center;
  transition: all 2.5s ease;
  width: 0;
}

.sidebarWidth {
  display: flex;
  width: 100px;
}

.button {
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  margin: 1rem;
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

.button__sidebarMenu {
  place-self: center;
  margin: 0;
}

.aside-menu {
  display: none;

  @include for-phone-only {
    display: flex;
    background-color: #00b970;
  }
}

.popup-content {
  margin: 0 auto;
}

.close {
  cursor: pointer;
  width: 1.5rem;
}

.close__sidebarMenu {
  place-self: center;
}

.authButtons {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.authButtons__sidebarMenu {
  grid-template-columns: auto auto;
}

.popup__input {
  border: none;
  padding: 0.5rem;
}

.burgerMenu {
  display: none;
  padding: 1rem 2rem;
  place-self: center;

  @include for-phone-only {
    display: grid;
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
}

.isValid {
  background-color: $c-lightpink;
  border-bottom: 0.3rem solid $c-red;
}

.popupGreeting {
  align-items: baseline;
  display: flex;
}

.h2Greeting_fullWidth {
  width: 100%;
}

.nonVisible {
  visibility: hidden;
}

.headerMenu {
  align-items: center;
  display: grid;
  grid-template-columns: auto 1fr;
  transition: all 1.3s ease;

  @include for-phone-only {
    position: absolute;
    right: -100%;
    width: 80%;
  }
}

.headerMenu_active {
  right: 0;
}

.mobileScreenSize {
  display: none;

  @include for-phone-only {
    display: grid;
  }
}

.sidebarMenu_open {
  background-color: $c-darkcyan;
  display: grid;
  grid-template-columns: auto auto;
  grid-template-rows: 4rem;
  right: 0;
}
</style>
