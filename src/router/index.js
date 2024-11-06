import { createRouter, createWebHistory } from 'vue-router'

const rootURL = `${process.env.VUE_APP_APP_ROOT_URL}`

const routes = [
  {
    path: '/',
    name: 'SearchPage',
    component: () => import(/* webpackChunkName: "search" */ '../views/SearchPage.vue')
  },
  {
    path: '/about',
    name: 'AboutPage',
    component: () => import(/* webpackChunkName: "search" */ '../views/AboutPage.vue')
  },
  {
    path: '/documentation',
    name: 'DocumentationPage',
    component: () => import(/* webpackChunkName: "search" */ '../views/DocumentationPage.vue')
  },
  {
    path: '/document/:docId',
    name: 'DocumentPage',
    component: () => import(/* webpackChunkName: "document" */ '../views/DocumentPage.vue'),
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(rootURL),
  routes
})

export default router
