<template>
  <div class="bookPreview">
    <div class="editBook">
      <img :src="userImage" class="bookImage" />
      <ButtonGreen
              :text="$t('editBook')"
              :method="activePopupBooks"
              class="button--green"
              v-if="this.userID === this.authorID"
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
        {{ $t('whoAddBook') }}: {{ author }}
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
import { getbook } from "../helpers/api";
import AddBook from "./AddBook";
import ButtonGreen from "./ButtonGreen";
import ShadowScreen from "./ShadowScreen";

export default {
  name: "BookDescription",
  components: { ButtonGreen, AddBook, ShadowScreen },
  data() {
    return {
      id: this.$router.currentRoute.params["id"],
      title: "",
      author: "",
      description: "",
      userImage: "",
      activeBooks: false,
      authorID: ""
    };
  },
  async created() {
    const response = await getbook(this.id).then(result => result.data);
    this.userImage = response.cover;
    this.title = response.title;
    this.author = response.author;
    this.description = response.description;
    this.$store.commit("SET_BOOK_IMAGE", response.cover);
    this.authorID = response.authorID
  },
  async beforeUpdate() {
    const response = await getbook(this.id).then(result => result.data);
    this.userImage = response.cover;
    this.title = response.title;
    this.author = response.author;
    this.description = response.description;
    this.$store.commit("SET_BOOK_IMAGE", response.cover);
    this.authorID = response.authorID
  },
  methods: {
    activePopupBooks() {
      this.activeBooks = true;
    },
    inactiveBooks: function() {
      this.activeBooks = false;
    }
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
</style>
