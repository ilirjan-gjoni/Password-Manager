import { createRouter, createWebHistory } from 'vue-router'

// Lazy-loaded views
const AddPassword = () => import('@/views/AddPassword.vue')
const ListPasswords = () => import('@/views/ListPasswords.vue')
const SignInView = () => import('@/views/SignInView.vue')
const SignUpView = () => import('@/views/SignUpView.vue')

const routes = [
  {
    path: '/add',
    component: AddPassword, // ⛔️ Use <Protect> inside component
  },
  {
    path: '/list',
    component: ListPasswords, // ⛔️ Use <Protect> inside component
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
  component: () => import('@/views/HomeRedirect.vue'),
},
    {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
