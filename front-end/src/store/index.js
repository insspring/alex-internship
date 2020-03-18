import Vue from "vue";
import Vuex from "vuex";
import jwt_decode from "jwt-decode";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    user: {},
    users: [],
    userName: "Perry the Platypus",
    userEmail: "perry@fbi.com",
    userPassword: "",
    userDefaultImage:
      "https://upload.wikimedia.org/wikipedia/en/d/dc/Perry_the_Platypus.png",
    userID: "",
    loader: true,
    bookImage: "https://arm256.com/jspui/image/default-cover-item.jpg",
    author: {},
    authorID: "",
    comments: [],
    book: {},
    books: [],
    likes: [],
    currentBook: {},
    suggestResult: [],
    uploadImage: "",
    userFavoriteBooks: [],
    authorSubscribersLength: "",
    authorSubscriptionsLength: "",
    authorFavoriteBooksLength: ""
  },
  getters: {
    TOKEN: state => {
      return jwt_decode(state.token);
    },
    USER: state => {
      return state.user;
    },
    USERS: state => {
      return state.users;
    },
    USER_NAME: state => {
      return state.userName;
    },
    USER_EMAIL: state => {
      return state.userEmail;
    },
    USER_PASSWORD: state => {
      return state.userPassword;
    },
    USER_DEFAULT_IMAGE: state => {
      return state.userDefaultImage;
    },
    USER_IMAGE: state => {
      return state.userImage;
    },
    USER_ID: state => {
      return state.userID;
    },
    LOADER: state => {
      return state.loader;
    },
    BOOK_IMAGE: state => {
      return state.bookImage;
    },
    AUTHOR: state => {
      return state.author;
    },
    AUTHOR_ID: state => {
      return state.authorID;
    },
    COMMENTS: state => {
      return state.comments;
    },
    BOOK: state => {
      return state.book;
    },
    BOOKS: state => {
      return state.books;
    },
    LIKES: state => {
      return state.likes;
    },
    CURRENT_BOOK: state => {
      return state.currentBook;
    },
    SUGGEST_RESULT: state => {
      return state.suggestResult;
    },
    UPLOAD_IMAGE: state => {
      return state.uploadImage;
    },
    USER_FAVORITE_BOOKS: state => {
      return state.userFavoriteBooks;
    },
    AUTHOR_SUBSCRIBERS_LENGTH: state => {
      return state.authorSubscribersLength;
    },
    AUTHOR_SUBSCRIPTIONS_LENGTH: state => {
      return state.authorSubscriptionsLength;
    },
    AUTHOR_FAVORITE_BOOKS_LENGTH: state => {
      return state.authorFavoriteBooksLength;
    }
  },
  mutations: {
    SET_TOKEN: (state, payload) => {
      state.token = payload;
    },
    SET_USER: (state, payload) => {
      state.user = payload;
    },
    SET_USERS: (state, payload) => {
      state.users = payload;
    },
    SET_USER_NAME: (state, payload) => {
      state.userName = payload;
    },
    SET_USER_EMAIL: (state, payload) => {
      state.userEmail = payload;
    },
    SET_USER_PASSWORD: (state, payload) => {
      state.userPassword = payload;
    },
    SET_USER_DEFAULT_IMAGE: (state, payload) => {
      state.userDefaultImage = payload;
    },
    SET_USER_IMAGE: (state, payload) => {
      state.userImage = payload;
    },
    SET_USER_ID: (state, payload) => {
      state.userID = payload;
    },
    SET_LOADER: (state, payload) => {
      state.loader = payload;
    },
    SET_BOOK_IMAGE: (state, payload) => {
      state.bookImage = payload;
    },
    SET_AUTHOR: (state, payload) => {
      state.author = payload;
    },
    SET_AUTHOR_ID: (state, payload) => {
      state.authorID = payload;
    },
    SET_COMMENTS: (state, payload) => {
      state.comments = payload;
    },
    SET_BOOK: (state, payload) => {
      state.book = payload;
    },
    SET_BOOKS: (state, payload) => {
      state.books = payload;
    },
    SET_LIKES: (state, payload) => {
      state.likes = payload;
    },
    SET_CURRENT_BOOK: (state, payload) => {
      state.currentBook = payload;
    },
    SET_SUGGEST_RESULT: (state, payload) => {
      state.suggestResult = payload;
    },
    SET_UPLOAD_IMAGE: (state, payload) => {
      state.uploadImage = payload;
    },
    SET_USER_FAVORITEBOOKS: (state, payload) => {
      state.userFavoriteBooks = payload;
    },
    SET_AUTHOR_SUBSCRIBERS_LENGTH: (state, payload) => {
      state.authorSubscribersLength = payload;
    },
    SET_AUTHOR_SUBSCRIPTIONS_LENGTH: (state, payload) => {
      state.authorSubscriptionsLength = payload;
    },
    SET_AUTHOR_FAVORITE_BOOKS_LENGTH: (state, payload) => {
      state.authorFavoriteBooksLength = payload;
    }
  },
  actions: {},
  modules: {}
});
