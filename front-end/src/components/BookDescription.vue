<template>
  <div class="bookPreview">
    <div class="editBook">
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
        {{ title }}
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
    <AddBook
      v-if="activeBooks"
      :action="$t('editBook')"
      :button="$t('edit')"
      :action-book="$t('editedBook')"
    ></AddBook>
    <ShadowScreen v-if="activeBooks" :method="inactiveBooks"></ShadowScreen>
    <BooksComments></BooksComments>
  </div>
</template>

<script>
import { getbook, getUser } from "../helpers/api";

import AddBook from "./AddBook";
import ButtonGreen from "./ButtonGreen";
import ButtonBasic from "./ButtonBasic";
import ShadowScreen from "./ShadowScreen";
import axios from "axios";
import BooksComments from "./BooksComments";
import StarRating from "./StarRating";

export default {
  name: "BookDescription",
  components: {
    StarRating,
    BooksComments,
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
      responseUser: {}
    };
  },
  async created() {
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
  },
  async beforeUpdate() {
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
  },
  computed: {
    loader: function() {
      return this.$store.getters.LOADER;
    },
    currentUser() {
      return this.$store.getters.USER;
    },
    id() {
      return this.$router.currentRoute.params["id"];
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
    isInFavorite() {
      return this.user.favoriteBooks.some(el => Number(el) === Number(this.id));
    }
  }
};
</script>

<style lang="scss" scoped>
.bookPreview {
  display: grid;
  grid-template-columns: 10rem 40em;
  margin: 1rem;
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
</style>
