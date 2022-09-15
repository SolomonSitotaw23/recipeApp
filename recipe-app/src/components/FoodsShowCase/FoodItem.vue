<script setup>
import { HeartIcon, TrashIcon } from "@heroicons/vue/outline";
import {
  ALL_RECIPE,
  DELETE_RECIPE,
  NUMBER_OF_LIKES,
  IS_LIKED,
  INSERT_LIKE,
  UNLIKE,
} from "../../Quires";
import { useQuery, useMutation } from "@vue/apollo-composable";
import { computed } from "@vue/reactivity";
import { ref } from "vue";
import Swal from "sweetalert2";
import { userLoginStore } from "../../store/store";
import Button from "../Forms/Button.vue";
import StarRating from "vue-star-rating";

const currentUser = userLoginStore();
const currentUserId = currentUser.currentUser.id;

const isLiked = ref(false);
const props = defineProps({
  id: String,
  title: String,
  description: String,
  foodType: String,
  preparation_time: String,
  category: String,
  numberOfLikes: Number,
  userLikedIt: String,
  imagePreview: String,
  user_id: String,
});
const ImageUrl = props.imagePreview.split(",");
const imageUrl = `http://localhost:5000/images/recipe/${ImageUrl[0]}`;
const {
  result: numberOfLikesResult,
  loading: numberOfLikesLoading,
  refetch: numberOfLikesRefetch,
  error: numberOfLikesError,
} = useQuery(NUMBER_OF_LIKES, {
  recipe_id: props.id,
});

const numberOfLikes = computed({
  // getter
  get() {
    return numberOfLikesResult.value?.likes_aggregate.aggregate.count;
  },
});

const {
  result: isLikedResult,
  loading: isLikedLoading,
  refetch: isLikedRefetch,
  error: isLikedError,
} = useQuery(IS_LIKED, {
  recipe_id: props.id,
  user_id: currentUserId,
});

// console.log(isLikedResult);
const isLikedVal = computed(() => {
  return isLikedResult.value?.likes.length > 0 ? "TRUE" : "";
});

// !Deleting A Recipe if the user creates it
const {
  mutate: deleteRecipe,
  onDone,
  loading: deleteLoading,
} = useMutation(DELETE_RECIPE);
onDone((result) => {
  Swal.fire("Deleted!", "recipe Deleted Successfully", "success");
});

const HandleDelete = () => {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      deleteRecipe(
        {
          recipe_id: props.id,
        },
        {
          update: (cache, { data: { delete_recipe_by_pk } }) => {
            let data = cache.readQuery({
              query: ALL_RECIPE,
              variables: {
                limit: 10,
              },
            });
            try {
              data = {
                recipe: data.recipe.filter(
                  (recipe) => recipe.id !== delete_recipe_by_pk.id
                ),
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
            }
          },
        }
      );
    }
  });
};
const {
  mutate: like,
  loading: likeLoading,
  error: likeError,
  onDone: likeDone,
} = useMutation(INSERT_LIKE);

const {
  mutate: unlike,
  loading: unlikeLoading,
  error: unlikeError,
  onDone: unlikeDone,
} = useMutation(UNLIKE);

likeDone(() => {
  numberOfLikesRefetch();
});
unlikeDone((result) => {
  numberOfLikesRefetch();
  isLikedRefetch();
});

const HandleLike = (val) => {
  if (val == "Like") {
    like(
      {
        recipe_id: props.id,
        user_id: currentUserId,
      },
      {
        update: (cache, { data: { insert_likes } }) => {
          let data = cache.readQuery({
            query: IS_LIKED,
            variables: { recipe_id: props.id, user_id: currentUserId },
          });

          data = {
            ...data,
            likes: [...data.likes, insert_likes.returning],
          };
          cache.writeQuery({
            query: IS_LIKED,
            variables: { recipe_id: props.id, user_id: currentUserId },
            data,
          });
        },
      }
    );
  } else {
    unlike({
      recipe_id: props.id,
      user_id: currentUserId,
    });
  }
};
</script>

<template>
  <div
    v-if="deleteLoading"
    role="status"
    class="w-full h-full flex items-center justify-center"
  >
    <svg
      aria-hidden="true"
      class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
      viewBox="0 0 100 101"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
        fill="currentColor"
      />
      <path
        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
        fill="currentFill"
      />
    </svg>
    <span class="sr-only">Loading...</span>
  </div>
  <div
    v-else
    class="bg-white border border-gray-100 transition transform duration-700 hover:shadow-xl hover:scale-105 p-4 rounded-lg relative"
  >
    <div class="flex justify-between">
      <span
        class="bg-red-100 border border-red-500 rounded-full text-primary text-sm poppins px-4 py-1 inline-block mb-4"
        >{{ category == "category" ? "no category" : category }}</span
      >
      <button
        v-if="user_id == currentUserId"
        @click="HandleDelete"
        class="bg-red-100 border border-red-500 rounded-full text-primary text-sm poppins px-4 py-1 mb-4 flex items-center justify-between"
      >
        <TrashIcon aria-hidden="true" class="w-4 ml-1" />
        Delete
      </button>
    </div>

    <img
      class="w-64 mx-auto transform transition duration-300 hover:scale-105"
      :src="imageUrl"
      alt=""
    />
    <div class="flex flex-col items-center my-3 space-y-2">
      <h1 class="text-gray-900 poppins text-lg">{{ title }}</h1>
      <p class="text-gray-500 poppins text-sm text-center">
        {{ description.slice(0, 50) }}
      </p>
      <h2 class="text-gray-900 poppins text-2xl font-bold">
        {{ preparation_time }}
      </h2>
      <StarRating
        class="mt-12 font-poppins text-xl flex justify-between items-center"
        active-color="#4D4DFF"
        :read-only="true"
        :rounded-corners="true"
        :star-size="20"
      />
      <p class="poppins text-black">{{}}</p>
      <div class="flex flex-row justify-between align-bottom">
        <RouterLink
          :to="{
            name: 'FoodDetail',
            params: {
              id: id,
            },
          }"
          class="bg-primary text-white px-8 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105"
        >
          Recipes
        </RouterLink>

        <button
          type="button"
          @click="isLikedVal ? HandleLike('disLike') : HandleLike('Like')"
          class="inline-flex items-center px-8 py-2 text-sm font-medium text-center text-blue-700 mt-24 mx-10 rounded-full hover:bg-gray-100"
        >
          <div
            v-if="
              likeLoading ||
              isLikedLoading ||
              unlikeLoading ||
              numberOfLikesLoading
            "
            role="status"
          >
            <svg
              aria-hidden="true"
              class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>

          <div v-else class="flex">
            <span
              class="inline-flex justify-center items-center w-4 h-4 text-xs font-semibold text-blue-800 bg-blue-200 rounded-full"
            >
              {{ numberOfLikes }}
            </span>

            <HeartIcon
              aria-hidden="true"
              :class="isLikedVal ? 'w-5 fill-blue-700' : 'w-5 '"
            />
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
