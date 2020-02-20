<template>
  <div class="userSettings">
    <label>
      <img src="../assets/settings/books.svg" alt="Books" class="icon" />
      <ButtonBasic
              :text="$t('addBook')"
              :method="activePopupBooks"></ButtonBasic>
    </label>
    <label>
      <img src="../assets/settings/logout.svg" alt="Books" class="icon" />
      <router-link :to="'/books'">My books</router-link>
    </label>
    <label>
      <img src="../assets/settings/edit.svg" alt="Edit" class="icon" />
      <router-link :to="'/settings'">Edit profile</router-link>
    </label>
    <label>
      <img src="../assets/settings/logout.svg" alt="Log Out" class="icon" />
      <router-link :to="'/feed'">Log Out</router-link>
    </label>
    <div class="addBooks" v-if="activeBooks">
      <h2>
        Add new book!
      </h2>
      <div class="book">
        <label>
          <input class="title" type="text" v-model="title">
        </label>
        <label>
          <textarea v-model="description"></textarea>
        </label>
        <label>
          <input
                  type="file"
                  @change="previewFiles"
          />
        </label>
        <ButtonBasic
                :text="$t('addBook')"
                :method="addBooks">
        </ButtonBasic>
      </div>
    </div>
  </div>
</template>

<script>
  import { addbook } from "../helpers/api";
  import ButtonBasic from "./ButtonBasic";

export default {
  name: "userSettings",
  components: {ButtonBasic},
  data: function() {
    return {
      book: [],
      title: "",
      description: "",
      cover: "",
      activeBooks: false
    }
  },
  methods: {
    addBooks() {
      this.createBooks();
      addbook(this.book);
    },
    createBooks() {
      this.book = {
        title: this.title,
        description: this.description,
        cover: localStorage.getItem("bookImage"),
        authorID: this.$store.getters.USER_ID,
        date: Date.now(),
      }
    },
    activePopupBooks() {
      this.activeBooks = true;
    },
    previewFiles(event) {
      if (event.target.files[0]) {
        let reader = new FileReader();
        var input = event.target;
        let dataURL;
        reader.onload = function(){
          dataURL = reader.result;
          localStorage.setItem("bookImage", dataURL);
        };
        reader.readAsDataURL(input.files[0]);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
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
  margin: 0 auto;
  width: 25%;
}
</style>
