<script setup>

</script>

<template>
  <section id="allrecipe" class="header-banner h-96 w-full bg-yellow-50">
    <div class="flex flex-col items-center justify-center h-full">
      <h1
        class="text-center text-3xl md:text-4xl lg:text-5xl poppins font-semibold text-gray-700"
      >
        Best food waiting for your belly
      </h1>

      <div
        class="rounded-full p-1 box-border mt-8 bg-white overflow-hidden ring-red-300 focus:ring-4 w-96 flex items-center"
      >
        <input
          type="text"
          class="rounded-full px-4 focus:outline-none w-full bg-transparent"
          placeholder="Search here ......."
        />
        <button
          v-smooth-scroll
          class="text-sm bg-primary py-3 px-6 rounded-full text-white poppins ring-red-300 focus:ring-4 transition duration-300 hover:scale-105 transform"
        >
          Search
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped></style>
