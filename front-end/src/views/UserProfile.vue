<template>
  <div class="userProfile">
    <HeaderLayout></HeaderLayout>
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
          <div class="booksList" v-for="book in books" v-bind:key="book.id">
            <BookPreview
              :src="book.cover"
              :title="book.title"
              class="bookPreview"
            ></BookPreview>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLayout from "../components/HeaderLayout";
import UserSettings from "../components/userSettings";
import UserInfo from "../components/userInfo";
import BookPreview from "../components/BookPreview";
import axios from "axios";

export default {
  name: "UserProfile",
  components: { UserInfo, UserSettings, HeaderLayout, BookPreview },
  data: function() {
    return {
      books: [],
      accessToken: localStorage.getItem("accessToken")
    };
  },
  created: function() {
    axios.get("/books").then(result => {
      this.books = result.data;
      this.books.sort(function(a, b) {
        return b.date - a.date;
      });
    });
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
</style>
