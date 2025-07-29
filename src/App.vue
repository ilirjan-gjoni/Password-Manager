<script setup>
import '@/assets/main.css';
import image from '@/assets/pass.png';
import { SignedIn,SignedOut, UserButton } from '@clerk/vue'

</script>

<template>
   <SignedIn>
         <UserButton afterSignOutUrl="/sign-in" />

     </SignedIn>
     
  <div class="min-h-screen bg-base-100">
    <!-- Sticky Full-Width Navbar -->
    <div class="sticky top-0 z-50 w-full navbar bg-base-200 shadow-md px-4 sm:px-6">
      <div class="flex justify-between items-center w-full">
        <router-link to="/add" class="inline-block">
          <img :src="image" alt="Password Manager" class="h-12 sm:h-14" />
        </router-link>

    
      </div>
    </div>

    <!-- Layout wrapper: sidebar + content -->
    <div class="flex">
      <!-- Sidebar (Desktop Only) -->
      <aside class="w-55 bg-base-200 min-h-screen p-4 space-y-4 shadow-inner hidden md:block">
        <ul class="menu">
          <li>
            <router-link to="/add" class="font-medium">➕ Add Password</router-link>
          </li>
          <br />
          <li>
            <router-link to="/list" class="font-medium">📋 Password List</router-link>
          </li>
        </ul>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6 overflow-x-auto">
        <router-view />
      </main>
    </div>

    <!-- Mobile Footer Navigation -->
    <div class="fixed bottom-0 left-0 right-0 bg-base-200 shadow-inner border-t border-base-300 flex justify-around items-center p-2 md:hidden z-40">
      <router-link
        to="/add"
        class="flex flex-col items-center text-sm text-base-content hover:text-primary"
      >
        ➕
        <span>Add</span>
      </router-link>

      <router-link
        to="/list"
        class="flex flex-col items-center text-sm text-base-content hover:text-primary"
      >
        📋
        <span>List</span>
      </router-link>
    </div>
  </div>
  
 
</template>

