<template>
  <div class="bookPreview">
    <div class="booksInvisible" v-if="!accessToken">
      <h1>
        {{ $t("notLogIn") }}
      </h1>
    </div>
    <div class="bookPage" v-if="accessToken">
      <div class="book">
        <div class="editBook" v-if="user">
          <img :src="bookImage" class="bookImage" />
          <ButtonGreen
            :text="$t('editBook')"
            :method="activePopupBooks"
            class="button--green"
            v-if="this.userID === this.authorID"
          ></ButtonGreen>
          <ButtonGreen
            :text="$t('addToFavorite')"
            :method="addToFavorite"
            class="button--green"
            v-if="!(this.userID === this.authorID) && !isInFavorite"
          ></ButtonGreen>
          <ButtonBasic
            :text="$t('removeFromFavorite')"
            :method="removeFromFavorite"
            class="button--green"
            v-if="!(this.userID === this.authorID) && isInFavorite"
          ></ButtonBasic>
          <StarRating></StarRating>
        </div>
        <div class="aboutBook">
          <h2>
            {{ currentBook.title }}
          </h2>
          <p>{{ $t("author") }}: {{ author }}</p>
          <p>
            {{ $t("whoAddBook") }}:
            <router-link
              :to="'/user/id' + authorID"
              :key="userID"
              class="routerLink"
            >
              {{ authorName }}
            </router-link>
          </p>
          <p>
            {{ description }}
          </p>
        </div>
      </div>
      <AddBook
        v-if="activeBooks"
        :action="$t('editBook')"
        :button="$t('edit')"
        :action-book="$t('editedBook')"
      ></AddBook>
      <ShadowScreen v-if="activeBooks" :method="inactiveBooks"></ShadowScreen>
      <AddComment></AddComment>
      <BookComments
        v-for="comment in currentBook.comments"
        :key="comment.id"
        :currentBook="currentBook"
        :comment="comment"
      ></BookComments>
    </div>
  </div>
</template>

<script>
import { getbook, getUser } from "../helpers/api";

import AddBook from "./AddBook";
import ButtonGreen from "./ButtonGreen";
import ButtonBasic from "./ButtonBasic";
import ShadowScreen from "./ShadowScreen";
import axios from "axios";
import BookComments from "./BookComments";
import StarRating from "./StarRating";
import AddComment from "./AddComment";

export default {
  name: "BookDescription",
  components: {
    AddComment,
    StarRating,
    BookComments,
    ButtonBasic,
    ButtonGreen,
    AddBook,
    ShadowScreen
  },
  data() {
    return {
      title: "",
      author: "",
      description: "",
      bookImage: "",
      activeBooks: false,
      authorName: "",
      responseUser: {},
      isInFavorite: false
    };
  },
  created() {
    this.displayBook();
  },
  methods: {
    activePopupBooks() {
      this.activeBooks = true;
    },
    inactiveBooks: function() {
      this.activeBooks = false;
    },
    async addToFavorite() {
      let user = {};
      await getUser(this.userID).then(result => {
        user = result.data;
      });
      user.favoriteBooks.push(this.id);
      await axios.put(`/users/${this.userID}`, user);
      this.$store.commit("SET_USER", user);
    },
    async removeFromFavorite() {
      let user = {};
      await getUser(this.userID).then(result => {
        user = result.data;
      });
      for (let i = 0; i < user.favoriteBooks.length; i++) {
        if (user.favoriteBooks[i] === this.id) {
          user.favoriteBooks.splice(i, 1);
        }
      }
      await axios.put(`/users/${this.userID}`, user);
      this.$store.commit("SET_USER", user);
    },
    async displayBook() {
      await axios
        .get(`/books/${this.id}?_embed=comments`)
        .then(result => this.$store.commit("SET_CURRENT_BOOK", result.data));
      const response = await getbook(this.id).then(result => result.data);
      this.bookImage = response.cover;
      this.title = response.title;
      this.author = response.author;
      this.description = response.description;
      this.$store.commit("SET_BOOK_IMAGE", response.cover);
      this.$store.commit("SET_AUTHOR_ID", response.authorID);
      this.responseUser = await getUser(this.authorID).then(
        result => result.data
      );
      this.authorName = this.responseUser.name;
      this.favorite();
      /*getUser(this.userID).then(result =>
        this.$store.commit("SET_USER", result.data)
      );*/
    },
    favorite() {
      if (
        this.user.favoriteBooks &&
        this.user.favoriteBooks.some(el => Number(el) === Number(this.id))
      ) {
        this.isInFavorite = true;
      }
    }
  },
  computed: {
    loader() {
      return this.$store.getters.LOADER;
    },
    id() {
      return this.$route.params.id;
    },
    userID() {
      return this.$store.getters.USER_ID;
    },
    authorID() {
      return this.$store.getters.AUTHOR_ID;
    },
    user() {
      return this.$store.getters.USER;
    },
    /* isInFavorite() {
      return this.user.favoriteBooks.some(el => Number(el) === Number(this.id));
    },*/
    comments() {
      return this.$store.getters.COMMENTS;
    },
    currentBook() {
      return this.$store.getters.CURRENT_BOOK;
    },
    accessToken() {
      return localStorage.getItem("accessToken");
    }
  },
  watch: {
    id() {
      this.displayBook();
    },
    user() {
      this.isInFavorite = this.user.favoriteBooks.some(
        el => Number(el) === Number(this.id)
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_breakpoints.scss";

.bookPreview {
  display: flex;
  flex-direction: column;
  margin: 1rem;

  @media only screen and (max-width: $screen-mobile-max) {
    margin: 1rem 0;
  }
}

.book {
  display: flex;

  @media only screen and (max-width: $screen-mobile-max) {
    flex-direction: column;
  }
}

.editBook {
  @media only screen and (max-width: $screen-mobile-max) {
    align-items: center;
    display: flex;
    flex-direction: column;
  }
}

.bookImage {
  width: 10rem;
}

.aboutBook {
  font-size: x-large;
}

.routerLink {
  color: #2c3e50;
  text-decoration: none;
}

.addComment {
  @media only screen and (max-width: $screen-mobile-max) {
    width: 100%;
  }
}

.commentTeaxtarea {
  @media only screen and (max-width: $screen-mobile-max) {
    width: 15rem;
  }
}

.userInfo {
  @media only screen and (max-width: $screen-mobile-max) {
    width: 5rem;
  }
}
</style>
