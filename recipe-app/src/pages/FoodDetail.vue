<script setup>
import { useRoute, useRouter } from "vue-router";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { TrashIcon, PlusIcon } from "@heroicons/vue/outline";
import {
  ADD_TO_FAVORITES,
  MY_FAVORITES,
  ONE_RECIPE,
  FAVORITES_WITH_RECIPE_ID,
  REMOVE_FROM_FAVORITES,
  RATE_RECIPE,
  IS_RATED,
  ALL_RECIPE,
  UPDATE_RATING_RECIPE,
} from "../Quires";
import { computed } from "@vue/reactivity";
import Back from "../Router/Back.vue";
import { userLoginStore } from "../store/store";
import Button from "../components/Forms/Button.vue";
import Comment from "../components/comment/Comment.vue";
import Loading from "../components/loading/Loading.vue";
import Disclosure from "../components/Disclosure/Disclosure.vue";
import FoodImageGrid from "../components/FoodImageGrid/FoodImageGrid.vue";
import { onMounted, ref, watch } from "vue";
import Swal from "sweetalert2";
import StarRating from "vue-star-rating";
const food = userLoginStore();
const route = useRoute();
const router = useRouter();
const Rid = computed(() => route.params.id);
const user = userLoginStore();

const {
  mutate: rate,
  onDone: ratingDone,
  loading: ratingLoading,
} = useMutation(RATE_RECIPE);

const {
  mutate: updateRating,
  onDone: updateRatingDone,
  loading: updateRatingLoading,
} = useMutation(UPDATE_RATING_RECIPE);

const { result: isRated, refetch: refetchIsRated } = useQuery(IS_RATED, {
  recipe_id: Rid.value,
});

updateRatingDone((result) => {
  refetchIsRated();
});
ratingDone((result) => {
  refetchIsRated();
});

const isRatedVal = computed(() => {
  return isRated.value?.recipe_by_pk.is_rated;
});

// watch works directly on a ref

const { result: favRecipe, refetch: refetchIsFav } = useQuery(
  FAVORITES_WITH_RECIPE_ID,
  {
    recipe_id: Rid.value,
  },
  {
    update: (cache, { data: { favorites } }) => {
      let data = cache.readQuery({
        query: MY_FAVORITES,
      });
      try {
        data = {
          ...data,
          favorites: [...data.favorites, favorites],
        };
        cache.writeQuery({
          query: MY_FAVORITES,
          data,
        });
      } catch (error) {
        console.log(error);
      }
    },
  }
);
const isFavorite = computed(() => {
  return favRecipe.value?.favorites.length > 0 ? "TRUE" : "";
});

const { result, loading, error, refetch } = useQuery(ONE_RECIPE, {
  id: Rid,
});
var recipeNumber;
const recipe = computed(() => result.value?.recipe_by_pk);
const ratingVal = ref(result.value?.recipe_by_pk.ratings[0].rating);
if (isRatedVal) {
  recipeNumber = computed(() => result.value?.recipe_by_pk.ratings[0].rating);
  // ratingVal.value = recipeNumber;
}

watch(ratingVal, async (newRating, oldRating) => {
  if (isRatedVal.value == false) {
    try {
      console.log("excuting rate");
      rate(
        {
          recipe_id: Rid.value,
          user_id: user.currentUser.id,
          rating: ratingVal.value,
        },
        {
          update: (cache, { data: { insert_rating } }) => {
            let data = cache.readQuery({
              query: ALL_RECIPE,
              variables: {
                limit: 10,
              },
            });
            try {
              data = {
                ...data,
                recipe: [...data.recipe, insert_rating],
              };
              cache.writeQuery({
                query: ALL_RECIPE,
                variables: {
                  limit: 10,
                },
                data,
              });
            } catch (error) {
              console.log(error);
              return;
            }
            return;
            console.log(data);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    updateRating(
      {
        recipe_id: Rid.value,
        user_id: user.currentUser.id,
        rating: ratingVal.value,
      },
      {
        update: (cache, { data: { update_rating } }) => {
          let data = cache.readQuery({
            query: ALL_RECIPE,
            variables: {
              limit: 10,
            },
          });
          try {
            data = {
              ...data,
              recipe: [...data.recipe, update_rating.returning[0].recipe],
            };

            cache.writeQuery({
              query: ALL_RECIPE,
              variables: {
                limit: 10,
              },
              data,
            });
          } catch (error) {
            console.log(error);
            return;
          }
          return;
        },
      }
    );
  }
});

const {
  mutate: addToFavoriteMutation,
  onDone: addToFavDone,
  loading: addToFavoriteLoading,
} = useMutation(ADD_TO_FAVORITES);

addToFavDone((result) => {
  refetchIsFav();
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Added To Favorites",
    showConfirmButton: false,
    timer: 1500,
    width: 300,
  });
  router.push("/favorites");
});

const {
  mutate: removeFromFavoriteMutation,
  onDone: removeFromToFavDone,
  loading: removeFromToFavoriteLoading,
} = useMutation(REMOVE_FROM_FAVORITES);

removeFromToFavDone((result) => {
  refetchIsFav();
  Swal.fire({
    position: "top-end",
    icon: "error",
    title: "Removed From Favorites",
    showConfirmButton: false,
    timer: 1500,
    width: 300,
  });
});
const Favorite = (val) => {
  if (val == "addToFavorite") {
    addToFavoriteMutation(
      {
        recipe_id: Rid.value,
        user_id: user.currentUser.id,
      },
      {
        update: (cache, { data: { insert_favorites_one } }) => {
          let data = cache.readQuery({
            query: MY_FAVORITES,
          });
          try {
            data = {
              ...data,
              favorites: [...data.favorites, insert_favorites_one],
            };
            cache.writeQuery({
              query: MY_FAVORITES,
              data,
            });
          } catch (error) {
            console.log(error);
          }
        },
      }
    );
  } else if (val == "removeFromFavorites") {
    removeFromFavoriteMutation(
      {
        recipe_id: Rid.value,
        user_id: user.currentUser.id,
      },
      {
        update: (cache, { data: { delete_favorites } }) => {
          let data = cache.readQuery({
            query: MY_FAVORITES,
          });
          try {
            data = {
              ...data,
              favorites: data.favorites.filter(
                (favorites) => favorites.id !== delete_favorites.returning.id
              ),
            };
            cache.writeQuery({
              query: MY_FAVORITES,
              data,
            });
          } catch (error) {
            console.log(error);
          }
        },
      }
    );
  }
};
</script>

<template>
  <Loading text="loading" v-if="loading" class="my-auto" />
  <!-- <section class="flex items-center justify-between flex-col"> -->
  <main v-if="result" class="max-w-screen-xl mx-auto px-6 my-16">
    <div class="flex flex-col justify-center items-center lg:h-screen">
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
          <p class="lexend ml-2 mb-2">
            it takes {{ recipe.preparation_time }} minutes to cook
          </p>
          <div>
            <Disclosure
              title="Ingredients"
              :value="
                recipe.ingredients[0]
                  ? recipe.ingredients[0].ingredients
                  : `no ingredients`
              "
              listStyle="list-disc"
            />
            <Disclosure
              title="Steps to cook"
              :value="
                recipe.steps[0] ? recipe.steps[0].steps : `no steps to cook`
              "
              listStyle="list-decimal"
            />
          </div>

          <StarRating
            class="mt-12 text-xs text-primary flex justify-between items-center"
            active-color="#4D4DFF"
            :rounded-corners="true"
            :star-size="30"
            v-model:rating="ratingVal"
            :increment="0.25"
          />
          <p
            v-if="updateRatingLoading || ratingLoading"
            class="text-xs text-primary ml-2"
          >
            Rating ...
          </p>
          <p v-else-if="isRatedVal" class="text-xs text-primary ml-2">
            you've rated this recipe
            <span class="text-red-700">{{ recipeNumber }}</span> before
          </p>
          <p v-else-if="!isRatedVal" class="text-xs text-primary ml-2">
            rate this recipe
          </p>
          <button
            v-if="!isFavorite"
            @click="Favorite('addToFavorite')"
            class="bg-primary flex items-center justify-between self-start text-white px-8 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105"
          >
            <PlusIcon aria-hidden="true" class="w-4" />
            Add to favorites
          </button>
          <button
            v-else
            @click="Favorite('removeFromFavorites')"
            class="bg-red-500 flex items-center justify-between self-start text-white px-8 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105"
            type="button"
          >
            <TrashIcon aria-hidden="true" class="w-4" />
            Remove From Favorites
          </button>
        </div>

        <div class="order-1 md:order-2 lg:order-2">
          <FoodImageGrid
            :images="
              recipe.imagesByRecipeId[0]
                ? recipe.imagesByRecipeId[0].urls
                : `no images`
            "
          />
        </div>
      </div>
    </div>
  </main>
  <span class="text-xs text-gray-300 mx-8 flex">
    go down to give comments on this recipe
  </span>
  <hr class="mx-8 text-primary" />
  <Comment :id="Rid" />
</template>
