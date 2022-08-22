<script setup>
import TextField from "../components/Forms/TextField.vue";
import Button from "../components/Forms/Button.vue";
import Label from "../components/Forms/Label.vue";
import { Form, ErrorMessage } from "vee-validate";
import { INSERTFOOD } from "../Quires";
import { userLoginStore } from "../store/store";
import { useMutation } from "@vue/apollo-composable";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
const user = userLoginStore();
const router = useRouter();
const { mutate: insertFood, onDone } = useMutation(INSERTFOOD);

onDone((result) => {
  console.log(result.data.insert_food);

  Swal.fire("Food added!", "successfully", "success");
  router.push("/");
});
const onSubmit = (values) => {
  console.log(values);
  // console.log(user.userId);
  // insertFood({
  //   title: values.title,
  //   description: values.description,
  //   image: values.image,
  //   timeItTakes: values.timeItTakes,
  //   userId: user.userId,
  // });
};
let count = 1;
let values = {};
const add = () => {
  count++;
};
const remove = () => {
  count--;
};
const inputs = [];
for (let count = 1; count <= 3; count++) {
  inputs.push({
    id: count,
    type: "text",
    placeholder: `step_${count}`,
    value: ``,
    name: `step_${count}`,
  });
}

console.log(inputs);
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

        <div className="flex flex-col space-y-4">
          <Label htmlFor="image" text="Food Image URL" />
          <TextField id="image" type="text" name="image" />
          <Label htmlFor="timeItTakes" text="Time It Takes" />
          <TextField id="timeItTakes" type="text" name="timeItTakes" />
          <Label htmlFor="type" text="Direction" />
          <div v-for="input in inputs" :key="input.id">
            <TextField
              :type="input.type"
              :placeholder="input.placeholder"
              :value="input.value"
              :name="input.name"
              :rules="input.rules"
            />
          </div>

          <div className="mt-8">
            <Button text="Add" type="submit" />
          </div>
        </div>
      </Form>
    </div>
  </section>
</template>

<style scoped></style>
