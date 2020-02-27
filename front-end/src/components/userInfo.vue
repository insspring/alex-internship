<template>
  <div class="userInfo">
    <img :src="userImage" alt="user-image'" class="userImage" />
    <h2>
      {{ userDefaultName }}
    </h2>
    <div class="userEmail">
      <h3>{{ $t("email") }}:</h3>
      <p>
        {{ userDefaultEmail }}
      </p>
    </div>
    <div class="userBooks">
      <h3>{{ $t("books") }}:</h3>
      <p>
        {{ books.length }}
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "userInfo",
  props: {
    name
  },
  data: function() {
    return {
      books: []
    };
  },
  computed: {
    userImage() {
      return this.$store.getters.USER_DEFAULT_IMAGE;
    },
    userDefaultName() {
      return this.$store.getters.USER_NAME;
    },
    userDefaultEmail() {
      return this.$store.getters.USER_EMAIL;
    },
    id: function () {
      return this.$store.getters.USER_ID
    }
  },
  created: function() {
    axios.get(`/books?authorID=${this.id}`).then(result => {
      this.books = result.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.userInfo {
  align-items: center;
  box-shadow: 0 0 1rem #000;
  border-radius: 1rem;
  display: grid;
  justify-items: center;
  grid-template-columns: 9rem 9rem;
  padding: 1rem;
}

.userImage {
  border-radius: 50%;
  width: 5rem;
}
</style>
