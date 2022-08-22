<script setup>
const props = defineProps({
  text: String,
});
</script>

<template>
  <div className="relative top-8">
    <RouterLink
      to="/"
      className="hover:underline poppins text-gray-700 select-none flex items-center space-x-2"
      ><MdOutlineKeyboardBackspace /> <span>Back</span></RouterLink
    >
  </div>
</template>

<style scoped></style>
