<script setup>
import Button from "../components/Forms/Button.vue";
import Brand from "../components/Forms/Brand.vue";
import TextField from "../components/Forms/TextField.vue";
import { Form, ErrorMessage } from "vee-validate";
import { useMutation } from "@vue/apollo-composable";
import { SIGNUP } from "../Quires";
import { reactive } from "vue";
import { userLoginStore } from "../store/store";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import {
  validateEmail,
  validatePass,
  validateName,
  validateConfirmPass,
} from "../Validation/Validation";

const user = userLoginStore();
const router = useRouter();

const { mutate: signup, onDone } = useMutation(SIGNUP);

onDone((result) => {
  Swal.fire("Sign in success!", "welcome !", "success");
  const token = result.data.signup.token;
  const userId = result.data.signup.id;
  const currentUser = result.data.signup;
  user.login(token, userId, currentUser);
  router.push("/");
});

const onSubmit = (values) => {
  signup({
    first_name: values.first_name,
    last_name: values.last_name,
    email: values.email,
    password: values.password,
  });
};

const Inputs = [
  {
    id: 1,
    type: "text",
    placeholder: "first Name",
    value: "",
    name: "first_name",
    rules: validateName,
  },
  {
    id: 1,
    type: "text",
    placeholder: "last Name",
    value: "",
    name: "last_name",
    rules: validateName,
  },
  {
    id: 2,
    type: "email",
    placeholder: "Email",
    value: "",
    name: "email",
    rules: validateEmail,
  },
  {
    id: 3,
    type: "password",
    placeholder: "password",
    value: "",
    name: "password",
    rules: validatePass,
  },
  {
    id: 4,
    type: "password",
    placeholder: "Confirm Password",
    value: "",
    name: "confirmPassword",
    rules: validateConfirmPass,
  },
];
</script>

<template>
  <main class="h-screen w-full banner">
    <div class="flex flex-col justify-center items-center h-screen">
      <h1 class="text-3xl">Sign up</h1>
      <Form
        class="bg-white w-96 mt-6 p-4 rounded-lg shadow-lg"
        @submit="onSubmit"
      >
        <div class="flex flex-col space-y-6">
          <div v-for="input in Inputs" :key="input.id">
            <TextField
              :type="input.type"
              :placeholder="input.placeholder"
              :value="input.value"
              :name="input.name"
              :rules="input.rules"
            />
            <ErrorMessage class="text-xs text-red-600" :name="input.name" />
          </div>
        </div>
        <Button text="Sign In" />
        <RouterLink to="/signin">
          <p class="text-base text-primary text-center my-6 hover:underline">
            have an account ?
          </p>
        </RouterLink>
      </Form>
    </div>
  </main>
</template>

<style scoped></style>
