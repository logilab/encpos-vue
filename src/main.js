import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import search from "@/store/search";

createApp(App).provide("searchModule", search).use(router).mount('#app')
