import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/add',
    component: () => import('@/views/AddPassword.vue'),
  },
  {
    path: '/list',
    component: () => import('@/views/ListPasswords.vue'),
  },
  {
    path: '/',
    redirect: '/list'
  },
    {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  }
]

export const router = createRouter({
  history: createWebHistory(),
  routes
})
