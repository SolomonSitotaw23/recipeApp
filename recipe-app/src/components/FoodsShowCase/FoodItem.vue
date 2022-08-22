<script setup>
const props = defineProps({
  id: String,
  title: String,
  image: String,
  description: String,
  foodType: String,
  timeItTakes: String,
});
</script>

<template>
  <div
    className="bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative"
  >
    <img
      className="w-64 mx-auto transform transition duration-300 hover:scale-105"
      :src="image"
      alt=""
    />
    <div className="flex flex-col items-center my-3 space-y-2">
      <h1 className="text-gray-900 poppins text-lg">{{ title }}</h1>
      <p className="text-gray-500 poppins text-sm text-center">
        {{ description.slice(0, 50) }}
      </p>
      <h2 className="text-gray-900 poppins text-2xl font-bold">
        {{ timeItTakes }}
      </h2>
      <div class="flex flex-row justify-between align-bottom">
        <RouterLink
          :to="{
            name: 'FoodDetail',
            params: {
              id: id,
            },
          }"
          className="bg-primary text-white px-8 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105"
        >
          Recipes
        </RouterLink>
        <button
          type="button"
          class="inline-flex items-center px-8 py-2 text-sm font-medium text-center text-white mt-24 mx-10 bg-blue-700 rounded-full hover:bg-blue-800 focus:ring-4 focus:outline-none dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <ion-icon name="thumbs-up"></ion-icon>
          <span
            class="inline-flex justify-center items-center ml-2 w-4 h-4 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full"
          >
            2
          </span>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
