<template>
  <div class="home">
    <div class="userHome">
      <div class="userInfo" v-if="!accessToken">
        <img src="../assets/goodreads.png" alt="goodreads" class="mainImage" />
      </div>
      <div class="userBooks" v-if="accessToken">
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
        </div>
        <PageLoader
          v-if="loader"
          :class="{ loaderContent: this.books.length === 0 }"
          class="loader"
        ></PageLoader>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
/*import HelloWorld from "@/components/HelloWorld.vue";*/
import BookPreview from "../components/BookPreview";
import axios from "axios";
import PageLoader from "../components/PageLoader";

export default {
  name: "home",
  components: {
    PageLoader,
    BookPreview
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
    accessToken() {
      return localStorage.getItem("accessToken");
    },
    loader() {
      return this.$store.getters.LOADER;
    },
    userImage() {
      return this.$store.getters.USER_DEFAULT_IMAGE;
    },
    name() {
      return this.$store.getters.USER_NAME;
    },
    email() {
      return this.$store.getters.USER_EMAIL;
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
      axios
        .get(`/books?_sort=id&_order=desc&_page=${this.count}&_limit=10`)
        .then(result => {
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
@import "../scss/_variables.scss";
@import "../scss/_breakpoints.scss";

.user {
  box-sizing: border-box;
  margin: 2rem;
  width: 20rem;
}

.userHome {
  display: flex;
}

.userInfo {
  margin: 1rem auto;
}

.mainImage {
  width: 100%;
}

.booksList {
  margin: 1rem;
}

.userBooks {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 0 auto;
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
  left: 45%;
  top: 30%;

  @media only screen and (max-width: $screen-mobile-max) {
    left: 40%;
  }

  @media only screen and (min-width: $screen-desktop-min) {
    left: 47%;
  }
}
</style>
