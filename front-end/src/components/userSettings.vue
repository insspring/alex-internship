<template>
  <div class="userSettings">
    <label>
      <ButtonBasic
        :text="$t('addBook')"
        :method="activePopupBooks"
        class="button--green"
      >
      </ButtonBasic>
    </label>
    <label>
      <img src="../assets/settings/edit.svg" alt="Edit" class="icon" />
      <router-link :to="'/settings'" class="router-link">{{
        $t("editProfile")
      }}</router-link>
    </label>
    <div class="addBooks" v-if="activeBooks">
      <h2>{{ $t("addNewBook") }}!</h2>
      <div class="book">
        <label class="book-label">
          <p>
            {{ $t("title") }}
          </p>
          <input class="title addBooksInput" type="text" v-model="title" />
        </label>
        <label class="book-label">
          <p>
            {{ $t("author") }}
          </p>
          <input class="title addBooksInput" type="text" v-model="author" />
        </label>
        <label class="book-label">
          <p>
            {{ $t("description") }}
          </p>
          <textarea
            v-model="description"
            class="addBooksInput addBooksTextArea"
          ></textarea>
        </label>
        <label class="book-label">
          <input type="file" @change="previewFiles" />
        </label>
        <ButtonBasic
          :text="$t('addBook')"
          :method="addBooks"
          class="button--green"
        >
        </ButtonBasic>
      </div>
    </div>
    <ShadowScreen
      v-if="activeBooks"
      :method="inactiveBooks"
      class="mobileScreenSize"
    ></ShadowScreen>
  </div>
</template>

<script>
import { addbook } from "../helpers/api";
import ButtonBasic from "./ButtonBasic";
import ShadowScreen from "./ShadowScreen";

export default {
  name: "userSettings",
  components: {
    ButtonBasic,
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
        date: Date.now()
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
  }
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

.addBooks {
  background-color: $c-cornsilk;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  margin: 5rem auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: 25%;
  z-index: 103;
}

.book {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
}

.book-label {
  margin: 0 auto;
}

.router-link {
  color: $c-danube;
  cursor: pointer;
  margin: 1rem;
  text-decoration: none;
}

.button--green {
  background-color: $c-mediumseagreen;
  color: #fff;

  &:hover {
    background-color: $c-brightgreen;
  }
}

.addBooksInput {
  box-sizing: border-box;
  border: none;
  height: 1.5rem;
  width: 15rem;
}

.addBooksTextArea {
  height: 5rem;
  resize: none;
}
</style>
