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
        <div
          class="commentText"
          v-html="checkText(comment.comment)"
          v-if="!(edit && comment.userID === currentUser.id)"
        ></div>
        <label v-if="edit && comment.userID === currentUser.id">
          <CommentTextarea
            v-model="commentText"
            class="commentTextarea"
          ></CommentTextarea>
        </label>
        <p
          class="editLink"
          v-on:click="editComment(comment.id)"
          v-if="comment.userID === currentUser.id"
        >
          {{ $t("edit") }}
        </p>
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
  components: { CommentTextarea, DateView, HeartLike },
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
    },
    checkText(comment) {
      const regex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;
      const com = comment.replace(/(?:\r\n|\r|\n)/g, `<br>`);
      return com.replace(regex, `<a href=$1>$1</a>`);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";

.bookComments {
  display: flex;
  width: 100%;
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
  grid-template-columns: 22rem 10rem 5rem;
}

.userName {
  display: flex;
  justify-items: left;
  margin: 0 1rem;
}

.date {
  justify-self: center;
}

.comment {
  display: grid;
  grid-template-columns: 27rem 8rem;
  padding: 1rem;
  word-break: break-all;
}

.commentText {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.commentTextarea {
  width: 27rem;
}

.editLink {
  color: $c-danube;
  display: grid;
  text-decoration: none;
  width: 100%;
}
</style>
