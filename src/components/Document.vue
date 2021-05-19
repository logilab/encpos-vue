<template>
  <custom-document />
</template>
<script>
import { inject } from "vue";
import { getDocumentFromApi } from "@/api/document";
import { defineAsyncComponent } from "vue/dist/vue.esm-bundler.js";

export default {
  name: "Document",

  props: ["id"],

  async setup(props) {
    const mirador = inject("mirador");

    /*
      Dynamically build a component 
    */
    const customDocument = defineAsyncComponent(async () => {
      // fetch the initial template
      const data = await getDocumentFromApi(props.id);
      // build a temporary dom just to ease the navigation inside the document
      let tmpDom = document.createElement("div");
      tmpDom.innerHTML = data;

      // customize the template with some vue components and code
      tmpDom.querySelectorAll("p").forEach((e) => {
        e.innerHTML += `<button @click='injected'>INJECTED</button>`;
      });

      // return what will make the async component
      return new Promise((resolve) => {
        resolve({
          template: tmpDom.innerHTML, // inject the html here
          components: {},
          methods: {
            injected() {
              console.log("clock click");
              mirador.setCanvasId(
                "https://iiif.chartes.psl.eu/encpos/encpos_1908_01/canvas/f3"
              );
            },
          },
        });
      });
    });
    return {
      customDocument,
    };
  },
};
</script>
<style scoped>
@import "../assets/css/html.css";
@import "../assets/css/postprod.css";
</style>
