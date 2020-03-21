<template>
  <div class="addComment">
    <label>
      <textarea
        v-model="text"
        class="commentTeaxtarea"
        v-bind:class="{ notValid: notValid }"
        v-on:keyup="isValid"
      ></textarea>
    </label>
    <ButtonGreen
      :text="$t('addComment')"
      :method="addComment"
      class="button--green"
    >
    </ButtonGreen>
  </div>
</template>

<script>
import ButtonGreen from "./ButtonGreen";
import Comment from "../helpers/comment";
import { addcomment, addCommentLikes } from "../helpers/api";
import Likes from "../helpers/likes";
import axios from "axios";

export default {
  name: "AddComment",
  components: { ButtonGreen },
  created() {
    axios.get("/comments/").then(result => {
      this.commentsLength = result.data.length;
    });
  },
  data() {
    return {
      text: "",
      notValid: false,
      commentsLength: 0
    };
  },
  computed: {
    currentBook() {
      return this.$store.getters.CURRENT_BOOK;
    },
    user() {
      return this.$store.getters.USER;
    }
  },
  methods: {
    isValid() {
      this.notValid = false;
    },
    addComment() {
      if (this.text) {
        this.comment = new Comment(
          this.text,
          this.currentBook.id,
          this.user.id
        );
        addcomment(this.comment);
        let like = new Likes(this.commentsLength + 1);
        addCommentLikes(like);
        this.text = "";
      } else {
        this.notValid = true;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_breakpoints.scss";

.addComment {
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 20rem;
}

.commentTeaxtarea {
  border: 0.1rem solid $c-danube;
  box-sizing: border-box;
  height: 5rem;
  resize: none;
  width: 20rem;

  @media only screen and (max-width: $screen-mobile-max) {
    width: 18rem;
  }
}

.notValid {
  background-color: $c-lightpink;
  border-bottom: 0.3rem solid $c-red;
}

.button--green {
  width: 10rem;
}
</style>
