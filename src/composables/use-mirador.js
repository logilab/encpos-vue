import {computed, watch} from "vue";
import Mirador from "mirador";

export default function useMirador(containerId = "vue-mirador-container", _manifestId, _canvasIndex = 0) {

    const _windowId = "document"
    let mirador = null

    const config = computed(() => {
        return {
          id: containerId,
          windows: [
            {
              id: _windowId,
              loadedManifest: `https://iiif.chartes.psl.eu/encpos/${_manifestId.toLowerCase()}/manifest`,
              canvasIndex: _canvasIndex.value,
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

    
    const initialize = function() {
        mirador = Mirador.viewer(config.value);
    }

    const dispatchAction = function(action) {
        mirador.store.dispatch(action);
    }

    const setManifestId = function(manifestId) {
        const action = Mirador.actions.fetchManifest(manifestId)
        dispatchAction(action)
    }

    const setCanvasId = function(canvasId) {
        console.log("set canvas index", _windowId, canvasId)
        const action = Mirador.actions.setCanvas(_windowId, canvasId)
        dispatchAction(action)
    }

    const updateConfig = function() {
        const action = Mirador.actions.updateConfig(config.value)
        dispatchAction(action)
    }

    watch(config, updateConfig);
  

    return {
        mirador,
        initialize,
        setManifestId,
        setCanvasId,
        dispatchAction,
        config
    }
}