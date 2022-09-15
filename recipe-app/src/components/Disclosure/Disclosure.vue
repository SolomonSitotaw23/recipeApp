<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon } from "@heroicons/vue/solid";
const props = defineProps({
  title: String,
  value: String,
  listStyle: String,
});

const values = props.value.split(",");
</script>
<template>
  <div class="w-full max-w-md bg-gray-50 p-2">
    <Disclosure v-slot="{ open }">
      <DisclosureButton
        class="flex w-full justify-between bg-gray-50 px-4 py-2 text-left text-sm font-medium hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
      >
        <h1 class="w-full text-lg font-black">{{ title }}</h1>

        <ChevronUpIcon
          :class="open ? 'rotate-180 transform' : ''"
          class="h-5 w-5"
        />
      </DisclosureButton>
      <DisclosurePanel class="px-4 pt-4 pb-2 text-sm text-gray-500">
        <ul>
          <li v-for="value in values" :key="value" :class="listStyle">
            {{ value ? value : null }}
          </li>
        </ul>
      </DisclosurePanel>
    </Disclosure>
  </div>
</template>
