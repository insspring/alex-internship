<template>
  <div class="booksComments">
    <div class="addComment" v-if="!alreadyComment">
      <label>
        <textarea
          v-model="text"
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
    <div class="userImage">
      <img
        :src="commentUsers[comment.userID - 1].image"
        alt="userImage"
        class="userImage"
      />
    </div>
    <div class="userInfo">
      <div class="info">
        <h3 class="userName">
          {{ commentUsers[comment.userID - 1].name }}
        </h3>
        <p class="date">
          {{ new Date(comment.date).getDay() + 1 }}
          .{{ new Date(comment.date).getMonth() + 1 }} .{{
            new Date(comment.date).getFullYear()
          }}
          {{ new Date(comment.date).getHours() }}
          : {{ new Date(comment.date).getMinutes() }}
        </p>
        <!--<span class="likesNumber">
            {{ comment.likes.length }}
          </span>-->
        <span class="heart" v-on:click="addLike(comment.id)"></span>
      </div>
      <div class="comment">
        <p v-if="!(edit && comment.userID === user.id)">
          {{ comment.comment }}
        </p>
        <label>
          <input
            v-if="edit && comment.userID === user.id"
            v-model="commentText"
            class="commentInput"
          />
        </label>
        <a
          href="#"
          v-on:click="editComment(comment.id)"
          v-if="comment.userID === user.id"
          >Edit</a
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ButtonGreen from "./ButtonGreen";
import { addcomment, addCommentLikes } from "../helpers/api";
import Comment from "../helpers/comment";
import Likes from "../helpers/likes";

export default {
  name: "BooksComments",
  components: { ButtonGreen },
  created() {
    this.addComments();
    axios
      .get(`/users`)
      .then(result => this.$store.commit("SET_USERS", result.data));
  },
  data() {
    return {
      text: "",
      time: "",
      notValid: false,
      count: 1,
      bottom: false,
      alreadyComment: false,
      isLiked: false,
      edit: false,
      commentText: ""
    };
  },
  computed: {
    user() {
      return this.$store.getters.USER;
    },
    commentUsers() {
      return this.$store.getters.USERS;
    },
    bookID() {
      return this.$route.params.id;
    },
    loader() {
      return this.$store.getters.LOADER;
    },
    comments() {
      return this.$store.getters.COMMENTS;
    },
    likes() {
      return this.$store.getters.LIKES;
    }
  },
  methods: {
    addComment() {
      if (this.text) {
        this.comment = new Comment(this.text, this.bookID, this.user.id);
        addcomment(this.comment);
        let like = new Likes([].push(this.userID));
        addCommentLikes(like);
        this.text = "";
        this.alreadyComment = true;
      } else {
        this.notValid = true;
      }
    },
    addComments() {
      let comments = [];
      let likes = [];
      axios
        .get(
          `/comments?_sort=id&_order=asc&bookID=${this.bookID}&_page=${this.count}&_limit=10`
        )
        .then(result => {
          this.$store.commit("SET_LOADER", false);
          this.count++;
          for (let i = 0; i < result.data.length; i++) {
            comments.push(result.data[i]);
            /*if (result.data[i].user.id === this.user.id) {
              this.alreadyComment = true;
            }*/
            /*if (result.data[i].likes.some(el => Number(el) === Number(this.user.id))) {
              this.isLiked = true;
            }*/
          }
          this.$store.commit("SET_COMMENTS", comments);
          this.$store.commit("SET_LIKES", likes);
        });
      this.$store.commit("SET_LOADER", true);
    },
    isValid() {
      this.notValid = false;
    },
    bottomVisible() {
      const scrollY = window.scrollY;
      const visible = document.documentElement.clientHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const bottomOfPage = visible + scrollY >= pageHeight;
      return bottomOfPage || pageHeight < visible;
    },
    addLike() {
      /*if (this.comments[id - 1].likes.some(el => Number(el) === Number(this.user.id))) {
          this.comments[id - 1].likes.splice(id - 1, 1);
          this.$store.commit("SET_COMMENTS", this.comments);
          //axios.put(`/comments/${id}`, comments[id - 1]);
          this.isLiked = false;
        } else {
          this.comments[id - 1].likes.push(this.user.id);
          this.$store.commit("SET_COMMENTS", this.comments);
          //axios.put(`/comments/${id}`, comments[id - 1]);
          this.isLiked = true;
        }*/
      let like = new Likes(this.user.id);
      addCommentLikes(like);
      //this.$store.commit("SET_COMMENTS", comments)
    },
    editComment(id) {
      for (let i = 0; i < this.comments.length; i++) {
        if (id === this.comments[i].id) {
          if (this.edit) {
            let comment = this.comments[i];
            comment.comment = this.commentText;
            axios.put(`/comments/${id}`, comment);
            this.edit = false;
          } else {
            this.commentText = this.comments[i].comment;
            this.edit = true;
          }
        }
      }
    }
  },
  watch: {
    bookID(val) {
      if (val) {
        this.addComment();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_mixins.scss";

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
  align-items: center;
  display: grid;
  grid-template-columns: auto 1fr 5rem 5rem;
}

.userName {
  margin: 0 1rem;
}

.date {
  justify-self: left;
}

.likesNumber {
  justify-self: right;
}

.comment {
  display: flex;
  padding: 1rem;
}

.notValid {
  background-color: $c-lightpink;
  border-bottom: 0.3rem solid $c-red;
}

.liked,
.liked:after,
.liked:before {
  background-color: $c-red;
}

.commentInput {
  border: none;
  outline: none;
}
</style>
