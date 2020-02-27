<template>
  <div class="home">
    <div class="userHome">
      <div class="userInfo">
        <UserInfo class="user"></UserInfo>
      </div>
      <div class="userBooks">
        <h1>
          {{ $t("feed") }}
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
// @ is an alias to /src
/*import HelloWorld from "@/components/HelloWorld.vue";*/
import BookPreview from "../components/BookPreview";
import UserInfo from "../components/userInfo";
import axios from "axios";
import PageLoader from "../components/PageLoader";

export default {
  name: "home",
  components: {
    PageLoader,
    BookPreview,
    UserInfo
    /*HelloWorld*/
  },
  data: function() {
    return {
      books: [],
      bottom: false,
      isBookDescription: false,
      count: 1
    };
  },
  computed: {
    loader: function() {
      return this.$store.getters.LOADER;
    }
  },
  created: function() {
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
      axios.get(`/books?_sort=id&_order=desc&_page=${this.count}&_limit=10`).then(result => {
        this.$store.commit("SET_LOADER", false);
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

.userHome {
  display: flex;
}

.booksList {
  margin: 1rem;
}

.userBooks {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
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
