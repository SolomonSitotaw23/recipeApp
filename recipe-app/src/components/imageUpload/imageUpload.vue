<script setup>
import Button from "../Forms/Button.vue";
import { computed } from "@vue/reactivity";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";
import { useMutation } from "@vue/apollo-composable";
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

console.log("user", user_id);
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
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
    console.log(file.filename);
    PropImage.value.push(`${key.value}/${file.filename}`);
    console.log(PropImage.value.toString());
  }

  console.log(file.getMetadata());
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
    <div class="w-full px-32">
      <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-10 mt-6">
        <div class="flex flex-col space-y-4">
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
          />
        </div>
      </div>
      <div class="mt-8">
        <Button v-if="addRecipeLoading" type="button" text="Processing..">
          <svg class="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
            <!-- ... -->
          </svg>
          Processing...
        </Button>
        <Button
          v-else
          @click="HandleCreateRecipe"
          type="button"
          text="Add recipe"
        />
      </div>
    </div>
  </section>
</template>
