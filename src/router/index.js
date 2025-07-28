import { createRouter, createWebHistory } from 'vue-router'
import { SignIn, SignUp } from '@clerk/vue';
import { authGuard } from '@clerk/vue';

const routes = [
  {
    path: '/add',
    component: () => import('@/views/AddPassword.vue'),
    beforeEnter: authGuard
  },
  {
    path: '/list',
    component: () => import('@/views/ListPasswords.vue'),
    beforeEnter: authGuard
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
    redirect: '/add'
  }
]


export const router = createRouter({
  history: createWebHistory(),
  routes
})
