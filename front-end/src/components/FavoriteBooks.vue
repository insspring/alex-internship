<template>
  <div class="favoriteBooks">
    <div class="booksInvisible" v-if="!accessToken">
      <h1>
        {{ $t("notLogIn") }}
      </h1>
    </div>
    <h1>
      {{ $t("favoriteBooks") }}
    </h1>
    <div class="userBooks" v-if="books && accessToken">
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
        :class="{ loaderContent: books.length === 0 }"
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
    if (this.userID) {
      this.addBook();
    }
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
      this.$store.commit("SET_LOADER", true);
      this.user.favoriteBooks.forEach(item => {
        axios
          .get(
            `/books/?id=${item}&_sort=id&_order=desc&_page=${this.count}&_limit=10`
          )
          .then(result => {
            this.$store.commit("SET_LOADER", false);
            this.count++;
            for (let i = 0; i < result.data.length; i++) {
              this.books.push(result.data[i]);
            }
          });
      });
      if (this.books.length === 0) {
        this.$store.commit("SET_LOADER", false);
      }
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
    userID() {
      this.addBook();
    }
  }
};
</script>

<style lang="scss" scoped>
.routerLink {
  color: #000;
  text-decoration: none;
}

.userBooks {
  display: flex;
  justify-content: space-around;
}
</style>
