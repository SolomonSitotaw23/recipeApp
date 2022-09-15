import { createRouter, createWebHashHistory } from "vue-router";
// pages
import HomePage from "../pages/HomePage.vue";
import Search from "../pages/Search.vue";
import Signin from "../pages/Signin.vue";
import Signup from "../pages/Signup.vue";
import FoodDetail from "../pages/FoodDetail.vue";
import AddRecipe from "../pages/AddRecipe.vue";
import { userLoginStore } from "../store/store";
import MyFavorites from "../pages/MyFavorites.vue";
import Error from "../pages/Error.vue";
import imageUpload from "../components/imageUpload/imageUpload.vue";
const token = window.localStorage.getItem("token");

const routes = [
  {
    path: "/:pathMatch(.*)*",
    name: "error",
    component: Error,
  },
  {
    path: "/",
    name: "homePage",
    component: HomePage,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/signIn",
    name: "signin",
    component: Signin,
  },
  {
    path: "/addRecipe",
    name: "addRecipe",
    component: AddRecipe,
  },
  {
    path: "/foodDetail/:id",
    name: "FoodDetail",
    component: FoodDetail,
  },
  {
    path: "/imageUpload",
    name: "imageUpload",
    component: imageUpload,
  },
  {
    path: "/favorites",
    name: "favorites",
    component: MyFavorites,
  },
  {
    path: "/search/:keyword",
    name: "search",
    component: Search,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;

router.beforeEach(async (to, from) => {
  const user = userLoginStore();
  const isLoggedIn = user.isLoggedIn;
  if (!isLoggedIn && to.name !== "signin" && to.name !== "signup") {
    return { name: "signin" };
  }
});
