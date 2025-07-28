import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { pinia } from './store'
import { ClerkProvider } from '@clerk/vue';


const app = createApp(ClerkProvider, {
  publishableKey: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
  frontendApi: import.meta.env.VITE_CLERK_FRONTEND_API
});


app.use(router)
app.use(pinia)

app.mount('#app')
