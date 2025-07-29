<script setup>
</script>


<template>
  <Protect redirectTo="/sign-in">
  <div>
    <h1>404 - Page Not Found</h1>
    <p>The page you are looking for does not exist.</p>
    <router-link to="/add">Go to Add Password</router-link>
  </div>
  </Protect>
</template>

