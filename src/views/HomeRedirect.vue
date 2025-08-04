<script setup>
import { useAuth } from '@clerk/vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const { isLoaded, isSignedIn } = useAuth()
const router = useRouter()

onMounted(() => {
  if (!isLoaded.value) return

  if (isSignedIn.value) {
    router.replace('/list') // or /add if you prefer
  } else {
    router.replace('/sign-in')
  }
})
</script>

<template>
  <!-- Optional: add loading spinner here -->
  <!--  <p>Redirecting...</p> -->
</template>
