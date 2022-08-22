import { createRouter, createWebHashHistory } from "vue-router";
// pages
import HomePage from "../pages/HomePage.vue";
import Signin from "../pages/Signin.vue";
import Signup from "../pages/Signup.vue";
import FoodDetail from "../pages/FoodDetail.vue";
import AddRecipe from "../pages/AddRecipe.vue";
import { userLoginStore } from "../store/store";

const token = window.localStorage.getItem("token");

const routes = [
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
