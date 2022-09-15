<script setup>
const props = defineProps({
  text: String,
  isLoading: String,
});
</script>

<template>
  <button
    class="w-full py-3 bg-primary text-white ring-blue-400 focus:outline-none focus:ring-4 mt-6 rounded-lg transition duration-300 poppins disabled:bg-slate-500 self-center"
  >
    {{ text }}
  </button>
</template>

<style scoped></style>
