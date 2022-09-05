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

const { mutate: login, onDone } = useMutation(LOGIN);

onDone((result) => {
  console.log(result.data.login.token);

  const token = result.data.login.token;
  const userId = result.data.login.id;
  Swal.fire("Sign in success!", "welcome !", "success");
  user.login(token, userId);
  router.push("/");
});

const onSubmit = (values) => {
  console.log(values);
  login({
    email: values.email,
    password: values.password,
  });
  // console.log(result);
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
        </div>
        <Button text="Sign In" />
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
