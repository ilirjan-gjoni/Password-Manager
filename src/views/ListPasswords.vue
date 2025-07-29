<script setup>
import PasswordItem from '../components/PasswordTable.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { usePasswordStore } from '../store/index.js';
import PasswordForm from '../components/PasswordForm.vue';
import { Protect } from '@clerk/vue'

const passwordStore = usePasswordStore();
const isLoading = ref(false);
const error = ref(null);


onMounted(async () => {
    
  try {
    isLoading.value = true;
    const response = await axios.get(import.meta.env.VITE_SUPABASE_URL, {
      headers: {
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_API_KEY}`,
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
  <Protect>

<p v-if="isLoading">Loading passwords...</p>
<p v-if="error">{{ error }}</p>

<PasswordItem :passwords="passwordStore.passwords" /> 
</Protect>
</template>
