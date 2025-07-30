<script setup>
import PasswordItem from '../components/PasswordTable.vue';
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { usePasswordStore } from '../store/index.js';
import PasswordForm from '../components/PasswordForm.vue';
import { Protect } from '@clerk/vue'
import { useAuth } from '@clerk/vue'




const passwordStore = usePasswordStore();
const isLoading = ref(false);
const error = ref(null);


onMounted(async () => {
    
  try {
    isLoading.value = true;
   
    const response = await axios.get(import.meta.env.VITE_SUPABASE_URL, {
      headers: {
        'Authorization': `Bearer ${eyJhbGciOiJSUzI1NiIsImNhdCI6ImNsX0I3ZDRQRDExMUFBQSIsImtpZCI6Imluc18zMFV5WFdDTnpkN0drWk5XZVVEeUVZa1VYdlciLCJ0eXAiOiJKV1QifQ.eyJhenAiOiJodHRwczovL3d3dy5wYXNzbWFuYWdlci5zaXRlIiwiZXhwIjoxNzUzODk2ODg0LCJmdmEiOlswLC0xXSwiaWF0IjoxNzUzODk2ODI0LCJpc3MiOiJodHRwczovL2NsZXJrLnBhc3NtYW5hZ2VyLnNpdGUiLCJuYmYiOjE3NTM4OTY4MTQsInJvbGUiOiJhdXRoZW50aWNhdGVkIiwic2lkIjoic2Vzc18zMGJXYlQzODk1aWdNemZjd29jbVhPSThSMnoiLCJzdWIiOiJ1c2VyXzMwYjFmWmpwWXRaQXd2aWhvWkp1TEhEeWExTCIsInYiOjJ9.tldA0ZfuKds-j6e3WIOEvQ-piHKkJxoy0vyTYoQy76ezJq4TVTUZonfsLieNsP0Egxd2HgOR4ScBwrXGAxLhT8i8pMHFpKprSb5MUbSJTuxVPXQi3KfJSCd7fYXVpd4_4UTEt86u_240TzPE2uhv3hpsCU3FOX9EN9y-JUDHnwfNGtS7SSmf_YNn5RMxpgpHoYlkKn-DKtyAMMR6zc8pKzX9UQot9ZyIVQjBUbcPwaEkkQcqfcUwkgptQ7EB-HytU9AmoLmAj4jwBBxcfYi7x9AxuwQn5wxommTG0oYZSKHlhb4r5TClpPpuYHN2N4raXuKGcetAICXJ6jrKEmpzYg}`,
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

<p v-if="isLoading">Loading passwords...</p>
<p v-if="error">{{ error }}</p>

<PasswordItem :passwords="passwordStore.passwords" /> 
</Protect>
</template>
