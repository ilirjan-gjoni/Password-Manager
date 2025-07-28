import { createRouter, createWebHistory } from 'vue-router'
import { SignIn, SignUp } from '@clerk/vue';
import { authGuard } from '@clerk/vue';

const requireAuth = (to, from, next) => {
  const { isSignedIn } = window.Clerk;

  if (isSignedIn) {
    next();
  } else {
    next('/sign-in');
  }
};

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
    redirect: '/add'
  }
]


export const router = createRouter({
  history: createWebHistory(),
  routes
})
