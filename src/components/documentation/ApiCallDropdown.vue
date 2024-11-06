<template>
  <div class="">
    <div
      :class="['box', 'grid-container', { enabled: enabled }]"
      @click="enabled = !enabled"
    >
      <div class="tag method">{{ method }}</div>
      <div class="example">
        <div class="description">{{ description }}</div>
        <div class="url">
          <a :href="url" target="_blank">{{ url }}</a>
        </div>
      </div>
      <div class="show">
        <span class="icon is-small is-pulled-right">
          <i :class="['fas', enabled ? 'fa-angle-up' : 'fa-angle-down']"></i>
        </span>
      </div>
      <div class="result" v-if="result && enabled">
        <pre v-highlightjs="result">
          <code :class="format ? format : 'json'"></code>
        </pre>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import 'highlight.js/styles/tomorrow.css'

export default {
  name: 'ApiCallDropdown',
  props: ['url', 'description', 'method', 'format'],
  setup (props) {
    const enabled = ref(false)
    const result = ref(null)

    const runApiCall = async function () {
      const res = await fetch(props.url, { method: props.method })
      result.value = await res.text()
    }

    watch(enabled, () => {
      if (result.value === null && enabled.value) {
        runApiCall()
      }
    })

    return {
      enabled,
      result
    }
  }
}
</script>

<style scoped>
.method {
  grid-area: method;

  font-weight: bold;
  font-size: large;
  text-transform: uppercase;
  color: whitesmoke;
  background-color: #555;

  margin-right: 40px;
  padding: 15px;
}
.example {
  grid-area: example;
}
.url {
  padding-top: 4px;
}
.box {
  margin-top: 10px;
  margin-bottom: 10px;
}
.box:hover {
  cursor: pointer;
  background-color: rgb(245, 245, 245);
}
.result {
  grid-area: code;

  margin-top: 12px;
  overflow: auto;
}
.show {
  grid-area: icon;
}
pre {
  padding: 0;
  background-color: white;
}
.grid-container {
  display: grid;
  grid-template-columns: 100px auto 100px;
  grid-template-rows: auto;
  grid-template-areas: "method example icon";

  align-items: center;
  word-break: break-all;
  padding: 16px;
}
.grid-container.enabled {
  grid-template-areas:
    "method example icon"
    "code code code";
}
</style>
