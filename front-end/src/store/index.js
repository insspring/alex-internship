import Vue from "vue";
import Vuex from "vuex";
import jwt_decode from "jwt-decode";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: "",
    users: [],
    userName: "Alexey Moiseenko"
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
    }
  },
  actions: {},
  modules: {}
});
