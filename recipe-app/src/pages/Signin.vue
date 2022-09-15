<script setup>
import Button from "../components/Forms/Button.vue";
import Brand from "../components/Forms/Brand.vue";
import TextField from "../components/Forms/TextField.vue";
import { Form, ErrorMessage } from "vee-validate";
import { useMutation } from "@vue/apollo-composable";
import { LOGIN } from "../Quires";
import { reactive } from "vue";
import { userLoginStore } from "../store/store";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { validatePass, validateEmail } from "../Validation/Validation";

const user = userLoginStore();
const router = useRouter();

const {
  mutate: login,
  loading: loginLoading,
  error,
  onDone,
} = useMutation(LOGIN);

onDone((result) => {
  const token = result.data.login.token;
  const userId = result.data.login.id;
  const currentUser = result.data.login;
  user.login(token, userId, currentUser);
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Sign In success",
    showConfirmButton: false,
    timer: 1500,
    width: 300,
  });
});

const onSubmit = (values) => {
  console.log(values);
  login({
    email: values.email,
    password: values.password,
  });
};

const Inputs = [
  {
    id: 1,
    type: "email",
    placeholder: "Email",
    value: ``,
    name: "email",
    rules: validateEmail,
  },
  {
    id: 2,
    type: "password",
    placeholder: "Password",
    value: "",
    name: "password",
    rules: validatePass,
  },
];
</script>

<template>
  <main class="h-screen w-full banner">
    <div class="flex flex-col justify-center items-center h-screen">
      <h1 class="text-3xl">Sign in</h1>
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
          <p class="text-red-500 text-xs">{{ error }}</p>
        </div>
        <Button v-if="loginLoading" type="button" text="Processing..">
          <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
            <!-- ... -->
          </svg>
          Logging in...
        </Button>
        <Button v-else text="Sign In" />
        <RouterLink to="/signup">
          <p class="text-base text-primary text-center my-6 hover:underline">
            Need an account ?
          </p>
        </RouterLink>
      </Form>
    </div>
  </main>
</template>

<style scoped></style>
