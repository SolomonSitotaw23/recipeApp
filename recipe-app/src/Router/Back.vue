<script setup>
import { ArrowNarrowLeftIcon } from "@heroicons/vue/solid";

const props = defineProps({
  text: String,
});
</script>

<template>
  <div class="relative">
    <RouterLink
      to="/"
      class="hover:underline poppins text-gray-700 select-none flex items-center space-x-2"
    >
      <ArrowNarrowLeftIcon
        class="w-8 text-black font-light cursor-pointer"
        aria-hidden="true"
      />
      Home
    </RouterLink>
  </div>
</template>

<style scoped></style>
