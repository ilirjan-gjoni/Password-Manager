import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '@clerk/vue'

// Views
import SignInView from '@/views/SignInView.vue'
import SignUpView from '@/views/SignUpView.vue'

const routes = [
  {
    path: '/add',
    component: () => import('@/views/AddPassword.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/list',
    component: () => import('@/views/ListPasswords.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/sign-in',
    component: SignInView,
  },
  {
    path: '/sign-up',
    component: SignUpView,
  },
  {
    path: '/',
    redirect: '/add',
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})

// ✅ Protect routes that require authentication
router.beforeEach((to) => {
  const { isLoaded, isSignedIn } = useAuth()

  // Wait until Clerk has loaded the auth state
  if (!isLoaded.value) return

  // If route needs auth and user is not signed in, redirect to sign-in
  if (to.meta.requiresAuth && !isSignedIn.value) {
    return { path: '/sign-in' }
  }

  // Allow navigation
  return true
})
