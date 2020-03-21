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
    <div class="userBooks" v-on:click="subscribers">
      <h3>{{ $t("subscribers") }}:</h3>
      <p>
        {{ subscribersLength }}
      </p>
    </div>
    <div class="userBooks" v-on:click="subscriptions">
      <h3>{{ $t("subscriptions") }}:</h3>
      <p>
        {{ authorSubscriptionsLength }}
      </p>
    </div>
    <div
      class="userBooks"
      v-if="currentUserId == id"
      v-on:click="favoriteBooks"
    >
      <h3>{{ $t("favoriteBooks") }}:</h3>
      <p>
        {{ authorFavoriteBooksLength }}
      </p>
    </div>
    <ButtonGreen
      :text="$t('Subscribe')"
      :method="countSubscribers"
      class="button--green"
      v-if="!(currentUserId == id) && !isSubscribe"
    ></ButtonGreen>
    <ButtonBasic
      :text="$t('Unsubscribe')"
      :method="countSubscribers"
      class="button--green"
      v-if="!(currentUserId == id) && isSubscribe"
    ></ButtonBasic>
  </div>
</template>

<script>
import { getUser } from "../helpers/api";
import axios from "axios";
import ButtonBasic from "./ButtonBasic";
import ButtonGreen from "./ButtonGreen";
import _ from "lodash";

export default {
  name: "userInfo",
  components: { ButtonBasic, ButtonGreen },
  data() {
    return {
      books: [],
      user: {},
      author: {},
      isSubscribe: false,
      subscribersLength: 0
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
    authorSubscribersLength() {
      return this.$store.getters.AUTHOR_SUBSCRIBERS_LENGTH;
    },
    authorSubscriptionsLength() {
      return this.$store.getters.AUTHOR_SUBSCRIPTIONS_LENGTH;
    },
    authorFavoriteBooksLength() {
      return this.$store.getters.AUTHOR_FAVORITE_BOOKS_LENGTH;
    }
  },
  created() {
    axios.get(`/books?authorID=${this.id}`).then(result => {
      this.books = result.data;
    });
    getUser(this.id).then(result => {
      this.author = result.data;
      this.subscribersLength = result.data.subscribers.length;
      this.$store.commit(
        "SET_AUTHOR_SUBSCRIBERS_LENGTH",
        result.data.subscribers.length
      );
      this.$store.commit(
        "SET_AUTHOR_SUBSCRIPTIONS_LENGTH",
        result.data.subscriptions.length
      );
      this.$store.commit(
        "SET_AUTHOR_FAVORITE_BOOKS_LENGTH",
        result.data.favoriteBooks.length
      );
    });
    getUser(this.currentUserId).then(result => {
      this.$store.commit("SET_USER", result.data);
    });
  },
  methods: {
    getAuthor() {
      getUser(this.id).then(result => {
        this.author = result.data;
        this.$store.commit("SET_AUTHOR", result.data);
        this.$store.commit(
          "SET_AUTHOR_SUBSCRIBERS_LENGTH",
          result.data.subscribers.length
        );
        this.$store.commit(
          "SET_AUTHOR_SUBSCRIPTIONS_LENGTH",
          result.data.subscriptions.length
        );
        this.$store.commit(
          "SET_AUTHOR_FAVORITE_BOOKS_LENGTH",
          result.data.favoriteBooks.length
        );
      });
    },
    countSubscribers() {
      if (this.currentUserId) {
        if (this.isSubscribe) {
          this.subscribersLength--;
        } else {
          this.subscribersLength++;
        }
        this.isSubscribe = !this.isSubscribe;
        this.addSubscribers();
      }
    },
    addSubscribers: _.debounce(function() {
      this.subscribe();
    }, 1000),
    subscribe() {
      if (
        this.author.subscribers.some(
          el => Number(el) === Number(this.currentUserId)
        )
      ) {
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
      } else {
        this.currentUser.subscriptions.push(this.id);
        axios.put(`/users/${this.currentUser.id}`, this.currentUser);
        this.$store.commit("SET_USER", this.currentUser);

        this.author.subscribers.push(this.currentUser.id);
        axios.put(`/users/${this.id}`, this.author);
        this.$store.commit("SET_AUTHOR", this.author);
      }
    },
    favoriteBooks() {
      this.$router.push("/favorite");
    },
    subscribers() {
      if (this.currentUserId) {
        this.$router.push(`/user/id${this.id}/subscribers`);
      }
    },
    subscriptions() {
      if (this.currentUserId) {
        this.$router.push(`/user/id${this.id}/subscriptions`);
      }
    }
  },
  watch: {
    id() {
      this.getAuthor();
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
