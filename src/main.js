import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import useEncposSimpleSearch from "@/composables/use-encpos-simple-search";
import useAggSearch from '@/composables/use-agg-search';

createApp(App).provide("search", useEncposSimpleSearch())
              .provide("agg-search", useAggSearch())
              .component('PageBreak', defineAsyncComponent(() =>
                import('@/components/PageBreak.vue')
              ))
              .use(router)
              .mount('#app')
