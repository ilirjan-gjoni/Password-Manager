import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@clerk/vue'

// Lazy-load views
const AddPassword = () => import('@/views/AddPassword.vue')
const ListPasswords = () => import('@/views/ListPasswords.vue')
const SignInView = () => import('@/views/SignInView.vue')
const SignUpView = () => import('@/views/SignUpView.vue')

const routes = [
  {
    path: '/add',
    component: AddPassword,
    meta: { requiresAuth: true }, // ✅ Protected
  },
  {
    path: '/list',
    component: ListPasswords,
    meta: { requiresAuth: true }, // ✅ Protected
  },
  {
    path: '/sign-in',
    component: SignInView, // 👈 Public
  },
  {
    path: '/sign-up',
    component: SignUpView, // 👈 Public
  },
  {
    path: '/',
    redirect: '/add',
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ✅ Route Guard for Clerk
router.beforeEach((to) => {
  const { isLoaded, isSignedIn } = useAuth()

  // Wait for Clerk to load
  if (!isLoaded.value) {
    return false // Cancel navigation until Clerk is ready
  }

  // If route requires auth and user is not signed in, redirect
  if (to.meta.requiresAuth && !isSignedIn.value) {
    return { path: '/sign-in' }
  }

  return true // Allow navigation
})
