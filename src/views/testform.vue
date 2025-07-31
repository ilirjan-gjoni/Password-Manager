<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useAuth } from '@clerk/vue'

const text = ref('')
const message = ref('')

const { getToken, isLoaded, isSignedIn } = useAuth()  // ✅ FIXED

const submitForm = async () => {
  console.log('isLoaded:', isLoaded)
  console.log('isSignedIn:', isSignedIn)

  if (!isSignedIn) {
    message.value = 'You must be signed in.'
    return
  }

  const token = await getToken()
  console.log('JWT Token:', token)

  try {
    const { data } = await axios.post(
      'https://dwndlxjomryejopkicnj.supabase.co/rest/v1/test',
      { test: text.value },
      {
        headers: {
          apikey: 'your-public-supabase-key', // required
          Authorization: `Bearer ${token}`,   // ✅ Clerk token
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
        placeholder="Enter test data"
        class="input input-bordered w-full"
      />
      <button type="submit" class="btn btn-primary w-full">Submit</button>
      <p class="text-sm text-gray-500">{{ message }}</p>
    </form>
  </div>
</template>
