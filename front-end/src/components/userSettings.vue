<template>
  <div class="userSettings">
    <label>
      <ButtonGreen
        :text="$t('addBook')"
        :method="activePopupBooks"
        class="button--green"
      >
      </ButtonGreen>
    </label>
    <label>
      <img src="../assets/settings/edit.svg" alt="Edit" class="icon" />
      <router-link :to="'/settings'" class="router-link">{{
        $t("editProfile")
      }}</router-link>
    </label>
    <AddBook
      v-if="activeBooks"
      :action="$t('addNewBook')"
      :button="$t('addBook')"
      :action-book="$t('addedBook')"
    ></AddBook>
    <ShadowScreen v-if="activeBooks" :method="inactiveBooks"></ShadowScreen>
  </div>
</template>

<script>
import { addbook } from "../helpers/api";
import ButtonGreen from "./ButtonGreen";
import ShadowScreen from "./ShadowScreen";
import AddBook from "./AddBook";

export default {
  name: "userSettings",
  components: {
    AddBook,
    ButtonGreen,
    ShadowScreen
  },
  data: function() {
    return {
      book: [],
      title: "",
      author: "",
      description: "",
      cover: "",
      activeBooks: false
    };
  },
  methods: {
    addBooks() {
      this.createBooks();
      addbook(this.book);
    },
    createBooks() {
      this.book = {
        title: this.title,
        author: this.author,
        description: this.description,
        cover: localStorage.getItem("bookImage"),
        authorID: this.$store.getters.USER_ID,
        date: Date.now(),
        hashtags: []
      };
    },
    activePopupBooks() {
      this.activeBooks = true;
    },
    previewFiles(event) {
      if (event.target.files[0]) {
        let reader = new FileReader();
        var input = event.target;
        let dataURL;
        reader.onload = function() {
          dataURL = reader.result;
          localStorage.setItem("bookImage", dataURL);
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    inactiveBooks: function() {
      this.activeBooks = false;
    }
  },

};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_mixins.scss";

.userSettings {
  box-shadow: 0 0 1rem #000;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  padding: 1rem;
}
.icon {
  width: 2rem;
}

.router-link {
  color: $c-danube;
  cursor: pointer;
  margin: 1rem;
  text-decoration: none;
}
</style>
