import { createRouter, createWebHistory } from 'vue-router'
import { SignIn, SignUp, useAuth } from '@clerk/vue'
import { watch } from 'vue'

//const requireAuth = (to, from, next) => {
  //const { isSignedIn } = window.Clerk;
  //  if (isSignedIn) {
   // next();
  //} else {
   // next('/sign-in');
 // }
//};
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
    path: '/add',
    component: () => import('@/views/AddPassword.vue'),
    beforeEnter: requireAuth
  },
  {
    path: '/list',
    component: () => import('@/views/ListPasswords.vue'),
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
    redirect: () => {
      const { isSignedIn } = useAuth()
      return isSignedIn.value ? '/list' : '/sign-in'
  }
  }
]


export const router = createRouter({
  history: createWebHistory(),
  routes
})
