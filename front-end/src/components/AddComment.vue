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

export default {
  name: "AddComment",
  components: { ButtonGreen },
  data() {
    return {
      text: "",
      notValid: false
    };
  },
  methods: {
    isValid() {
      this.notValid = false;
    },
    addComment() {
      if (this.text) {
        this.comment = new Comment(this.text, this.bookID, this.user.id);
        addcomment(this.comment);
        let like = new Likes([].push(this.userID));
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
}

.notValid {
  background-color: $c-lightpink;
  border-bottom: 0.3rem solid $c-red;
}

.button--green {
  width: 10rem;
}
</style>
