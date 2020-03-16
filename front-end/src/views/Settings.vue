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
          <DefaultInput id="userName" input-type="text" v-model="userName"></DefaultInput>
        </label>
        <label for="userEmail">
        <p>
          {{ $t("email") }}
        </p>
        <DefaultInput id="userEmail" input-type="email" v-model="userEmail"></DefaultInput>
        </label>
        <label for="userPassword">
        <p>
          {{ $t("password") }}
        </p>
        <DefaultInput id="userPassword" input-type="password" v-model="userPassword"></DefaultInput>
        </label>
        <p>
          {{ $t("userPhoto") }}
        </p>
        <UploadInput @change="previewFiles"></UploadInput>
        <ButtonGreen :method="changeUserData" :text="$t('change')">
        </ButtonGreen>
      </div>
    </div>
  </div>
</template>

<script>
import ButtonGreen from "../components/ButtonGreen";
import axios from "axios";
import { signinUser } from "../helpers/api";
import User from "../helpers/user";
import UploadInput from "../components/UploadInput";
import DefaultInput from "../components/DefaultInput";

export default {
  name: "Settings",
  components: {DefaultInput, UploadInput, ButtonGreen },
  data: function() {
    return {
      user: "",
      userName: this.$store.getters.USER_NAME,
      userEmail: this.$store.getters.USER_EMAIL,
      userPassword: this.$store.getters.USER_PASSWORD,
      accessToken: localStorage.getItem("accessToken"),
    };
  },
  computed: {
    userID() {
      return this.$store.getters.USER_ID;
    },
    userImage() {
      return this.$store.getters.USER_DEFAULT_IMAGE;
    }
  },
  methods: {
    changeUserData() {
      this.userCreate();
      axios.put("/users/" + this.userID, this.user);
      signinUser(this.user).then(result =>
        localStorage.setItem("accessToken", result.data.access_token)
      );
    },
    userCreate: function() {
      this.user = new User(this.userName, this.userEmail, this.userPassword, this.userImage);
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
    }
  },
};
</script>

<style scoped></style>
