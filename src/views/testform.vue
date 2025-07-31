<script setup>
import { ref, onMounted } from 'vue'
import { useAuth } from '@clerk/vue'
import { supabase } from '@/lib/supabase'

const text = ref('')
const message = ref('')

const { getToken, isSignedIn } = useAuth()

onMounted(async () => {
  const token = await getToken()
  console.log('Token (onMounted):', token)
  supabase.auth.setAuth(token)
})

const submitForm = async () => {
  if (!isSignedIn.value) {
    message.value = 'You must be signed in.'
    return
  }

  const token = await getToken()
  supabase.auth.setAuth(token)

  const { data, error } = await supabase.from('test').insert({ test: text.value })

  if (error) {
    console.error('Insert error:', error)
    message.value = 'Error: ' + error.message
  } else {
    message.value = 'Saved!'
    text.value = ''
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
