import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
/*import UserProfile from "../views/UserProfile";*/
import Settings from "../views/Settings";
import Books from "../views/Books";
import Book from "../components/BookDescription";
import User from "../components/UserDescription";
import Favorite from "../components/FavoriteBooks";

Vue.use(VueRouter);

const routes = [
  {
    path: "/feed",
    name: "feed",
    component: Home,
    meta: {
      title: "Goodreads"
    }
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
    component: Home
  },
  {
    path: "/settings",
    name: "settings",
    component: Settings,
    meta: {
      title: "Settings"
    }
  },
  {
    path: "/books",
    name: "books",
    component: Books,
    meta: {
      title: "Books"
    }
  },
  {
    path: "/favorite",
    name: "favorite",
    component: Favorite,
    meta: {
      title: "Favorite"
    }
  },
  {
    path: "/book/:id",
    name: "book",
    component: Book,
    meta: {
      title: "Books"
    }
  },
  {
    path: "/user/id:id",
    name: "user",
    component: User,
    meta: {
      title: "User"
    }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.afterEach((to) => {
  document.title = to.meta.title;
});

export default router;
