<script setup>
import { ref } from "vue";
import Skeleton from "./Skeleton.vue";
import FoodItem from "./FoodItem.vue";
import { useQuery } from "@vue/apollo-composable";
import { ALLFOODS } from "../../Quires";
import { userLoginStore } from "../../store/store";

const food = userLoginStore();

const { result, loading, error, onResult } = useQuery(ALLFOODS, {
  fetchPolicy: "network-only",
});

onResult((queryResult) => {
  food.addFoods(queryResult.data.food);
});
</script>

<template>
  <section className="my-12 max-w-screen-xl mx-auto px-6">
    <div className="flex items-center justify-center space-x-6">
      <h1 className="text-3xl font-black">ALL FOODS</h1>
    </div>

    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12"
    >
      <div v-for="food in food.foods[0]" :key="food.id">
        <FoodItem
          :id="food.id"
          :image="food.image"
          :title="food.title"
          :description="food.description"
          :timeItTakes="food.timeItTakes"
        />
      </div>
    </div>
  </section>
</template>

<style scoped></style>
