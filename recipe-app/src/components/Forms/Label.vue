<script setup>
const props = defineProps({
  text: String,
});
</script>

<template>
  <label htmlFor="title" className="text-gray-500 poppins">{{ text }}</label>
</template>

<style scoped></style>
