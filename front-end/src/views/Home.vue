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
          <div class="booksList" v-for="book in books" v-bind:key="book.id">
            <BookPreview
              :src="book.cover"
              :title="book.title"
              class="bookPreview"
            ></BookPreview>
            <BookDescription
              v-if="isBookDescription"
              :src="book.cover"
              :title="book.title"
              :author="book.author"
              :description="book.description"
              class="bookPreview"
            ></BookDescription>
          </div>
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
import BookDescription from "../components/BookDescription";

export default {
  name: "home",
  components: {
    BookDescription,
    BookPreview,
    UserInfo
    /*HelloWorld*/
  },
  data: function() {
    return {
      books: [],
      isBookDescription: false
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
</style>
