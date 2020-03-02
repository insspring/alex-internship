<template>
  <div class="booksComments">
    <div class="comments" v-for="comment in comments" :key="comment.id">
      <div class="userImage">
        <img :src="user.image" alt="userImage" class="userImage" />
      </div>
      <div class="userInfo">
          <div class="info">
        <h3>
          {{ user.name }}
        </h3>
        <p>
            {{ new Date(comment.date).getDay() + 1}}
            .{{ new Date(comment.date).getMonth() + 1 }}
            .{{ new Date(comment.date).getFullYear() }}
            {{ new Date(comment.date).getHours() }}
            : {{ new Date(comment.date).getMinutes() }}
        </p>
          </div>
          <div class="comment">
        {{ comment.comment }}
          </div>
      </div>
    </div>
    <div class="addComment">
      <label>
        <textarea v-model="text"></textarea>
      </label>
    </div>
    <ButtonGreen
      :text="$t('addComment')"
      :method="addComment"
      class="button--green"
    >
    </ButtonGreen>
  </div>
</template>

<script>
import axios from "axios";
import ButtonGreen from "./ButtonGreen";
import { addcomment } from "../helpers/api";
import Comment from "../helpers/comment";

export default {
  name: "BooksComments",
  components: { ButtonGreen },
  created() {
    axios.get("comments").then(result => (this.comments = result.data));
  },
  data() {
    return {
      comments: [],
      text: "",
        time: ""
    };
  },
  computed: {
    user() {
      return this.$store.getters.USER;
    },
  },
  methods: {
    addComment() {
      this.comment = new Comment(this.text, this.user.id);
      addcomment(this.comment);
    }
  }
};
</script>

<style lang="scss" scoped>
    .comments {
        display: grid;
        grid-template-columns: 5rem 40rem;
    }

    .userImage {
        border-radius: 50%;
        width: 5rem;
    }

    .userInfo {
        display: flex;
        flex-direction: column;
    }

    .info {
        display: flex;
        flex-direction: row;
        align-items: baseline;
    }

    .comment {
        display: flex;
        padding: 1rem;
    }
</style>
