<script setup>
import TextField from "../components/Forms/TextField.vue";
import Button from "../components/Forms/Button.vue";
import Label from "../components/Forms/Label.vue";
import { Form, ErrorMessage } from "vee-validate";
import { reactive, ref } from "vue";

import { INSERT_RECIPE } from "../Quires";
import { userLoginStore } from "../store/store";
import { useMutation } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
const user = userLoginStore();
const router = useRouter();

let count = 3;
let values = {};
const { mutate: insertRecipe, onDone } = useMutation(INSERT_RECIPE);

onDone((result) => {
  console.log(result.data.insert_food);

  Swal.fire("Food added!", "successfully", "success");
  router.push("/");
});

const ingredient = ref({
  ingredients: [],
  ingredient_rows: 1,
  steps: [],
  steps_row: 1,
});
const addNewIngredient = () => {
  ingredient.value.ingredient_rows++;
};
const removeIngredient = () => {
  ingredient.value.ingredient_rows > 1
    ? ingredient.value.ingredient_rows--
    : ingredient.value.ingredient_rows;
};
const addNewStep = () => {
  ingredient.value.steps_row++;
};
const removeStep = () => {
  ingredient.value.steps_row > 1
    ? ingredient.value.steps_row--
    : ingredient.value.steps_row;
};

const onSubmit = (values) => {
  console.log(ingredient.value.ingredients.toString());
  console.log(ingredient.value.steps.toString());

  insertRecipe({
    title: values.title,
    description: values.description,
    category: "breakfast",
    // image: values.image,
    ingredients: ingredient.value.ingredients.toString(),
    preparation_time: values.preparation_time,
    steps: ingredient.value.steps.toString(),
  });
};

//   for (let i = 0; i <= count; i++) {
//     // console.log(values.`.step_i);
//   }
//   console.log(JSON.stringify(ingredient_mediator.toString()));
//   // for(let i = 0:i<=)

//   // console.log(user.userId);

// };
</script>

<template>
  <section class="flex items-center justify-center mt-32">
    <div>
      <Form
        className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 mt-6"
        @submit="onSubmit"
      >
        <div className="flex flex-col space-y-4">
          <Label htmlFor="title" text="Food Title" />
          <TextField name="title" id="title" type="text" value="" required />
          <Label htmlFor="description" text="Food Description How To cook" />
          <TextField
            as="textarea"
            id="description"
            name="description"
            cols="30"
            rows="9"
            className="border border-gray-200 rounded-lg py-3 px-4 w-full focus:outline-none ring-red-200 transition duration-500 focus:ring-4 resize-none"
            required
            value=""
          />
        </div>

        <div className="flex flex-col  space-y-4">
          <Label htmlFor="image" text="Food Image URL" />
          <!-- <TextField id="image" type="text" name="image" /> -->
          <Label htmlFor="timeItTakes" text="Time It Takes" />
          <TextField
            id="preparation_time"
            type="text"
            name="preparation_time"
          />
          <Label htmlFor="type" text="Ingredients" />

          <div v-for="i in ingredient.ingredient_rows" :key="i">
            <input
              className="w-full px-4 py-3 rounded-lg ring-red-200
            focus:ring-4 focus:outline-none transition duration-300 border
            border-gray-300 focus:shadow-xl"
              type="text"
              v-model="ingredient.ingredients[i]"
              :placeholder="i"
            />
          </div>

          <div
            className="flex items-center self-center border border-gray-200 px-4 py-2 space-x-6 rounded-full w-fit"
          >
            <button
              class="text-2xl bg-primary w-8 h-8 rounded-full text-white hover:scale-105 transform transition duration-500 cursor-pointer p-1"
              type="button"
              @click="addNewIngredient"
            >
              <ion-icon name="add-outline"></ion-icon>
            </button>

            <button
              class="text-2xl bg-primary w-8 h-8 rounded-full text-white hover:scale-105 transform transition duration-500 cursor-pointer p-1"
              type="button"
              @click="removeIngredient"
            >
              <ion-icon name="remove-outline"></ion-icon>
            </button>
          </div>

          <Label htmlFor="type" text="Steps To Cook" />

          <div v-for="i in ingredient.steps_row" :key="i">
            <input
              className="w-full px-4 py-3 rounded-lg ring-red-200
            focus:ring-4 focus:outline-none transition duration-300 border
            border-gray-300 focus:shadow-xl"
              type="text"
              v-model="ingredient.steps[i]"
              :placeholder="i"
            />
          </div>

          <div
            className="flex items-center self-center border border-gray-200 px-4 py-2 space-x-6 rounded-full w-fit"
          >
            <button
              class="text-2xl bg-primary w-8 h-8 rounded-full text-white hover:scale-105 transform transition duration-500 cursor-pointer p-1"
              type="button"
              @click="addNewStep"
            >
              <ion-icon name="add-outline"></ion-icon>
            </button>

            <button
              class="text-2xl bg-primary w-8 h-8 rounded-full text-white hover:scale-105 transform transition duration-500 cursor-pointer p-1"
              type="button"
              @click="removeStep"
            >
              <ion-icon name="remove-outline"></ion-icon>
            </button>
          </div>

          <div className="mt-8">
            <Button text="Add" type="submit" />
          </div>
        </div>
      </Form>
    </div>
  </section>
</template>
