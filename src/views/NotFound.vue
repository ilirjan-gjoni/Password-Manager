<script setup>
import { useAuth } from '@clerk/vue'
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'

const { isLoaded, isSignedIn } = useAuth()
const router = useRouter()

onMounted(() => {
  if (!isLoaded.value) return
  if (!isSignedIn.value) {
    router.replace('/sign-in')
  }
})
</script>

<template>
  <div v-if="isSignedIn && isLoaded" class="p-10 text-center">
    <h1 class="text-4xl font-bold mb-4">404 - Page Not Found</h1>
    <router-link to="/add" class="text-blue-500 underline">Go to Add Password</router-link>
  </div>
</template>

