<script setup>
import { ref } from 'vue'
import axios from 'axios'

const text = ref('')
const message = ref('')

const submitForm = async () => {
  if (!text.value) {
    message.value = 'Text is required.'
    return
  }

  try {
    const { data } = await axios.post(
     `${import.meta.env.VITE_SUPABASE_URL}/${test}`,
      [{ text: text.value }],
      {
        headers: {
          apikey: import.meta.env.VITE_SUPABASE_API_KEY,
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_API_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation'
        }
      }
    )
    message.value = 'Saved!'
    text.value = ''
  } catch (err) {
    message.value = 'Error: ' + err.message
  }
}
</script>

<template>
  <div class="max-w-md mx-auto p-4">
    <form @submit.prevent="submitForm" class="space-y-4">
      <input
        v-model="text"
        type="text"
        placeholder="Enter text"
        class="input input-bordered w-full"
      />
      <button type="submit" class="btn btn-primary w-full">Submit</button>
      <p class="text-sm text-gray-500">{{ message }}</p>
    </form>
  </div>
</template>
