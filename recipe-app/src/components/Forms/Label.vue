<script setup>
const props = defineProps({
  text: String,
});
</script>

<template>
  <label htmlFor="title" class="text-gray-500 poppins">{{ text }}</label>
</template>

<style scoped></style>
