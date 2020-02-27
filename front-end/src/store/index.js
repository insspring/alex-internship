import Vue from "vue";
import Vuex from "vuex";
import jwt_decode from "jwt-decode";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    users: [],
    userName: "Perry the Platypus",
    userEmail: "perry@fbi.com",
    userPassword: "",
    userDefaultImage:
      "https://upload.wikimedia.org/wikipedia/en/d/dc/Perry_the_Platypus.png",
    userID: "",
    loader: true,
    bookImage: "https://arm256.com/jspui/image/default-cover-item.jpg",
    authorID: ""
  },
  getters: {
    TOKEN: state => {
      return jwt_decode(state.token);
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
    AUTHOR_ID: state => {
      return state.authorID;
    },
  },
  mutations: {
    SET_TOKEN: (state, payload) => {
      state.token = payload;
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
    SET_AUTHOR_ID: (state, payload) => {
      state.authorID = payload;
    },
  },
  actions: {},
  modules: {}
});
