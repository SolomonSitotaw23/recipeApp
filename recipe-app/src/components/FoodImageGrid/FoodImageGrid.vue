<script setup>
const props = defineProps({
  images: String,
});
const ImageUrl = props.images.split(",");
console.log(ImageUrl.length);
</script>
<template>
  <div class="container mx-auto">
    <div class="grid-cols-3 p-20 bg-orange-50 space-y-0 grid gap-3 grid-rows-3">
      <div class="w-full rounded">
        <img
          v-if="ImageUrl[0]"
          :src="'http://localhost:5000/images/recipe/' + ImageUrl[0]"
          alt="image"
        />
      </div>
      <div class="w-full col-span-2 row-span-2 rounded">
        <img
          v-if="ImageUrl[1]"
          :src="'http://localhost:5000/images/recipe/' + ImageUrl[1]"
          alt="image"
        />
      </div>
      <div class="w-full rounded">
        <img
          v-if="ImageUrl[2]"
          :src="'http://localhost:5000/images/recipe/' + ImageUrl[2]"
          alt="image"
        />
      </div>
      <div class="w-full rounded">
        <img
          v-if="ImageUrl[3]"
          :src="'http://localhost:5000/images/recipe/' + ImageUrl[3]"
          alt="image"
        />
      </div>
      <div class="w-full rounded">
        <img
          v-if="ImageUrl[4]"
          :src="'http://localhost:5000/images/recipe/' + ImageUrl[4]"
          alt="image"
        />
      </div>
      <div class="w-full rounded">
        <img
          v-if="ImageUrl[5]"
          :src="'http://localhost:5000/images/recipe/' + ImageUrl[5]"
          alt="image"
        />
      </div>
    </div>
  </div>
</template>
