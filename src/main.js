import { createApp, defineAsyncComponent } from 'vue'
import App from './App.vue'
import router from './router'
import useEncposSimpleSearch from '@/composables/use-encpos-simple-search'
import useAggSearch from '@/composables/use-agg-search'

import VueHighlightJS from 'vue3-highlightjs'
import useLayout from './composables/use-layout'

window.global = window

createApp(App).provide('search', useEncposSimpleSearch())
  .provide('agg-search', useAggSearch())
  .provide('variable-layout', useLayout())
  .component('PageBreak', defineAsyncComponent(() =>
    import('@/components/PageBreak.vue')
  ))
  .use(router)
  .use(VueHighlightJS)
  .mount('#app')