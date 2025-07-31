<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useAuth } from '@clerk/vue'

const text = ref('')
const message = ref('')
const { isLoaded, session, isSignedIn } = useSession()

const submitForm = async () => {
  if (!text.value) {
    message.value = 'Text is required.'
    return
  }

  try {
    const token =  session.getToken()

    const { data } = await axios.post(
      'https://dwndlxjomryejopkicnj.supabase.co/rest/v1/test',
      { test: text.value },
      {
        headers: {
          apikey: 'your-public-supabase-key', // still required
          Authorization: `Bearer ${token}`,   // Clerk JWT token
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
