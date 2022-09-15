<script setup></script>

<template>
  <div
    class="animate-pulse bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative"
  >
    <span
      class="bg-gray-100 border border-gray-500 rounded-full px-4 py-1 inline-block mb-4"
    ></span>
    <div
      class="w-64 h-48 bg-gray-200 mx-auto transform transition duration-300 hover:scale-105"
    ></div>
    <div class="flex flex-col items-center my-3 space-y-2">
      <div class="w-36 bg-gray-300 py-3"></div>
      <p class="w-72 bg-gray-200 py-1"></p>
      <div class="w-24 bg-gray-200 py-2"></div>
      <button
        class="bg-gray-400 text-white px-8 py-3 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105"
      ></button>
    </div>
  </div>
</template>

<style scoped></style>
