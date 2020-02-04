import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import i18n from "./i18n";
import axios from "axios";

Vue.config.productionTip = false;
axios.defaults.baseURL = "http://localhost:3000";

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
