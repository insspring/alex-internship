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

export default {
  name: "UserProfile",
  components: { UserInfo, UserSettings, BookPreview },
  data: function() {
    return {
      books: [],
      accessToken: localStorage.getItem("accessToken"),
      pageBottom: false,
      pageYOffset: 0
    };
  },
  created: function() {
    axios.get("/books?_page=1&_limit=7").then(result => {
      this.books = result.data;
      this.books.sort(function(a, b) {
        return b.date - a.date;
      });
    });
  },
  watch: {
    pageYOffset: function() {
      let scrollHeight = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.offsetHeight,
        document.body.clientHeight,
        document.documentElement.clientHeight
      );
      if (window.pageYOffset + 800 >= scrollHeight) {
        alert("KKK");
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
</style>
