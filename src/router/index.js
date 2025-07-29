import { createRouter, createWebHistory } from 'vue-router'
import { SignIn, SignUp, useAuth } from '@clerk/vue'
import { watch } from 'vue'
import ListPasswords from '@/views/ListPasswords.vue'
import AddPassword from '@/views/AddPassword.vue'

/**
 * Guard to protect routes: waits for Clerk to load, then
 * allows signed-in users and redirects everyone else to /sign-in.
 */
const requireAuth = (to, from, next) => {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded.value) {
    const stop = watch(isLoaded, (loaded) => {
      if (loaded) {
        stop()
        requireAuth(to, from, next)
      }
    })
    return
  }

  if (isSignedIn.value) {
    next()
    return
  }

  next({
    path: '/sign-in',
    query: { redirect: to.fullPath }
  })
}

const routes = [
  {
    path: '/list',
    component: ListPasswords,
    beforeEnter: requireAuth
  },
  {
    path: '/add',
    component: AddPassword,
    beforeEnter: requireAuth
  },
  {
    path: '/sign-in',
    component: SignIn
  },
  {
    path: '/sign-up',
    component: SignUp
  },
  {
    path: '/',
    /**
     * Root guard: once Clerk loads, route to /list if signed in,
     * otherwise to /sign-in.
     */
    beforeEnter: (to, from, next) => {
      const { isLoaded, isSignedIn } = useAuth()

      if (!isLoaded.value) {
        const stop = watch(isLoaded, (loaded) => {
          if (loaded) {
            stop()
            next(isSignedIn.value ? '/list' : '/sign-in')
          }
        })
        return
      }

      next(isSignedIn.value ? '/list' : '/sign-in')
    }
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
