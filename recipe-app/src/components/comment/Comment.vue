<script setup></script>
<template>
  <form>
    <div
      class="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600"
    >
      <div class="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
        <label for="comment" class="sr-only">Your comment</label>
        <textarea
          id="comment"
          rows="4"
          class="px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
          placeholder="Write a comment..."
          required=""
        ></textarea>
      </div>
      <div
        class="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600"
      >
        <button
          type="submit"
          class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
        >
          Post comment
        </button>
        <div class="flex pl-0 space-x-1 sm:pl-2">
          <button
            type="button"
            class="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600"
          >
            <span class="sr-only">Upload image</span>
          </button>
        </div>
      </div>
    </div>
  </form>
</template>
<style scoped></style>
