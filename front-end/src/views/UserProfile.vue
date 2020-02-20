<template>
  <div class="userProfile">
    <HeaderLayout></HeaderLayout>
    <div class="feed">
      <div class="userInfo">
    <UserInfo class="user"></UserInfo>
    <UserSettings class="user"></UserSettings>
      </div>
    <div class="books">
    <div class="booksList" v-for="book in books" v-bind:key="book.id">
      <img :src="book.cover" class="bookImage"/>
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
  </div>
</template>

<script>
/*import { signinUser } from "../helpers/api";*/
import HeaderLayout from "../components/HeaderLayout";
import UserSettings from "../components/userSettings";
import UserInfo from "../components/userInfo";
import axios from "axios";

export default {
  name: "UserProfile",
  components: { UserInfo, UserSettings, HeaderLayout },
  data: function () {
    return {
      books: [],
    }
  },
  created: function() {
    axios
            .get("/books")
            .then(result => {
                      console.log(result.data);
                      this.books = result.data;
                      this.books.sort(function(a, b) {
                        return b.date - a.date;
                      });
              console.log(this.book);
                    }
            )
  },
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

.books {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.booksList {
  margin: 1rem;;
}

.bookImage {
  width: 10rem;
}
</style>
