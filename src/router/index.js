import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import DocumentPage from '../views/DocumentPage.vue'

const rootURL = `${process.env.VUE_APP_APP_ROOT_URL}`

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/document/:docId',
    name: 'DocumentPage',
    component: DocumentPage,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(rootURL),
  routes
})

export default router
