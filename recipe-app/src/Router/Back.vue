<script setup>
import { ArrowNarrowLeftIcon } from "@heroicons/vue/solid";

const props = defineProps({
  text: String,
});
</script>

<template>
  <div className="relative top-8">
    <RouterLink
      to="/"
      className="hover:underline poppins text-gray-700 select-none flex items-center space-x-2"
    >
      <ArrowNarrowLeftIcon
        class="w-8 text-blue-400 cursor-pointer"
        aria-hidden="true"
      />
    </RouterLink>
  </div>
</template>

<style scoped></style>
