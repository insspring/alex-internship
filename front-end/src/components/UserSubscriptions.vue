<template>
  <div class="usersList">
    <div class="booksInvisible" v-if="!accessToken">
      <h1>
        {{ $t("notLogIn") }}
      </h1>
    </div>
    <div class="userInfo" v-if="accessToken && !isEmptyList">
      <div
        class="infoPreview"
        @click="openUserPage(Number(id))"
        v-for="id in usersList.subscriptions"
        :key="id"
      >
        <UserPreview :id="Number(id)"></UserPreview>
      </div>
    </div>
    <div v-else-if="accessToken">
      <h1>
        {{ $t("noSubscriptions") }}
      </h1>
    </div>
  </div>
</template>

<script>
import UserPreview from "./UserPreview";
import axios from "axios";

export default {
  name: "UserSubscriptions",
  components: { UserPreview },
  created() {
    axios.get(`/users/${this.id}?_subscriptions`).then(result => {
      this.usersList = result.data;
      if (this.usersList.subscriptions.length === 0) {
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
