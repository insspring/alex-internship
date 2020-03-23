<template>
  <div class="settings">
    <div class="settingsInvisible" v-if="!accessToken">
      <h1>
        {{ $t("notLogIn") }}
      </h1>
    </div>
    <div class="settingsVisible" v-if="accessToken">
      <h2>
        {{ $t("settings") }}
      </h2>
      <div class="changeSection">
        <label for="userName">
          <p>
            {{ $t("name") }}
          </p>
          <DefaultInput
                  v-if="currentUser.name"
            id="userName"
            input-type="text"
            v-model="userName"
          ></DefaultInput>
        </label>
        <label for="userEmail">
          <p>
            {{ $t("email") }}
          </p>
          <DefaultInput
                  v-if="currentUser.email"
            id="userEmail"
            input-type="email"
            v-model="userEmail"
          ></DefaultInput>
        </label>
        <label for="userPassword">
          <p>
            {{ $t("password") }}
          </p>
          <DefaultInput
                  v-if="currentUser.password"
            id="userPassword"
            input-type="password"
            v-model="userPassword"
          ></DefaultInput>
        </label>
        <p>
          {{ $t("userPhoto") }}
        </p>
        <UploadInput @change="previewFiles"></UploadInput>
        <!--<label>
          <input type="file" @change="previewFiles" />
        </label>-->
        <ButtonGreen :method="changeUserData" :text="$t('change')">
        </ButtonGreen>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonGreen from "../components/ButtonGreen";
import axios from "axios";
import {signinUser} from "../helpers/api";
import User from "../helpers/user";
import UploadInput from "../components/UploadInput";
import DefaultInput from "../components/DefaultInput";

export default {
  name: "Settings",
  components: { DefaultInput, UploadInput, ButtonGreen },
  created() {
    this.setUserInfo();
  },
  data: function() {
    return {
      user: "",
      userName: "",
      userEmail: "",
      userPassword: "",
      accessToken: localStorage.getItem("accessToken")
    };
  },
  computed: {
    userID() {
      return this.$store.getters.USER_ID;
    },
    currentUser() {
      return this.$store.getters.USER;
    },
    userImage() {
      return localStorage.getItem("userImage");
    }
  },
  methods: {
    changeUserData() {
      this.userCreate();
      axios.put("/users/" + this.userID, this.user);
      this.$store.commit("SET_USER", this.user);
      localStorage.removeItem("userImage");
      signinUser(this.user).then(result =>
        localStorage.setItem("accessToken", result.data.access_token)
      );
    },
    userCreate: function() {
      this.user = new User(
        this.userName,
        this.userEmail,
        this.userPassword,
        this.userImage,
              this.currentUser.favoriteBooks,
              this.currentUser.subscribers,
              this.currentUser.subscriptions,
      );
    },
    previewFiles(event) {
      if (event.target.files[0]) {
        let reader = new FileReader();
        var input = event.target;
        let dataURL;
        reader.onload = function() {
          dataURL = reader.result;
          localStorage.setItem("userImage", dataURL);
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    setUserInfo() {
      if(this.currentUser) {
        this.userName = this.currentUser.name;
        this.userEmail = this.currentUser.email;
        this.userPassword = this.currentUser.password;
      }
    }
  },
  watch: {
    currentUser() {
      this.setUserInfo();
    }
  }
};
</script>

<style scoped></style>
