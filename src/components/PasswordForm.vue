<script setup>
import { ref } from 'vue';
import { defineEmits } from 'vue';
import { defineProps } from 'vue';
import { watch } from 'vue';


// Define the event that will be emitted to parent
const emit = defineEmits(['submit-password', 'update-password', 'cancel-edit']);

const props = defineProps(['resetFormProp','isSubmitting','initialData']);


const form = ref({
  name: '',
  url: '',
  username: '',
  password: '',
});


watch(
  () => props.resetFormProp,
  () => {
    form.value = {
      name: '',
      url: '',
      username: '',
      password: '',
    };
  }
);

watch(
  () => props.initialData,
  (newData) => {
    if (newData) {
      form.value = {
        name: newData.name,
        url: newData.url,
        username: newData.username,
        password: newData.password,
      };
    }
  },
  { immediate: true }
);



// Handle form submission    only for add
//function submitForm() {
  //emit('submit-password', { ...form.value });
  // No API call here; parent handles it
//}

function submitForm() {
  const payload = { ...form.value };

  if (props.initialData && props.initialData.id) {
    // Editing: include the ID and emit update-password
    payload.id = props.initialData.id;
    emit('update-password', payload);
  } else {
    // Adding new password
    emit('submit-password', payload);
  }
}



</script>



 
<template>
  <div class="w-full max-w-md mx-auto">
    <form @submit.prevent="submitForm" class="space-y-3 bg-base-100 p-4 rounded-lg shadow-md border border-base-300">
      <!-- Name -->
      <div class="form-control">
        <label class="label text-sm font-medium">🔗 Name</label>
        <input
          v-model="form.name"
          type="text"
          class="input input-bordered input-sm w-full"
          placeholder="Example: Facebook"
        />
      </div>

      <!-- URL -->
      <div class="form-control">
        <label class="label text-sm font-medium">🌐 Website</label>
        <input
          v-model="form.url"
          type="url"
          class="input input-bordered input-sm w-full"
          placeholder="https://facebook.com"
        />
      </div>

      <!-- Username -->
      <div class="form-control">
        <label class="label text-sm font-medium">📧 Username</label>
        <input
          v-model="form.username"
          type="text"
          class="input input-bordered input-sm w-full"
          placeholder="Your username or email"
        />
      </div>

      <!-- Password -->
      <div class="form-control">
        <label class="label text-sm font-medium">🔒 Password</label>
        <input
          v-model="form.password"
          type="password"
          class="input input-bordered input-sm w-full"
          placeholder="••••••••"
        />
      </div>

      <!-- Error Message -->
      <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

      <!-- Actions -->
      <div class="mt-4 flex justify-end gap-2">
        <button
          type="button"
          class="btn btn-outline btn-sm"
          @click="$emit('cancel-edit')"
          v-if="isEditMode"
        >
          Cancel
        </button>

        <button
          type="submit"
          class="btn btn-primary btn-sm"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? 'Saving...' : 'Save Password' }}
        </button>
      </div>
    </form>
  </div>
</template>

