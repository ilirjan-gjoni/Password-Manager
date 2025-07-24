<script setup>
import '@/assets/main.css';
import image from '@/assets/pass.png';

</script>

<template>
  <div class="min-h-screen bg-base-100">
    <!-- Top Navbar -->
    <div class="navbar bg-base-200 shadow-md px-6">
      <div class="flex-1">
    <router-link to="/add" class="inline-block">
      <img :src="image" alt="Password Manager" class="h-15" />
    </router-link>
    </div>


    </div>


    <!-- Layout wrapper: sidebar + content -->
    <div class="flex">
      <!-- Sidebar -->
      <aside class="w-55 bg-base-200 min-h-screen p-4 space-y-4 shadow-inner hidden md:block">
      
        <ul class="menu">
          <li><router-link to="/add" class="font-medium">➕ Add Password</router-link></li> <br>
          <li><router-link to="/list" class="font-medium">📋 Password List</router-link></li>
          <!-- Add more links if needed -->
        </ul>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 p-6">
        <router-view />
      </main>
    </div>

  </div>
</template>
