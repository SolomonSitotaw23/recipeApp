<script setup>
import { useRoute } from "vue-router";
import { userLoginStore } from "../store/store";
import Button from "./Forms/Button.vue";
import { useRouter } from "vue-router";
import { HomeIcon } from "@heroicons/vue/solid";
import Back from "../Router/Back.vue";

const user = userLoginStore();

const logoutHandler = () => {
  const router = useRouter();
  user.logout;
  router.push("/signin");
};
</script>

<template>
  <header
    class="bg-transparent fixed z-50 top-0 left-0 w-full transition duration-500"
  >
    <nav class="flex items-center max-w-screen-xl mx-auto px-6 py-3">
      <div class="flex flex-grow">
        <!-- <h1 class="text-blue-400 font-bold text-xl">Solo Recipe</h1> -->
        <Back />
      </div>

      <div
        v-if="user.isLoggedIn"
        class="flex items-center justify-end space-x-6"
      >
        <RouterLink
          to="/addRecipe"
          class="bg-primary px-6 py-3 text-white poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105"
          >Add recipe</RouterLink
        >
        <Button
          @click="user.logout"
          class="bg-secondary px-6 py-3 text-blue-400 poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105"
          text="Logout"
        >
          logout
        </Button>
      </div>
      <div v-else class="flex items-center justify-end space-x-6">
        <RouterLink to="/signin" class="poppins">Sign In</RouterLink>
        <RouterLink
          to="/signup"
          class="bg-primary px-6 py-3 text-white poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105"
        >
          Sign Up
        </RouterLink>
      </div>
    </nav>
  </header>
</template>

<style scoped></style>
