import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import axios from "axios";
import VueRouter from "vue-router";
import jwt_decode from "jsrsasign";

Vue.use(VueRouter);
Vue.config.productionTip = false;
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.common["authorization"] =
  "bearer " + localStorage.getItem("accessToken");

new Vue({
  router,
  store,
  i18n,
  jwt_decode,
  render: h => h(App)
}).$mount("#app");
