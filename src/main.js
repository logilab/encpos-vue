import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import useSimpleSearch from "@/composables/use-simple-search";

createApp(App).provide("search", useSimpleSearch()).use(router).mount('#app')
