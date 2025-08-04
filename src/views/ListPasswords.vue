<script setup>
import PasswordItem from '../components/PasswordTable.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { usePasswordStore } from '../store/index.js';
import PasswordForm from '../components/PasswordForm.vue';
import { Protect } from '@clerk/vue'
import { useAuth } from '@clerk/vue'

// ✅ Get Clerk token function and auth state
const { getToken, isLoaded, isSignedIn } = useAuth()


const passwordStore = usePasswordStore();
const isLoading = ref(false);
const error = ref(null);


onMounted(async () => {
  console.log('isLoaded:', isLoaded.value)
  console.log('isSignedIn:', isSignedIn.value)

  if (!isSignedIn.value) {
    message.value = 'You must be signed in.'
    return
  }

  const token = await getToken.value()
  console.log('JWT Token:', token)

  try {
    isLoading.value = true;
   
    const response = await axios.get(import.meta.env.VITE_SUPABASE_URL, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'apikey': import.meta.env.VITE_SUPABASE_API_KEY
      }
    });
    console.log('Fetched passwords:', response.data);   // ✅ Add this
    passwordStore.setPasswords(response.data);
    console.log('Store after setPasswords:', passwordStore.passwords);  // ✅ Add this
    

  } catch (error) {
    console.error('Error fetching passwords:', error);
    error.value = 'Failed to load passwords. Please try again.';
  } finally {
    isLoading.value = false;
  }
});


</script>


<template>
    <Protect redirectTo="/sign-in">


<div v-if="isLoading" class="flex flex-col items-center justify-center h-screen">
  
  <p class="text-lg font-semibold text-gray-700">⌛</p>
</div>

<p v-if="error">{{ error }}</p>

<PasswordItem :passwords="passwordStore.passwords" /> 
</Protect>
</template>
