<template>
  <div class="booksComments">
    <div class="addComment" v-if="!alreadyComment">
      <label>
        <textarea v-model="text" v-bind:class="{ notValid: notValid }" v-on:keyup="isValid"></textarea>
      </label>
      <ButtonGreen
              :text="$t('addComment')"
              :method="addComment"
              class="button--green"
      >
      </ButtonGreen>
    </div>
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
            {{ new Date(comment.date).getDay() + 1 }}
            .{{ new Date(comment.date).getMonth() + 1 }} .{{
            new Date(comment.date).getFullYear()
            }}
            {{ new Date(comment.date).getHours() }}
            : {{ new Date(comment.date).getMinutes() }}
          </p>
          <span>
            {{ comment.likes.length }}
          </span>
          <span class="heart" :class="{ liked: isLiked }" v-on:click="addLike(comment.id)"></span>
        </div>
        <div class="comment">
          {{ comment.comment }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";
  import ButtonGreen from "./ButtonGreen";
  import { addcomment } from "../helpers/api";
  import Comment from "../helpers/comment";

  export default {
    name: "BooksComments",
    components: {ButtonGreen },
    created() {
      this.addComments();
    },
    data() {
      return {
        text: "",
        time: "",
        notValid: false,
        count: 1,
        bottom: false,
        alreadyComment: false,
        isLiked: false
      };
    },
    computed: {
      user() {
        return this.$store.getters.USER;
      },
      bookID() {
        return this.$route.params.id;
      },
      loader() {
        return this.$store.getters.LOADER;
      },
      comments() {
        return this.$store.getters.COMMENTS;
      }
    },
    methods: {
      addComment() {
        if (this.text) {
          this.comment = new Comment(this.text, this.bookID, this.user.id);
          addcomment(this.comment);
          this.text = "";
          this.alreadyComment = true;
        } else {
          this.notValid = true;
        }
      },
      addComments() {
        let comments = [];
        axios.get(`comments?_sort=id&_order=desc&bookID=${this.bookID}&_page=${this.count}&_limit=10`).then(result => {
          this.$store.commit("SET_LOADER", false);
          this.count++;
          for (let i = 0; i < result.data.length; i++) {

            comments.push(result.data[i]);
            if (result.data[i].userID === this.user.id) {
              this.alreadyComment = true;
            }
            if (result.data[i].likes.some(el => Number(el) === Number(this.user.id))) {
              this.isLiked = true;
            }
          }
          this.$store.commit("SET_COMMENTS", comments);
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
      addLike(id) {
        let comments = this.comments;
        if (comments[id - 1].likes.some(el => Number(el) === Number(this.user.id))) {
          comments[id - 1].likes.splice(id - 1, 1);
          axios.put(`/comments/${id}`, comments[id - 1]);
          this.isLiked = false;
        } else {
          comments[id - 1].likes.push(this.user.id);
          axios.put(`/comments/${id}`, comments[id - 1]);
          this.isLiked = true;
        }
        this.$store.commit("SET_COMMENTS", comments)
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
    display: flex;
    flex-direction: row;
    align-items: baseline;
  }

  .comment {
    display: flex;
    padding: 1rem;
  }

  .notValid {
    background-color: $c-lightpink;
    border-bottom: 0.3rem solid $c-red;
  }

  .heart {
    background-color: $c-lightpink;
    display: inline-block;
    height: 30px;
    margin: 0 10px;
    position: relative;
    top: 0;
    transform: rotate(-45deg);
    width: 30px;

    /* & :hover {
       background-color: $c-red;
     }*/
  }

  .heart:before,
  .heart:after {
    content: "";
    background-color: $c-lightpink;
    border-radius: 50%;
    cursor: pointer;
    height: 30px;
    position: absolute;
    width: 30px;

    /*& :hover {
      background-color: $c-red;
    }*/
  }

  .heart:before {
    top: -15px;
    left: 0;
  }

  .heart:after {
    left: 15px;
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
