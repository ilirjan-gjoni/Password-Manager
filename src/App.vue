<script setup>
import image from '@/assets/pass.png';
import { useRoute } from 'vue-router'
import { SignedIn, UserButton } from '@clerk/vue'

// Get current route
const route = useRoute()

// List of routes that should hide layout
const noLayoutRoutes = ['/sign-in', '/sign-up']
const isAuthPage = noLayoutRoutes.includes(route.path)
</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- If not on sign-in or sign-up -->
    <div v-if="!isAuthPage">
      <!-- Navbar -->
      <div class="sticky top-0 z-50 w-full navbar bg-base-200 shadow-md px-4 sm:px-6">
        <div class="flex justify-between items-center w-full">
          <router-link to="/add" class="inline-block">
            <img :src="image" alt="Password Manager" class="h-12 sm:h-14" />
          </router-link>
          <SignedIn>
            <UserButton afterSignOutUrl="/sign-in" />
          </SignedIn>
        </div>
      </div>

      <!-- Layout -->
      <div class="flex">
        <!-- Sidebar -->
        <aside class="w-55 bg-base-200 min-h-screen p-4 shadow-inner hidden md:block">
          <ul class="menu space-y-2">
            <li><router-link to="/add">➕ Add Password</router-link></li>
            <li><router-link to="/list">📋 Password List</router-link></li>
          </ul>
        </aside>

        <!-- Page Content -->
        <main class="flex-1 p-6 overflow-x-auto">
          <router-view />
        </main>
      </div>

      <!-- Footer for mobile -->
      <footer class="fixed bottom-0 left-0 right-0 md:hidden bg-base-200 border-t border-base-300 p-2 flex justify-around">
        <router-link to="/add">➕<span class="text-sm">Add</span></router-link>
        <router-link to="/list">📋<span class="text-sm">List</span></router-link>
      </footer>
    </div>

    <!-- If on sign-in or sign-up page -->
    <div v-else>
      <router-view />
    </div>
  </div>
</template>
