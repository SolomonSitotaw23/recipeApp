<script setup>
import { ref } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { computed } from "@vue/reactivity";
import FoodItem from "../components/FoodsShowCase/FoodItem.vue";
import Loading from "../components/loading/Loading.vue";
import { SEARCH_RECIPE } from "../Quires";
import { userLoginStore } from "../store/store";
import { useRoute } from "vue-router";
import NodataFound from "../components/NodataFound/NodataFound.vue";

const route = useRoute();
const keyword = computed(() => route.params.keyword);

const { result, loading, error, refetch, fetchMore } = useQuery(SEARCH_RECIPE, {
  keyword: keyword,
});

const searchResults = computed(() => result.value?.search_recipe);

const NoFoods = computed(() => {
  return result.value?.search_recipe.length > 0 ? "" : "True";
});
</script>

<template>
  <div class="flex items-center justify-center space-x-6 mt-20 py-6">
    <h1 class="text-3xl font-black text-primary">Search Result</h1>
  </div>
  <section v-if="loading" class="my-12 max-w-screen-xl mx-auto px-6">
    <Loading text="searching" />
  </section>

  <section v-if="NoFoods">
    <NodataFound :text="'No Recipe Found for query ' + keyword" />
  </section>

  <section v-else class="my-12 max-w-screen-xl mx-auto px-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
      <div v-for="searchResult in searchResults" :key="searchResult.id">
        <FoodItem
          :id="searchResult.id"
          :title="searchResult.title"
          :description="searchResult.description"
          :preparation_time="searchResult.preparation_time"
          :category="searchResult.food_category"
          :numberOfLikes="searchResult.user_who_likes_aggregate.aggregate.count"
          :imagePreview="searchResult.imagesByRecipeId[0].urls"
          :rating="searchResult.average_rating"
        />
      </div>
    </div>
  </section>
</template>
