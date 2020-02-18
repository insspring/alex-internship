import Vue from "vue";
import Vuex from "vuex";
import jwt_decode from "jwt-decode";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    users: [],
    userName: "Alexey Moiseenko",
    userImage: "../assets/user-image.jpg",
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
    USER_IMAGE: state => {
      return state.userImage;
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
    SET_USER_IMAGE: (state, payload) => {
      state.userImage = payload;
    }
  },
  actions: {},
  modules: {}
});
