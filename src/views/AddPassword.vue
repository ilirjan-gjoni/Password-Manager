<script setup>
import { ref } from 'vue';
import PasswordForm from '@/components/PasswordForm.vue';
import { usePasswordStore } from '@/store/index.js'
import axios from 'axios';
import { Protect } from '@clerk/vue'
// ✅ Clerk Auth composable
import { useAuth } from '@clerk/vue'


const passwordStore = usePasswordStore();

// Loading and error states
const isSubmitting = ref(false);
const submissionError = ref('');
const resetFormTrigger = ref(0);

// ✅ Get Clerk token function and auth state
const { getToken, isLoaded, isSignedIn } = useAuth()

// Handle submitted data from PasswordForm.vue
async function handlePasswordSubmit(submittedFormData) {
   

  if ( !submittedFormData.name || !submittedFormData.url || !submittedFormData.username || !submittedFormData.password  ) {
     
  submissionError.value = 'All fields are required.';
  return;
  }




  isSubmitting.value = true;
  submissionError.value = '';

  try {

     // ✅ 1. Check if user is signed in
    if (!isLoaded.value || !isSignedIn.value) {
      throw new Error('User not signed in with Clerk.')
    }

    // ✅ 2. Get Clerk JWT token
    const token = await getToken()

    
    
    const { data } = await axios.post(
      import.meta.env.VITE_SUPABASE_URL,
      submittedFormData,
      {
        headers: {
          'apikey': import.meta.env.VITE_SUPABASE_API_KEY ,
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=representation'
        }
      }
    );
    console.log('Password saved:', data);
    passwordStore.addPassword(data[0]);
    resetFormTrigger.value++;
  } catch (error) {
    console.error('Failed to save password:', error);
    submissionError.value = 'Failed to save password. Please try again.';
  } finally {
    isSubmitting.value = false;
  }
}
</script>

<template>
   <Protect redirectTo="/sign-in">
  <div>
   
    <PasswordForm @submit-password="handlePasswordSubmit" 
    :is-submitting="isSubmitting"  
     :reset-form-prop="resetFormTrigger"   />
    
    <p v-if="submissionError" style="color: red;">{{ submissionError }}</p>
  </div>
  </Protect>
</template>
