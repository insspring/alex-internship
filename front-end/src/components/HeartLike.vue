<template>
  <div class="heartLike">
    <p>{{ likesLength }}</p>
    <div
      class="heart"
      @click="countLike"
      :class="{ liked: isLiked }"
    ></div>
  </div>
</template>

<script>
  import _ from 'lodash';
import axios from "axios";

export default {
  name: "HeartLike",
  created() {
    axios
      .get(`/comments/${this.comment.id}?_embed=commentsLikes`)
      .then(result => {
        this.currentComment = result.data;
        console.log(this.comment);
        if (result.data.commentsLikes[0]) {
          this.likesLength = result.data.commentsLikes[0].usersID.length;
        }
        if (
          result.data.commentsLikes[0].usersID.some(
            el => Number(el) === Number(this.currentUser.id)
          )
        ) {
          this.isLiked = true;
        }
      });
  },
  props: {
    comment: {
      type: Object
    }
  },
  data() {
    return {
      users: [],
      currentComment: "",
      likesLength: 0,
      isLiked: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.getters.USER;
    }
  },
  methods: {
    countLike() {
      if (this.isLiked) {
        this.likesLength--;
      } else {
        this.likesLength++;
      }
      this.isLiked = !this.isLiked;
      this.addLike();
    },
    addLike:
      _.debounce(function () {
      this.like();
    }, 1000),
    like() {
      let comment = this.currentComment.commentsLikes[0];
      if (
        comment.usersID.some(
          el => Number(el) === Number(this.currentUser.id)
        ) &&
        comment.usersID.length
      ) {
        for (let i = 0; i < comment.usersID.length; i++) {
          comment.usersID.splice(i, 1);
          axios.put(`/commentsLikes/${this.comment.id}`, comment);
          /*this.isLiked = false;
          this.likesLength--;*/
        }
      } else {
        comment.usersID.push(this.currentUser.id);
        axios.put(`/commentsLikes/${this.comment.id}`, comment);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../scss/_variables.scss";
@import "../scss/_mixins.scss";

.heartLike {
  display: flex;
  justify-content: center;
}

.heart {
  background-color: $c-lightpink;
  display: flex;
  height: 1rem;
  justify-content: center;
  position: relative;
  top: 0;
  transform: rotate(-45deg);
  width: 1rem;
}

.heart:before,
.heart:after {
  content: "";
  background-color: $c-lightpink;
  border-radius: 50%;
  cursor: pointer;
  height: 1rem;
  position: absolute;
  width: 1rem;
}

.heart:before {
  top: -0.55rem;
  left: 0;
}

.heart:after {
  left: 0.55rem;
  top: 0;
}

.heart:hover,
.heart:hover:after,
.heart:hover:before,
.liked,
.liked:after,
.liked:before {
  background-color: $c-red;
}
</style>
