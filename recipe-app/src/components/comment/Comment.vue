<script setup>
import TextField from "../Forms/TextField.vue";
import Button from "../Forms/Button.vue";
import { validateComment } from "../../Validation/Validation";
import { Form, ErrorMessage } from "vee-validate";
import { useMutation, useQuery } from "@vue/apollo-composable";
import { userLoginStore } from "../../store/store";
import { COMMENTS, GIVE_COMMENT } from "../../Quires";
import { computed } from "@vue/reactivity";
import { toRefs } from "vue";
import Swal from "sweetalert2";
import Loading from "../loading/Loading.vue";
const props = defineProps({
  id: String,
  // comments: [],
});

const currentUser = userLoginStore();
// const { id } = toRefs(props);

const id = computed(() => currentUser.currentUser?.id);
const { result, loading, error, refetch, fetchMore } = useQuery(COMMENTS, {
  recipe_id: props.id,
});
const {
  mutate: addComment,
  loading: commentLoading,
  onDone,
} = useMutation(GIVE_COMMENT);

onDone((result) => {});

const onSubmit = (values) => {
  addComment(
    {
      author: currentUser.currentUser.first_name,
      content: values.comment,
      recipe_id: props.id,
      user_id: currentUser.currentUser.id,
    },
    {
      update: (cache, { data: { insert_comment_one } }) => {
        let data = cache.readQuery({
          query: COMMENTS,
          variables: { recipe_id: props.id },
        })
          ? cache.readQuery({
              query: COMMENTS,
              variables: { recipe_id: props.id },
            })
          : {};
        data = {
          ...data,
          comment: [...data.comment, insert_comment_one],
        };
        cache.writeQuery({
          query: COMMENTS,
          variables: { recipe_id: props.id },
          data,
        });
      },
    }
  );
  values.comment = "";
};
const comments = computed(() => result.value?.comment);

// file upload trial
</script>
<template>
  <section class="max-w-screen-xl mx-auto px-6 my-16">
    <div
      class="w-full flex items-left"
      v-for="comment in comments"
      :key="comment.id"
    >
      <div class="py-4 px-6">
        <div class="bg-white rounded-2xl transition duration-500">
          <div class="w-auto rounded-xl px-2 pb-2">
            <p class="text-md p-2 bg-gray-100 text-gray-600">
              {{ comment.content }}
            </p>
            <div class="flex justify-between items-left">
              <div class="flex space-x-4 py-2">
                <div class="text-sm font-semibold">
                  {{ comment.author }} •
                  <span class="font-normal">
                    {{ comment.created_at.toString() }}</span
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="h-28">
      <Loading text="submitting comment" v-if="commentLoading" />
    </div>
    <Form @submit="onSubmit">
      <div class="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200">
        <div class="py-2 px-4 bg-white rounded-t-lg">
          <label for="comment" class="sr-only">Your comment</label>
          <TextField
            as="textarea"
            id="comment"
            rows="4"
            cols="5"
            class="border-gray-200 rounded-lg py-3 px-4 w-full focus:outline-none ring-blue-200 transition duration-500 focus:ring-4 resize-none text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a comment..."
            value=""
            name="comment"
            :rules="validateComment"
          />
        </div>
        <div class="p-4">
          <ErrorMessage class="text-xs text-red-600" name="comment" />
        </div>
        <div
          class="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600"
        >
          <Button
            v-if="commentLoading"
            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            type="button"
            text="Processing.."
            isLoading
          >
          </Button>
          <Button
            v-else
            class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            text="Post comment"
          />

          <div class="flex pl-0 space-x-1 sm:pl-2"></div>
        </div>
      </div>
    </Form>
  </section>
</template>
<style scoped></style>
