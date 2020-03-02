<template>
  <div class="favoriteBooks">
    <div class="userBooks">
      <router-link
        v-for="book in books"
        :to="'/book/' + book.id"
        :key="book.id"
        class="routerLink"
      >
        <BookPreview
          :src="book.cover"
          :title="book.title"
          class="bookPreview"
        ></BookPreview>
      </router-link>
      <PageLoader
        v-if="loader"
        :class="{ loaderContent: this.books.length === 0 }"
        class="loader"
      ></PageLoader>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PageLoader from "./PageLoader";
import BookPreview from "./BookPreview";

export default {
  name: "FavoriteBooks",
  components: { PageLoader, BookPreview },
  data() {
    return {
      books: [],
      favoriteBook: []
    };
  },
  created() {
    this.addBook();
  },
  methods: {
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    addBook() {
      this.favoriteBook = this.user.favoriteBooks;
      for (let i = 0; i < this.favoriteBook.length; i++) {
        axios
          .get(
            `/books/?id=${this.favoriteBook[i]}&_sort=id&_order=desc&_page=${this.count}&_limit=10`
          )
          .then(result => {
            this.$store.commit("SET_LOADER", false);
            this.count++;
            for (let i = 0; i < result.data.length; i++) {
              this.books.push(result.data[i]);
            }
          });
      }
      this.$store.commit("SET_LOADER", true);
    }
  },
  computed: {
    accessToken: function() {
      return localStorage.getItem("accessToken");
    },
    userID: function() {
      return this.$store.getters.USER_ID;
    },
    loader: function() {
      return this.$store.getters.LOADER;
    },
    user() {
      return this.$store.getters.USER;
    }
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        this.addBook();
      }
    },
    userID: function(val) {
      if (val) {
        this.addBook();
      }
    }
  }
};
</script>

<style scoped></style>
