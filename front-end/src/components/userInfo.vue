<template>
  <div class="userInfo">
    <img :src="userImage" alt="user-image'" class="userImage" />
    <h2>
      {{ name }}
    </h2>
    <div class="userEmail">
      <h3>{{ $t("email") }}:</h3>
      <p>
        {{ email }}
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
    userImage: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
  },

  data: function() {
    return {
      books: []
    };
  },
  computed: {
    id: function() {
      return this.$route.params.id;
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
