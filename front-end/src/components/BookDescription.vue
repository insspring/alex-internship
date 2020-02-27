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
                v-if="!(this.userID === this.authorID)"
        ></ButtonGreen>
    </div>
    <div class="aboutBook">
      <h2>
        {{ title }}
      </h2>
      <p>
        {{ $t('author') }}: {{ author }}
      </p>
      <p>
        {{ $t('whoAddBook') }}:
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
  </div>
</template>

<script>
import { getbook, getUser } from "../helpers/api";

import AddBook from "./AddBook";
import ButtonGreen from "./ButtonGreen";
import ShadowScreen from "./ShadowScreen";
import axios from "axios";

export default {
  name: "BookDescription",
  components: { ButtonGreen, AddBook, ShadowScreen },
  data() {
    return {
      id: this.$router.currentRoute.params["id"],
      title: "",
      author: "",
      description: "",
      bookImage: "",
      activeBooks: false,
      authorID: "",
      authorName: "",
    };
  },
  async created() {
    const response = await getbook(this.id).then(result => result.data);
    this.bookImage = response.cover;
    this.title = response.title;
    this.author = response.author;
    this.description = response.description;
    this.$store.commit("SET_BOOK_IMAGE", response.cover);
    this.authorID = response.authorID;
    this.$store.commit("SET_AUTHOR_ID", response.authorID);
    const responseUser = await getUser(this.authorID).then(result => result.data);
    this.authorName = responseUser.name;
  },
  async beforeUpdate() {
    const response = await getbook(this.id).then(result => result.data);
    this.bookImage = response.cover;
    this.title = response.title;
    this.author = response.author;
    this.description = response.description;
    this.$store.commit("SET_BOOK_IMAGE", response.cover);
    this.authorID = response.authorID;
    this.$store.commit("SET_AUTHOR_ID", response.authorID);
    const responseUser = await getUser(this.authorID).then(result => result.data);
    this.authorName = responseUser.name;
  },
  methods: {
    activePopupBooks() {
      this.activeBooks = true;
    },
    inactiveBooks: function() {
      this.activeBooks = false;
    },
    async addToFavorite() {
      let user = {}
      await getUser(this.userID).then(result => {
        console.log(result)
        user = {
          name: result.data.name,
          email: result.data.email,
          password: result.data.password,
          image: result.data.image,
          id: result.data.id,
          favoriteBooks: result.data.favoriteBooks = (this.id)
        }
      });
      await axios.put(`/users/${this.userID}`, user);
    },
  },
  computed: {
    loader: function() {
      return this.$store.getters.LOADER;
    },
    userID() {
      return this.$store.getters.USER_ID
    },
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
