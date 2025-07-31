<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useAuth } from '@clerk/vue'
const { getToken, isLoaded, isSignedIn } = useAuth()
const text = ref('')
const message = ref('')

const submitForm = async () => {
  console.log('isLoaded:', isLoaded.value)
  console.log('isSignedIn:', isSignedIn.value)

  if (!isSignedIn.value) {
    message.value = 'You must be signed in.'
    return
  }

  const token = await getToken.value()
  console.log('JWT Token:', token)

  try {
    const { data } = await axios.post(
      'https://dwndlxjomryejopkicnj.supabase.co/rest/v1/test',
      { test: text.value },
      {
       headers: {
          'apikey': import.meta.env.VITE_SUPABASE_API_KEY ,
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        }
      }
    )

    message.value = 'Saved!'
    text.value = ''
  } catch (err) {
    message.value = 'Error: ' + err.message
    console.error('POST error:', err)
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
