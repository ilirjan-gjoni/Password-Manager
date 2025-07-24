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
 
<div class=" flex items-center justify-center bg-base-100 p-4"> 

   
    <form @submit.prevent="submitForm" class="w-full max-w-xl p-8 bg-base-200 rounded-2xl shadow-xl space-y-6">
     <h2 class="text-3xl font-bold text-center text-base-content">🔐 Add New Password</h2>

      <div>
        <label class="label">
          <span class="label-text text-lg font-semibold">Name</span>
        </label>
        <input
          v-model="form.name"
          placeholder="Name"
          class="input input-bordered input-lg w-full font-medium"
        />
      </div>

      <div>
        <label class="label">
          <span class="label-text text-lg font-semibold">Website</span>
        </label>
        <input
          v-model="form.url"
          placeholder="Website"
          class="input input-bordered input-lg w-full font-medium"
        />
      </div>

      <div>
        <label class="label">
          <span class="label-text text-lg font-semibold">Username</span>
        </label>
        <input
          v-model="form.username"
          placeholder="Username"
          class="input input-bordered input-lg w-full font-medium"
        />
      </div>

      <div>
        <label class="label">
          <span class="label-text text-lg font-semibold">Password</span>
        </label>
        <input
          v-model="form.password"
          placeholder="Password"
          type="password"
          class="input input-bordered input-lg w-full font-medium"
        />
      </div>

      <div class="flex flex-col sm:flex-row justify-between gap-4 pt-4">
        <button
          type="submit"
          :disabled="isSubmitting"
          class="btn btn-primary btn-lg w-full font-bold"
        >
          {{ isSubmitting ? '⏳ Saving...' : 'Add' }}
        </button>

       
      </div>
    </form>
  </div>

</template>
