import { createApp } from 'vue'
import App from './App.vue'
import { router } from './router'
import { pinia } from './store'
import { clerkPlugin } from '@clerk/vue' 

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file ')
}

const app = createApp(App)

app.use(router)
app.use(pinia)

app.use(clerkPlugin, { publishableKey: PUBLISHABLE_KEY })
app.mount('#app')
