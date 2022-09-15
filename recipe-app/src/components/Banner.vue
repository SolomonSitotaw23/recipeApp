<script setup>
import { inject, ref } from "vue";

const myEl = ref(600);
const smoothScroll = inject("smoothScroll");
const scrollToAllRecipe = () => {
  smoothScroll({
    scrollTo: myEl.value,
  });
};
</script>

<template>
  <section class="header-banner h-96 w-full bg-yellow-50">
    <div class="flex flex-col items-center justify-center h-full">
      <h1
        class="text-center text-3xl md:text-4xl lg:text-5xl poppins font-semibold text-blue-700"
      >
        Solo Food Recipe Sharing
      </h1>
      <slot />
    </div>
  </section>
</template>

<style scoped></style>
