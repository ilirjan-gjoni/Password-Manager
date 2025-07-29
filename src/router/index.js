import { createRouter, createWebHistory } from 'vue-router'

// Lazy-load views
const AddPassword = () => import('@/views/AddPassword.vue')
const ListPasswords = () => import('@/views/ListPasswords.vue')
const SignInView = () => import('@/views/SignInView.vue')
const SignUpView = () => import('@/views/SignUpView.vue')

const routes = [
  {
    path: '/add',
    component: AddPassword,
    meta: { requiresAuth: true },
  },
  {
    path: '/list',
    component: ListPasswords,
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
  routes,
})

// ✅ FIXED: delay routing until Clerk is fully loaded
router.beforeEach(async (to, from, next) => {
  const { isLoaded, isSignedIn } = await import('@clerk/vue').then(m => m.useAuth())

  // Wait until Clerk finishes loading
  if (!isLoaded.value) {
    return next(false) // cancel navigation until ready
  }

  // Redirect to sign-in if route is protected and user is not signed in
  if (to.meta.requiresAuth && !isSignedIn.value) {
    return next('/sign-in')
  }

  // All good
  return next()
})
