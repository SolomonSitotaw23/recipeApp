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

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, PlusIcon, MinusIcon } from "@heroicons/vue/solid";

const people = [
  { id: 1, name: "category" },
  { id: 2, name: "Breakfast" },
  { id: 3, name: "Dinner" },
  { id: 4, name: "Lunch" },
];
const selectedPerson = ref(people[0]);

const user = userLoginStore();
const router = useRouter();

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
  console.log(selectedPerson.value.name);
  insertRecipe({
    title: values.title,
    description: values.description,
    category: selectedPerson.value.name,
    image: values.image,
    ingredients: ingredient.value.ingredients.toString(),
    preparation_time: values.preparation_time,
    steps: ingredient.value.steps.toString(),
  });
};
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
            className="border border-gray-200 rounded-lg py-3 px-4 w-full focus:outline-none ring-blue-200 transition duration-500 focus:ring-4 resize-none"
            required
            value=""
          />
          <Listbox v-model="selectedPerson">
            <div class="relative mt-1">
              <ListboxButton
                class="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border-gray-400 shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
              >
                <span class="block truncate">{{ selectedPerson.name }}</span>
                <span
                  class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
                >
                  <SelectorIcon
                    class="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </span>
              </ListboxButton>

              <transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
              >
                <ListboxOptions
                  class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                >
                  <ListboxOption
                    v-slot="{ active, selected }"
                    v-for="person in people"
                    :key="person.name"
                    :value="person"
                    as="template"
                  >
                    <li
                      :class="[
                        active
                          ? 'bg-amber-100 text-amber-900'
                          : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-10 pr-4',
                      ]"
                    >
                      <span
                        :class="[
                          selected ? 'font-medium' : 'font-normal',
                          'block truncate',
                        ]"
                        >{{ person.name }}</span
                      >
                      <span
                        v-if="selected"
                        class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600"
                      >
                        <CheckIcon class="h-5 w-5" aria-hidden="true" />
                      </span>
                    </li>
                  </ListboxOption>
                </ListboxOptions>
              </transition>
            </div>
          </Listbox>
          <Label htmlFor="image" text="Food Image URL" />
          <TextField id="image" type="text" name="image" />
        </div>

        <div className="flex flex-col  space-y-4">
          <Label htmlFor="timeItTakes" text="Time It Takes" />
          <TextField
            id="preparation_time"
            type="text"
            name="preparation_time"
          />
          <Label htmlFor="type" text="Ingredients" />

          <div v-for="i in ingredient.ingredient_rows" :key="i">
            <input
              className="w-full px-4 py-3 rounded-lg ring-blue-200
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
              <PlusIcon aria-hidden="true" />
            </button>

            <button
              class="text-2xl bg-primary w-8 h-8 rounded-full text-white hover:scale-105 transform transition duration-500 cursor-pointer p-1"
              type="button"
              @click="removeIngredient"
            >
              <MinusIcon aria-hidden="true" />
            </button>
          </div>

          <Label htmlFor="type" text="Steps To Cook" />

          <div v-for="i in ingredient.steps_row" :key="i">
            <input
              className="w-full px-4 py-3 rounded-lg ring-blue-200
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
              <PlusIcon aria-hidden="true" />
            </button>

            <button
              class="text-2xl bg-primary w-8 h-8 rounded-full text-white hover:scale-105 transform transition duration-500 cursor-pointer p-1"
              type="button"
              @click="removeStep"
            >
              <MinusIcon aria-hidden="true" />
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
