import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import UserProfile from "../views/UserProfile";
import Settings from "../views/Settings";
import Books from "../views/Books";
import Book from "../components/BookDescription";
import User from "../components/UserDescription";

Vue.use(VueRouter);

const routes = [
  {
    path: "/feed",
    name: "feed",
    component: Home
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/",
    name: "home",
    component: UserProfile
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings
  },
  {
    path: "/books",
    name: "books",
    component: Books
  },
  {
    path: "/book/:id",
    name: "book",
    component: Book
  },
  {
    path: "/user/:id",
    name: "user",
    component: User
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
