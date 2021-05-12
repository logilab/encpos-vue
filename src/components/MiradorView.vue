<template>
  <div id="vue-mirador-container" />
</template>

<script>
import { computed, watch, onMounted } from "vue";
import Mirador from "mirador";

export default {
  name: "MiradorViewer",
  components: {},
  props: ["textid"],
  setup(props) {
    const config = computed(() => {
      return {
        id: "vue-mirador-container",
        windows: [
          {
            loadedManifest:
              "https://iiif.chartes.psl.eu/encpos/" +
              props.textid.toLowerCase() +
              "/manifest",
            canvasIndex: 0,
          },
        ],
        window: {
          allowClose: false,
          allowMaximize: false,
          defaultSideBarPanel: "info",
          sideBarOpenByDefault: false,
          hideWindowTitle: true,
          maximizedByDefault: true,
        },
        workspace: {
          showZoomControls: true,
          type: "mosaic", // Which workspace type to load by default. Other possible values are "elastic"
        },
        workspaceControlPanel: {
          enabled: false,
        },
      };
    });

    onMounted(() => {
      Mirador.viewer(config.value);
      watch(config, () => {
        Mirador.viewer(config.value);
      });
    });
  },
};
</script>

<style scoped>
#vue-mirador-container {
  min-height: 80vh;
  min-width: 30%;
  position: relative;
}
</style>
