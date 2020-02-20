import Vue from "vue";
import Vuex from "vuex";
import jwt_decode from "jwt-decode";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    users: [],
    userName: "Perry the Platypus",
    userEmail: "",
    userPassword: "",
    userDefaultImage: localStorage.getItem("userImage"),
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
    }
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
    }
  },
  actions: {},
  modules: {}
});
