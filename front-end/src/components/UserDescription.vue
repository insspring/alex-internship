<template>
  <div class="userDescription">
    <div class="userInfo">
      <UserInfo class="user"></UserInfo>
      <UserSettings class="user" v-if="id == userID"></UserSettings>
    </div>
    <div class="userBooks" v-if="books">
      <h1 v-if="this.userID == this.id">
        {{ $t("myBooks") }}
      </h1>
      <h1 v-else>
        {{ $t("userBooks") }}
      </h1>
      <div
        class="userBooks"
        v-for="book in books"
        :key="book.id"
        v-on:click="openBook(book.id)"
      >
        <BookPreview
          :src="book.cover"
          :title="book.title"
          class="bookPreview"
        ></BookPreview>
        <PageLoader
          v-if="loader"
          :class="{ loaderContent: books.length === 0 }"
          class="loader"
        ></PageLoader>
      </div>
    </div>
  </div>
</template>

<script>
import UserInfo from "./userInfo";
import UserSettings from "./userSettings";
import PageLoader from "./PageLoader";
import BookPreview from "./BookPreview";
import axios from "axios";

export default {
  name: "UserDescription",
  components: { PageLoader, UserInfo, UserSettings, BookPreview },
  data() {
    return {
      books: [],
      bottom: false,
      count: 1,
      userImage: ""
    };
  },
  computed: {
    accessToken() {
      return localStorage.getItem("accessToken");
    },
    id() {
      return this.$route.params.id;
    },
    userID() {
      return this.$store.getters.USER_ID;
    },
    loader() {
      return this.$store.getters.LOADER;
    }
  },
  created() {
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
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
      this.books = [];
      axios
        .get(
          `/books?_sort=id&_order=desc&authorID=${this.id}&_page=${this.count}&_limit=10`
        )
        .then(result => {
          this.$store.commit("SET_LOADER", false);
          this.count++;
          for (let i = 0; i < result.data.length; i++) {
            this.books.push(result.data[i]);
          }
        });
      this.$store.commit("SET_LOADER", true);
    },
    openBook(key) {
      this.$router.push("/book/" + key);
    }
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        this.addBook();
      }
    },
    id() {
      this.addBook();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_breakpoints.scss";

.userDescription {
  display: grid;
  grid-template-columns: 25rem 1fr;

  @media only screen and (max-width: $screen-mobile-max) {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
}

.user {
  box-sizing: border-box;
  margin: 2rem;
  width: 20rem;

  @media only screen and (max-width: $screen-mobile-max) {
    width: auto;
  }
}

.loaderContent {
  left: 50%;
  top: 50%;
}
</style>
