<script setup>
import { ref } from "vue";

import { useQuery } from "@vue/apollo-composable";
import { ALL_RECIPE } from "../../Quires";
import { userLoginStore } from "../../store/store";
import { computed } from "@vue/reactivity";
import FoodItem from "./FoodItem.vue";
import Loading from "../loading/Loading.vue";
const paginationValues = ref({
  limit: 6,
  offset: 0,
});

const { result, loading, error, refetch } = useQuery(ALL_RECIPE, {
  limit: paginationValues.value.limit,
  offset: paginationValues.value.offset,
});

const nextPage = (pageNum) => {
  // paginationValues.value.limit = 6;
  paginationValues.value.offset = 6 * pageNum;

  console.log(paginationValues.value.offset);
};

const recipes = computed(() => result.value?.recipe);
</script>

<template>
  <Loading v-if="loading" />
  <section className="my-12 max-w-screen-xl mx-auto px-6">
    <div className="flex items-center justify-center space-x-6">
      <h1 className="text-3xl font-black">ALL FOODS</h1>
    </div>

    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12"
    >
      <div v-for="recipe in recipes" :key="recipe.id">
        <FoodItem
          :id="recipe.id"
          :title="recipe.title"
          :description="recipe.description"
          :preparation_time="recipe.preparation_time"
        />
      </div>
    </div>
  </section>
  <section class="py-4">
    <div class="flex justify-center">
      <nav aria-label="Page navigation example">
        <ul class="flex list-style-none">
          <li class="page-item disabled">
            <a
              class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-500 pointer-events-none focus:shadow-none"
              href="#"
              tabindex="-1"
              aria-disabled="true"
              >Previous</a
            >
          </li>
          <li class="page-item active">
            <a
              class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
              >1</a
            >
          </li>
          <li class="page-item">
            <a
              class="page-link relative block py-1.5 px-3 rounded border-0 bg-blue-600 outline-none transition-all duration-300 rounded text-white hover:text-white hover:bg-blue-600 shadow-md focus:shadow-md"
              href="#"
              >2 <span class="visually-hidden"></span
            ></a>
          </li>
          <li class="page-item">
            <a
              class="page-link relative block py-1.5 px-3 rounded border-0 bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              href="#"
              >3</a
            >
          </li>
          <li class="page-item">
            <a
              class="page-link relative block py-1.5 px-3 rounded border-0 cursor-pointer bg-transparent outline-none transition-all duration-300 rounded text-gray-800 hover:text-gray-800 hover:bg-gray-200 focus:shadow-none"
              @click="nextPage(1)"
              >Next</a
            >
          </li>
        </ul>
      </nav>
    </div>
  </section>
</template>

<style scoped></style>
