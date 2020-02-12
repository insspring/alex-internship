import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    name: "",
  },
  getters: {
    NAME: state => {
      return state.name;
    },
  },
  mutations: {
    SET_NAME: (state, payload) => {
      state.name = payload;
    },
  },
  actions: {},
  modules: {}
});
