<template>
  <div class="bookComments">
    <div class="userImage">
      <img :src="user.image" alt="userImage" class="userImage" />
    </div>
    <div class="userInfo">
      <div class="info">
        <h3 class="userName">
          {{ user.name }}
        </h3>
        <DateView class="date" :date="comment.date"></DateView>
        <HeartLike :comment="comment"></HeartLike>
      </div>
      <div class="comment">
        <p v-if="!(edit && comment.userID === currentUser.id)">
          {{ comment.comment }}
        </p>
        <label>
          <!--<input
            v-if="edit && comment.userID === currentUser.id"
            v-model="commentText"
            class="commentInput"
          />-->
          <CommentTextarea v-if="edit && comment.userID === currentUser.id" v-model="commentText"></CommentTextarea>
        </label>
        <p

          class="editLink"
          v-on:click="editComment(comment.id)"
          v-if="comment.userID === currentUser.id"
          >{{ $t("edit") }}</p
        >
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import HeartLike from "./HeartLike";
import DateView from "./DateView";
import CommentTextarea from "./CommentTextarea";

export default {
  name: "BookComments",
  components: {CommentTextarea, DateView, HeartLike },
  created() {
    axios
      .get(`/users/${this.comment.userID}`)
      .then(result => (this.user = result.data));
  },
  data() {
    return {
      user: "",
      commentText: "",
      edit: false
    };
  },
  props: {
    currentBook: {
      type: Object
    },
    comment: {
      type: Object
    }
  },
  computed: {
    currentUser() {
      return this.$store.getters.USER;
    }
  },
  methods: {
    editComment(id) {
      if (id === this.comment.id) {
        if (this.edit) {
          let comment = this.comment;
          comment.comment = this.commentText;
          axios.put(`/comments/${id}`, comment);
          this.edit = false;
        } else {
          this.commentText = this.comment.comment;
          this.edit = true;
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.bookComments {
  display: flex;
  width: 30rem;
}

.userImage {
  border-radius: 50%;
  height: 5rem;
  width: 5rem;
}

.userInfo {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.info {
  align-items: center;
  display: grid;
  grid-template-columns: auto 1fr 5rem;
}

.userName {
  margin: 0 1rem;
}

.date {
  justify-self: left;
}

.comment {
  align-items: baseline;
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}

.commentInput {
  border: none;
  border-bottom: 1px solid black;
  outline: none;
}

.editLink {
  color: $c-danube;
  text-decoration: none;
}
</style>
