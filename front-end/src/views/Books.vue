<template>
  <div class="books">
    <HeaderLayout></HeaderLayout>
    <div class="booksInvisible" v-if="!accessToken">
      <h1>
        {{ $t("notLogIn") }}
      </h1>
    </div>
    <div class="booksVisible" v-if="accessToken">
      <h1 v-if="!books.length">{{ $t("noBooks") }}</h1>
      <div class="booksList" v-for="book in books" v-bind:key="book.id">
        <img :src="book.cover" class="bookImage" />
        <div class="aboutBook">
          <p>
            {{ book.title }}
          </p>
          <p>
            {{ book.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderLayout from "../components/HeaderLayout";
import axios from "axios";
export default {
  name: "Book",
  components: { HeaderLayout },
  data: function() {
    return {
      books: [],
      accessToken: localStorage.getItem("accessToken")
    };
  },
  created: function() {
    axios.get("/books").then(result => {
      console.log(result.data);
      this.books = result.data;
    });
  }
};
</script>

<style lang="scss" scoped>
.bookImage {
  width: 10rem;
}

.booksVisible {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.booksList {
  margin: 1rem;
}
</style>
