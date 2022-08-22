import { defineStore } from "pinia";
import { useRouter } from "vue-router";
const router = useRouter();
export const userLoginStore = defineStore("user", {
  state: () => ({
    userId: "",
    isLoggedIn: false,
    foods: [],
  }),
  getters: {},
  actions: {
    async login(token, userId) {
      this.isLoggedIn = true;
      this.userId = userId;
      window.localStorage.setItem("token", token);
    },
    async logout() {
      this.isLoggedIn = false;
      window.localStorage.removeItem("token");
      this.router.push({ name: "signin" });
    },
    async addFoods(...foods) {
      this.foods = foods;
    },
  },
  persist: {
    enabled: true,
  },
});
