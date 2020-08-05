<template>
  <div class="usersList">
    <div class="booksInvisible" v-if="!accessToken">
      <h1>
        {{ $t("notLogIn") }}
      </h1>
    </div>
    <h1 v-if="accessToken && !isEmptyList">
      {{ $t("subscribers") }}
    </h1>
    <div class="userInfo" v-if="accessToken && !isEmptyList">
      <div
        class="infoPreview"
        @click="openUserPage(Number(id))"
        v-for="id in usersList.subscribers"
        :key="id"
      >
        <UserPreview :id="Number(id)"></UserPreview>
      </div>
    </div>
    <div v-else-if="accessToken">
      <h1>
        {{ $t("noSubscribers") }}
      </h1>
    </div>
  </div>
</template>

<script>
import UserPreview from "./UserPreview";
import axios from "axios";

export default {
  name: "UserSubscribers",
  components: { UserPreview },
  created() {
    axios.get(`/users/${this.id}?_subscribers`).then(result => {
      this.usersList = result.data;
      if (this.usersList.subscribers.length === 0) {
        this.isEmptyList = true;
      }
    });
  },
  data() {
    return {
      usersList: [],
      isEmptyList: false
    };
  },
  computed: {
    accessToken() {
      return localStorage.getItem("accessToken");
    },
    id() {
      return this.$route.params.id;
    }
  },
  methods: {
    openUserPage(id) {
      this.$router.push(`/user/id${id}`);
    }
  }
};
</script>

<style lang="scss" scoped>
.userInfo {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  cursor: pointer;
  margin: 1rem auto;
  width: 20rem;
}
</style>
