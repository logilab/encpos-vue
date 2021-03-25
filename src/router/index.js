import { createRouter, createWebHistory } from 'vue-router'

const rootURL = `${process.env.VUE_APP_APP_ROOT_URL}`

const routes = [
  {
    path: '/',
    name: 'SearchPage',
    component:  () => import(/* webpackChunkName: "about" */ '../views/SearchPage.vue')
  },
  {
    path: '/document/:docId',
    name: 'DocumentPage',
    component:  () => import(/* webpackChunkName: "about" */ '../views/DocumentPage.vue'),
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(rootURL),
  routes
})

export default router
