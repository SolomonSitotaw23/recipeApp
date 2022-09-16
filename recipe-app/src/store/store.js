import { defineStore } from "pinia";
import { apolloClient } from "../main";

export const userLoginStore = defineStore("user", {
  state: () => ({
    userId: "",
    isLoggedIn: false,
    foods: [],
    currentUser: {},
  }),
  getters: {},
  actions: {
    async login(token, userId, currentUser) {
      this.isLoggedIn = true;
      this.userId = userId;
      this.currentUser = currentUser;
      localStorage.setItem("token", token);
      this.router.push("/");
    },
    async logout() {
      localStorage.clear();
      window.localStorage.removeItem("token");
      sessionStorage.clear();
      this.isLoggedIn = false;
      this.router.push({ name: "signin" });
      // clearing apollo cache after log out
      apolloClient.cache.data.clear();
    },
    async addFoods(...foods) {
      this.foods = foods;
    },
  },
  persist: {
    enabled: true,
  },
});

export const addRecipeStore = defineStore("recipeTobeAdded", {
  state: () => ({
    recipe: {},
  }),
  getters: {},
  actions: {
    async addRecipeToBeAdded(recipe) {
      this.recipe = recipe;
    },
  },
  persist: {
    enabled: true,
  },
});
