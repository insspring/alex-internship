<template>
  <div class="userInfo" v-if="author">
    <img :src="author.image" alt="user-image'" class="userImage" />
    <h2>
      {{ author.name }}
    </h2>
    <div class="userEmail">
      <h3>{{ $t("email") }}:</h3>
      <p>
        {{ author.email }}
      </p>
    </div>
    <div class="userBooks">
      <h3>{{ $t("subscribers") }}:</h3>
      <p>
        {{ author.subscribers.length }}
      </p>
    </div>
    <div class="userBooks">
      <h3>{{ $t("subscriptions") }}:</h3>
      <p>
        {{ author.subscriptions.length }}
      </p>
    </div>
    <div
      class="userBooks"
      v-if="currentUser.id == id"
      v-on:click="favoriteBooks"
    >
      <h3>{{ $t("favoriteBooks") }}:</h3>
      <p>
        {{ author.favoriteBooks.length }}
      </p>
    </div>
    <ButtonGreen
      :text="$t('Subscribe')"
      :method="subscribe"
      class="button--green"
      v-if="!(currentUser.id == id) && !isSubscribe"
    ></ButtonGreen>
    <ButtonBasic
      :text="$t('Unsubscribe')"
      :method="unsubscribe"
      class="button--green"
      v-if="!(currentUser.id == id) && isSubscribe"
    ></ButtonBasic>
  </div>
</template>

<script>
import { getUser } from "../helpers/api";
import axios from "axios";
import ButtonBasic from "./ButtonBasic";
import ButtonGreen from "./ButtonGreen";

export default {
  name: "userInfo",
  components: { ButtonBasic, ButtonGreen },
  data() {
    return {
      books: [],
      user: {}
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    currentUserId() {
      return this.$store.getters.USER_ID;
    },
    currentUser() {
      return this.$store.getters.USER;
    },
    isSubscribe() {
      let user = this.$store.getters.USER;
      if (user.subscriptions) {
        return user.subscriptions.some(el => Number(el) === Number(this.id));
      } else {
        return false;
      }
    },
    author() {
      return this.$store.getters.AUTHOR;
    },
  },
  created() {
    axios.get(`/books?authorID=${this.id}`).then(result => {
      this.books = result.data;
    });
    getUser(this.id).then(result => {
      this.$store.commit("SET_AUTHOR", result.data);
    });
    getUser(this.currentUserId).then(result => {
      this.$store.commit("SET_USER", result.data);
    });
  },
  methods: {
    subscribe() {
      this.currentUser.subscriptions.push(this.id);
      axios.put(`/users/${this.currentUser.id}`, this.currentUser);
      this.$store.commit("SET_USER", this.currentUser);

      this.author.subscribers.push(this.currentUser.id);
      axios.put(`/users/${this.id}`, this.author);
      this.$store.commit("SET_AUTHOR", this.author);
    },
    unsubscribe() {
      for (let i = 0; i < this.currentUser.subscriptions.length; i++) {
        if (this.currentUser.subscriptions[i] === this.id) {
          this.currentUser.subscriptions.splice(i, 1);
        }
      }
      axios.put(`/users/${this.currentUser.id}`, this.currentUser);
      this.$store.commit("SET_USER", this.currentUser);

      for (let i = 0; i < this.author.subscribers.length; i++) {
        if (this.author.subscribers[i] === this.currentUser.id) {
          this.author.subscribers.splice(i, 1);
        }
      }
      axios.put(`/users/${this.id}`, this.author);
      this.$store.commit("SET_AUTHOR", this.author);
    },
    favoriteBooks() {
      this.$router.push("/favorite");
    }
  }
};
</script>

<style lang="scss" scoped>
  @import "../scss/_breakpoints.scss";

.userInfo {
  align-items: center;
  box-shadow: 0 0 1rem #000;
  border-radius: 1rem;
  display: grid;
  justify-items: center;
  grid-template-columns: 9rem 9rem;
  padding: 1rem;

  @media only screen and (max-width: $screen-mobile-max) {
    grid-template-columns: 8rem 8rem;
    margin: 1rem;
    width: 18rem;
  }
}

.userImage {
  border-radius: 50%;
  width: 5rem;
}

.userBooks {
  cursor: pointer;
}
</style>
