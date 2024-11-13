import { createRouter, createWebHistory } from 'vue-router'

const rootURL = `${import.meta.env.VITE_APP_ROOT_URL}`

const routes = [
  {
    path: '/',
    name: 'SearchPage',
    component: () => import('../views/SearchPage.vue')
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: () => import('../views/AboutPage.vue')
  },
  {
    path: '/documentation',
    name: 'DocumentationPage',
    component: () => import('../views/DocumentationPage.vue')
  },
  {
    path: '/document/:docId',
    name: 'DocumentPage',
    component: () => import('../views/DocumentPage.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(rootURL),
  routes
})

export default router
