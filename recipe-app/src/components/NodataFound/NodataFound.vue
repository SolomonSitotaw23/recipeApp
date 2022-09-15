<script setup>
const props = defineProps({
  text: String,
});
</script>
<template>
  <section
    class="w-3/4 mx-auto flex justify-center items-center opacity-60 flex-col"
  >
    <img src="../../assets/noDataFound.svg" alt="" class="w-3/5" />
    <h1 class="text-primary font-bold text-3xl">{{ text }}</h1>
  </section>
</template>
