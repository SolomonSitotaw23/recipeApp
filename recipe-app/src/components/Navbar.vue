<script setup>
import { useRoute } from "vue-router";
import { userLoginStore } from "../store/store";
import Button from "./Forms/Button.vue";
import { useRouter } from "vue-router";
import { HomeIcon, LogoutIcon } from "@heroicons/vue/solid";
import Back from "../Router/Back.vue";
import { ref } from "vue";

const user = userLoginStore();

const fullName = user.currentUser.first_name + " " + user.currentUser.last_name;
const logoutHandler = () => {
  const router = useRouter();
  user.logout;
  router.push("/signin");
};

const changeHeader = ref(false);

const onChangeHeader = () => {
  if (window.scrollY >= 50) {
    changeHeader.value = true;
  } else {
    changeHeader.value = false;
  }
};
window.addEventListener("scroll", onChangeHeader);
</script>

<template>
  <header
    :class="
      changeHeader
        ? 'bg-white fixed z-50 top-0 left-0 w-full shadow-md transition duration-500'
        : 'bg-transparent fixed z-50 top-0 left-0 w-full transition duration-500'
    "
  >
    <nav
      class="flex items-center h-20 max-w-screen-xl mx-auto px-6 py-3 justify-between"
    >
      <Back />

      <div
        v-if="user.isLoggedIn"
        class="flex items-center justify-end space-x-6"
      >
        <RouterLink
          to="/favorites"
          class="bg-primary px-6 py-3 text-white poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105"
          >My favorites</RouterLink
        >
        <RouterLink
          to="/addRecipe"
          class="border-primary px-6 py-3 text-primary poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105"
          >+ Add recipe</RouterLink
        >

        <button
          @click="user.logout"
          class="border-primary px-6 py-3 text-primary poppins rounded-full ring-red-300 focus:outline-none focus:ring-4 transform transition duration-700 hover:scale-105"
          text="Logout"
        >
          logout</button
        ><span class="lexend text-primary">{{ fullName }}</span>
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
