<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
</script>

<template>
  <main className=" h-screen banner">
    <div className="max-w-screen-xl py-20 mx-auto px-6">
      <div className="flex flex-col items-center justify-center h-3/4 pt-24">
        <img
          className="w-96 object-contain"
          src="../assets/error.png"
          alt="error"
        />
        <button
          className="bg-primary text-white px-8 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105"
          @click="() => router.push('/')"
        >
          Go back to home
        </button>
      </div>
    </div>
  </main>
</template>
