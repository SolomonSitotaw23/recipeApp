<script setup>
import Button from "../Forms/Button.vue";
import { computed } from "@vue/reactivity";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@vue/apollo-composable";
import { ExclamationCircleIcon } from "@heroicons/vue/outline";

// Import Vue FilePond
import vueFilePond from "vue-filepond";
import { getOptions, registerPlugin, setOptions } from "filepond";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
// Import FilePond styles
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";
// Import the plugin code
import FilePondPluginFileMetadata from "filepond-plugin-file-metadata";
import FilePondPluginImageCrop from "filepond-plugin-image-crop";
import { INSERT_RECIPE_AFTER_IMAGE_UPLOAD, ALL_RECIPE } from "../../Quires";
import { addRecipeStore } from "../../store/store";
import { userLoginStore } from "../../store/store";

const router = useRouter();
const id = computed(() => route.params.id);
const user = userLoginStore();
const user_id = user.currentUser.id;
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginImageCrop
);
registerPlugin(FilePondPluginFileMetadata, FilePondPluginImageCrop);
const key = ref("");
onMounted(() => {
  key.value = uuidv4(); //key used with the server to create folder for images
});
const recipeStore = addRecipeStore();
const PropImage = ref([]);
const variables = ref({});

variables.value = { ...recipeStore.recipe };

const handleFilePondInit = () => {
  setOptions({
    fileMetadataObject: {
      imageFolderKey: key.value,
    },
  });
};

const onProcessFile = (error, file) => {
  if (error) {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "Upload Error",
      showConfirmButton: false,
      timer: 1500,
      width: 300,
    });
  } else {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Upload Success You can add up to 6 Photos",
      showConfirmButton: false,
      timer: 1500,
      width: 300,
    });

    PropImage.value.push(`${key.value}/${file.filename}`);
  }
};
const server = {
  process: {
    url: "http://localhost:5000/imageUpload",
  },
  revert: {
    url: "http://localhost:5000/deleteImage",
  },
};

const {
  mutate: insertRecipe,
  loading: addRecipeLoading,
  result,
  onDone,
} = useMutation(INSERT_RECIPE_AFTER_IMAGE_UPLOAD);

onDone((result) => {
  Swal.fire({
    position: "top-end",
    icon: "success",
    title: "Recipe Added Successfully",
    showConfirmButton: false,
    timer: 1500,
    width: 300,
  });
  router.push("/");
});

const HandleCreateRecipe = () => {
  if (PropImage.value.length > 0) {
    insertRecipe(
      {
        ...variables.value,
        urls: PropImage.value.toString(),
        thumbnail_index: 0,
        user_id: user_id,
      },
      {
        update: (cache, { data: { insert_images_one } }) => {
          let data = cache.readQuery({
            query: ALL_RECIPE,
            variables: {
              limit: 10,
            },
          });
          try {
            data = {
              ...data,
              recipe: [...data.recipe, insert_images_one.recipe],
            };
            cache.writeQuery({
              query: ALL_RECIPE,
              variables: {
                limit: 10,
              },
              data,
            });
          } catch (error) {
            console.log(error);
            return;
          }
          return;
          console.log(data);
        },
      }
    );
  } else {
    Swal.fire({
      position: "top-end",
      icon: "error",
      title: "please add at least one image ",
      showConfirmButton: false,
      timer: 1500,
      width: 300,
    });
  }
};
</script>
<template>
  <section class="flex items-center justify-center mt-32">
    <div class="w-full px-32 flex items-center justify-center flex-col">
      <div class="grid grid-cols-1 lg:grid-cols gap-10 mt-6 items-center w-1/2">
        <file-pond
          name="recipeImage"
          ref="pond"
          label-idle="Drop files here... or Browse"
          allow-multiple="true"
          accepted-file-types="image/jpeg, image/png"
          :server="server"
          :instantUpload="true"
          @init="handleFilePondInit"
          @processfile="onProcessFile"
          :allowImageCrop="true"
          :image-crop-aspect-ratio="1"
        />
      </div>
      <span class="text-xs text-primary ml-2 flex">
        <ExclamationCircleIcon
          aria-hidden="true"
          class="w-4 mr-2 text-red-600"
        />
        square images are preferable
      </span>
      <div class="mt-8">
        <button
          type="button"
          @click="HandleCreateRecipe"
          class="bg-primary flex items-center justify-between self-start text-white px-8 py-2 focus:outline-none poppins rounded-full mt-24 transform transition duration-300 hover:scale-105"
        >
          <div v-if="addRecipeLoading" role="status">
            <svg
              aria-hidden="true"
              class="mr-2 w-5 h-5 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
          <span v-else> Add Recipe </span>
        </button>
      </div>
    </div>
  </section>
</template>
