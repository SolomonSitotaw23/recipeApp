<script setup>
import { useRoute } from "vue-router";
import { useQuery } from "@vue/apollo-composable";
import { ONE_RECIPE } from "../Quires";
import { computed } from "@vue/reactivity";
import Back from "../Router/Back.vue";
import { userLoginStore } from "../store/store";
import Button from "../components/Forms/Button.vue";
import Comment from "../components/comment/Comment.vue";
import Loading from "../components/loading/Loading.vue";
const food = userLoginStore();

const route = useRoute();
const Rid = computed(() => route.params.id);
console.log(Rid);

const { result, loading, error, refetch } = useQuery(ONE_RECIPE, {
  id: Rid,
});

const recipe = computed(() => result.value?.recipe_by_pk);
</script>

<template>
  <Loading v-if="loading" />
  <main v-else-if="result" class="max-w-screen-xl mx-auto px-6 my-16">
    <div class="flex flex-col justify-center items-center h-screen">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
        <div class="order-2 md:order-1 lg:order-1 flex flex-col justify-center">
          <h1
            class="text-center md:text-left lg:text-left text-3xl lg:text-4xl font-semibold poppins pb-4 text-gray-700 select-none"
          >
            {{ recipe.title }}
          </h1>
          <h1 class="w-full text-lg font-black">Description</h1>
          <p
            class="text-center md:text-left lg:text-left text-sm poppins text-gray-500 leading-relaxed select-none mb-6"
          >
            {{ recipe.description }}
          </p>
          <div>
            <h1 class="w-full text-lg font-black">Ingredients</h1>
            <p
              class="text-center md:text-left lg:text-left text-sm poppins text-gray-500 leading-relaxed select-none"
            >
              {{ recipe.ingredients[0] }}
            </p>
          </div>
          <Button
            className="bg-primary self-start text-white px-8 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105"
            text="Add to Favorite"
          >
          </Button>
        </div>

        <div class="order-1 md:order-2 lg:order-2">
          <img
            src="https://red-onion-restaurant-41dbe.web.app/assets/Breakfast/breakfast1.png"
            class="w-3/4 md:w-3/4 lg:w-full mx-auto"
            alt="food"
          />
        </div>
      </div>
    </div>
    <Comment />
  </main>
</template>
