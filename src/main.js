import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import useSimpleSearch from "@/composables/use-simple-search";
import useAggSearch from '@/composables/use-agg-search';

createApp(App).provide("search", useSimpleSearch())
              .provide("agg-search", useAggSearch())
              .component('PageBreak', defineAsyncComponent(() =>
                import('@/components/PageBreak.vue')
              ))
              .use(router)
              .mount('#app')
