<template>
  <div class="usersList">
    <div class="booksInvisible" v-if="!accessToken">
      <h1>
        {{ $t("notLogIn") }}
      </h1>
    </div>
    <div class="userInfo" v-if="accessToken">
      <UserPreview
        v-for="id in usersList.subscribers"
        :key="id"
        :id="id"
      ></UserPreview>
    </div>
  </div>
</template>

<script>
import UserPreview from "./UserPreview";
import axios from "axios";

export default {
  name: "UsersList",
  components: { UserPreview },
  created() {
      axios.get(`/users/${this.id}?_subscribers`).then(result => {
        this.usersList = result.data;
      })
  },
  data() {
    return {
      usersList: []
    }
  },
  computed: {
    accessToken() {
      return localStorage.getItem("accessToken");
    },
    id() {
      return this.$route.params.id;
    }
  }
};
</script>

<style lang="scss" scoped>
  .userInfo {
    margin: 1rem auto;
    box-shadow: 0 0 10px rgba(0,0,0,0.5);
    width: 20rem;
  }
</style>
