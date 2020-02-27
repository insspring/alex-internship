<template>
  <div class="userProfile">
    <div class="settingsInvisible" v-if="!accessToken">
      <h1>
        {{ $t("notLogIn") }}
      </h1>
    </div>
    <div class="feed" v-if="accessToken">
      <div class="userInfo">
        <UserInfo class="user"></UserInfo>
        <UserSettings class="user"></UserSettings>
      </div>
      <div class="userBooks">
        <h1>
          {{ $t("myBooks") }}
        </h1>
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
    </div>
  </div>
</template>

<script>
import UserSettings from "../components/userSettings";
import UserInfo from "../components/userInfo";
import BookPreview from "../components/BookPreview";
import axios from "axios";
import PageLoader from "../components/PageLoader";

export default {
  name: "UserProfile",
  components: { PageLoader, UserInfo, UserSettings, BookPreview },
  data: function() {
    return {
      books: [],
      bottom: false,
      count: 1
    };
  },
  computed: {
    loader: function() {
      return this.$store.getters.LOADER;
    },
    id: function () {
      return this.$store.getters.USER_ID
    },
    accessToken: function () {
      return localStorage.getItem("accessToken");
    }
  },
  created() {
    window.addEventListener("scroll", () => {
      this.bottom = this.bottomVisible();
    });
    if (this.id && this.count) {
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
      axios.get(`/books?_sort=id&_order=desc&authorID=${this.id}&_page=${this.count}&_limit=10`).then(result => {
        this.$store.commit("SET_LOADER", false);
        console.log(result, `id:  ${this.id}`, `count:  ${this.count}`);
        this.count++;
        for (let i = 0; i < result.data.length; i++) {
            this.books.push(result.data[i]);
        }
      });
      this.$store.commit("SET_LOADER", true);
    }
  },
  watch: {
    bottom(bottom) {
      if (bottom) {
        this.addBook();
      }
    },
    id: function(val) {
      if (val) {
        this.addBook();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.user {
  box-sizing: border-box;
  margin: 2rem;
  width: 20rem;
}

.feed {
  display: grid;
  grid-template-columns: 25rem 1fr;
}

.booksList {
  margin: 1rem;
}

.userBooks {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0 0 3rem;
}

.bookPreview {
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 20rem;
}

.routerLink {
  color: #000;
  text-decoration: none;
}

.loader {
  bottom: 0;
  position: fixed;
}

.loaderContent {
  left: 50%;
  top: 50%;
}
</style>
