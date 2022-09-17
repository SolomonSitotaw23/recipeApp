<script setup>
import { ref, onMounted } from "vue";
import { useQuery } from "@vue/apollo-composable";
import { ALL_RECIPE, SEARCH_RECIPE } from "../../Quires";
import { userLoginStore } from "../../store/store";
import { computed } from "@vue/reactivity";
import FoodItem from "./FoodItem.vue";
import Loading from "../loading/Loading.vue";
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from "@headlessui/vue";
import Banner from "../Banner.vue";
import { Form, ErrorMessage, Field } from "vee-validate";
import { useRouter } from "vue-router";
import TextField from "../Forms/TextField.vue";
import NodataFound from "../NodataFound/NodataFound.vue";
import { validateSearch } from "../../Validation/Validation";
const router = useRouter();

const page = ref(0);
const pageSize = ref(10);

const {
  result,
  loading: allRecipeLoading,
  error,
  refetch: refetchAllRecipe,
  fetchMore: fetchMoreP,
} = useQuery(ALL_RECIPE, {
  limit: 10,
});

const recipes = computed(() => result.value?.recipe);
console.log(recipes);

const NoFoods = computed(() => {
  return result.value?.recipe.length > 0 ? "" : "True";
});

const onSubmit = (values) => {
  router.push(`/search/${values.keyword}`);
};

const paginate = (n) => {
  if (n == "next") {
    page.value++;
    fetchMoreP({
      variables: {
        offset: page.value * pageSize.value,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;

        return {
          recipe: [...fetchMoreResult.recipe],
        };
      },
    });
  } else if (n == "prev") {
    page.value--;
    fetchMoreP({
      variables: {
        offset: page.value * pageSize.value,
      },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return previousResult;
        return {
          recipe: [...fetchMoreResult.recipe],
        };
      },
    });
  }
};
</script>

<template>
  <Banner>
    <Form class="flex flex-col items-center" @submit="onSubmit">
      <div
        class="flex rounded-full p-1 box-border mt-8 bg-white overflow-hidden ring-red-300 focus:ring-4 w-96"
      >
        <Field
          type="text"
          value=""
          name="keyword"
          class="rounded-full px-4 focus:outline-none w-full bg-transparent"
          placeholder="Search here ......."
          :rules="validateSearch"
        />

        <button
          class="text-sm bg-primary py-3 px-6 rounded-full text-white poppins ring-red-300 focus:ring-4 transition duration-300 hover:scale-105 transform"
          type="submit"
        >
          Search
        </button>
      </div>

      <ErrorMessage class="text-xs text-left mt-2 text-red-600" name="keyword"
    /></Form>
  </Banner>
  <div class="flex items-center justify-center space-x-6 py-6">
    <h1 class="text-3xl font-black lexend text-primary">ALL FOODS</h1>
  </div>
  <section v-if="allRecipeLoading" class="my-12 max-w-screen-xl mx-auto px-6">
    <Loading text="loading foods" />
  </section>

  <section v-else-if="NoFoods">
    <NodataFound text="No Recipe Found" />
  </section>

  <section v-else class="my-12 max-w-screen-xl mx-auto px-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12">
      <div v-for="recipe in recipes" :key="recipe.id">
        <FoodItem
          :id="recipe.id"
          :title="recipe.title"
          :description="recipe.description"
          :preparation_time="recipe.preparation_time"
          :category="recipe.food_category"
          :userLikedIt="recipe.user_who_likes.user_id"
          :imagePreview="recipe.imagesByRecipeId[0].urls"
          :user_id="recipe.user_id"
          :rating="recipe.average_rating"
        />
      </div>
    </div>
  </section>

  <div class="flex flex-col items-center my-12">
    <div class="flex text-gray-700">
      <button
        class="h-12 w-12 mr-1 flex justify-center items-center rounded-full bg-gray-200 disabled:opacity-50 disabled:hover:bg-gray-200 disabled:cursor-default hover:bg-gray-300 cursor-pointer"
        :disabled="!page"
        @click="paginate('prev')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-chevron-left w-6 h-6 poppins"
        >
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>
      <div class="flex h-12 font-medium rounded-full bg-gray-200">
        <div
          class="w-12 flex justify-center items-center cursor-pointer leading-5 transition duration-150 ease-in rounded-full bg-primary text-white"
        >
          {{ page + 1 }}
        </div>
      </div>
      <div
        class="h-12 w-12 ml-1 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer"
        @click="paginate('next')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
          height="100%"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="feather feather-chevron-right w-6 h-6"
        >
          <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
