<template>
  <div class="header" v-on:keyup.esc="inactivePopup">
    <ButtonBasic
      class="popup_active button__signup_green"
      :methodArguments="['In']"
      :text="$t('signIn')"
      :nameAuth="name"
      :method="activePopup"
    />
    <ButtonBasic
      class="popup_active button__signup_green"
      :methodArguments="['Up']"
      :text="$t('signUp')"
      :nameAuth="name"
      :method="activePopup"
    />
    <!--<button class="popup_active button button__signup_green" @click="activePopup('In')">{{$t("signIn")}}</button>-->
    <!--<button class="popup_active button button__signup_green" @click="activePopup('Up')">{{$t("signUp")}}</button>-->
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
    <div class="locale-changer">
      <select v-model="$i18n.locale">
        <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang">{{
          lang
        }}</option>
      </select>
    </div>
  </div>
</template>

<script>
import { signupUser } from "../helpers/api";
import { signinUser } from "../helpers/api";
import ButtonBasic from "./ButtonBasic";

export default {
  name: "HeaderLayout",
  components: { ButtonBasic },
  data: function() {
    return {
      toggle: false,
      getActivePopup: false,
      name: undefined,
      userName: null,
      userNameErrors: [],
      userEmail: null,
      userEmailErrors: [],
      userPassword: null,
      userPasswordErrors: [],
      userRepeatPassword: null,
      userRepeatPasswordErrors: [],
      wasValidated: false,
      isValidName: false,
      isValidEmail: false,
      isValidPassword: false,
      isValidRepeatPassword: false,
      langs: ["ru", "en"],
      user: "",
      message: ""
    };
  },
  methods: {
    activePopup: function() {
      if (this.name === "Up") {
        this.toggle = true;
      } else if (this.name === "In") {
        this.toggle = false;
      }
      this.getActivePopup = true;
    },
    changeName: function(name) {
      this.name = name;
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
    userCreate: function() {
      this.user = {
        name: this.userName,
        email: this.userEmail,
        password: this.userPassword
      };
    },
    checkForm: function(e) {
      this.userNameErrors = [];
      this.userEmailErrors = [];
      this.userPasswordErrors = [];
      this.userRepeatPasswordErrors = [];

      if (!this.userName) {
        this.userNameErrors.push("Bla");
        this.isValidName = true;
      } else if (!this.checkUserName(this.userName)) {
        this.userNameErrors.push("BlaBla");
        this.isValidName = true;
      }

      if (!this.userEmail) {
        this.userEmailErrors.push("BlaE");
        this.isValidEmail = true;
      } else if (!this.checkUserEmail(this.userEmail)) {
        this.userEmailErrors.push("BlaBlaE");
        this.isValidEmail = true;
      }

      if (!this.userPassword) {
        this.userPasswordErrors.push("BlaP");
        this.isValidPassword = true;
      } else if (!this.checkUserPassword(this.userPassword)) {
        this.userPasswordErrors.push("BlaBlaP");
        this.isValidPassword = true;
      }

      if (!this.userRepeatPassword) {
        this.userRepeatPasswordErrors.push("BlaRP");
        this.isValidRepeatPassword = true;
      } else if (
        !this.checkUserRepeatPassword(
          this.userPassword,
          this.userRepeatPassword
        )
      ) {
        this.userRepeatPasswordErrors.push("BlaBlaRP");
        this.isValidRepeatPassword = true;
      }

      if (
        !this.userNameErrors.length &&
        !this.userEmailErrors.length &&
        !this.userPasswordErrors.length &&
        !this.userRepeatPasswordErrors.length
      ) {
        this.userCreate();
        signupUser(this.user).then(this.onFulfilledSignup, this.onRejected);
        e.preventDefault();
        return true;
      } else if (
        !this.userEmailErrors.length &&
        !this.userPasswordErrors.length &&
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
    checkUserName: function(name) {
      const regex = /[A-Z]/g;
      const found = name.match(regex);
      if (found) {
        return true;
      }

      return false;
    },
    checkUserEmail: function(email) {
      const regex = /@./gi;
      const found = email.match(regex);
      if (found) {
        return true;
      }

      return false;
    },
    checkUserPassword: function(password) {
      if (password.length > 3) {
        return true;
      }

      return false;
    },
    checkUserRepeatPassword: function(password, repeatPassword) {
      if (password === repeatPassword) {
        return true;
      }

      return false;
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
html {
  width: 62.5%;
}

.popup {
  background-color: #00b970;
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
}

.button {
  border: none;
  border-radius: 1rem;
  cursor: pointer;
  margin: 1rem;
  padding: 0.5rem 1rem;
}

.button__signup_green {
  background-color: #42b983;
  color: #fff;

  &:hover {
    background-color: #16bf3e;
  }
}

.button__signup_blue {
  background-color: darkcyan;
  color: #fff;

  &:hover {
    background-color: darkblue;
  }
}

.popup-content {
  margin: 0 auto;
}

.close {
  cursor: pointer;
}

.close {
  width: 1.5rem;
}

.popup__input {
  border: none;
  padding: 0.5rem;
}

.input_error {
  background-color: #b9b9b9;
  border-radius: 1rem;
  padding: 1rem 0;
  position: absolute;
  right: -4rem;
  top: 6rem;
  width: 10rem;
}

.isValid {
  background-color: #ffb199;
  border-bottom: 0.3rem solid #ff0013;
}

.popupGreeting {
  align-items: baseline;
  display: flex;
}

.h2Greeting_fullWidth {
  width: 100%;
}
</style>
