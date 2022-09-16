<script setup>
import { ref } from "vue";

import { useQuery } from "@vue/apollo-composable";

import { computed } from "@vue/reactivity";
import FoodItem from "../components/FoodsShowCase/FoodItem.vue";
import Loading from "../components/loading/Loading.vue";
import { MY_FAVORITES } from "../Quires";
import { userLoginStore } from "../store/store";
import NodataFound from "../components/NodataFound/NodataFound.vue";

const { result, loading, error, refetch } = useQuery(MY_FAVORITES);

const favorites = computed(() => result.value?.favorites);

const NoFoods = computed(() => {
  return result.value?.favorites.length > 0 ? "" : "True";
});
</script>

<template>
  <div class="flex items-center justify-center space-x-6 mt-20 py-6">
    <h1 class="text-3xl font-black lexend text-primary">Favorite Foods</h1>
  </div>
  <section v-if="loading" class="my-12 max-w-screen-xl mx-auto px-6">
    <Loading text="loading" />
  </section>

  <section v-else-if="NoFoods">
    <NodataFound text="You have no favorite recipe" />
  </section>

  <section v-else class="my-12 max-w-screen-xl mx-auto px-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
      <div v-for="favorite in favorites" :key="favorite.id">
        <FoodItem
          :id="favorite.recipe.id"
          :title="favorite.recipe.title"
          :description="favorite.recipe.description"
          :preparation_time="favorite.recipe.preparation_time"
          :category="favorite.recipe.food_category"
          :numberOfLikes="
            favorite.recipe.user_who_likes_aggregate.aggregate.count
          "
          :imagePreview="favorite.recipe.imagesByRecipeId[0].urls"
        />
      </div>
    </div>
  </section>
</template>
