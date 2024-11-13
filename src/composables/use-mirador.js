import { computed, onUnmounted, readonly, ref } from 'vue'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import Mirador from 'mirador'
import MiradorApp from 'mirador/dist/es/src/components/App'
import createPluggableStore from 'mirador/dist/es/src/state/createPluggableStore'

export default function useMirador (containerId = 'vue-mirador-container', _manifestUrl, _canvasIndex = 0) {
  const _windowId = 'document'
  let miradorStore = null
  const reactRoot = ref(null)

  const manifestUrl = ref(_manifestUrl)

  const config = computed(() => {
    return {
      id: containerId,
      windows: [
        {
          id: _windowId,
          loadedManifest: manifestUrl.value,
          canvasIndex: _canvasIndex
        }
      ],
      window: {
        allowClose: false,
        allowMaximize: false,
        defaultSideBarPanel: 'info',
        sideBarOpenByDefault: false,
        hideWindowTitle: true,
        maximizedByDefault: true
      },
      selectedTheme: 'light',
      themes: {
        light: {
          palette: {
            type: 'light',
            primary: {
              main: '#971716'
            },
            secondary: {
              main: '#B9192F'
            }
          }
        }
      },
      workspace: {
        showZoomControls: true,
        type: 'mosaic' // Which workspace type to load by default. Other possible values are "elastic"
      },
      workspaceControlPanel: {
        enabled: false
      }
    }
  })

  const initialize = function () {
    console.log('mirador init')
    if (reactRoot.value !== null) {
      console.log('mirador unmount in initialize')
      reactRoot.value.unmount()
    }
    console.log('document.getElementById(containerId)', containerId, document.getElementById(containerId))
    reactRoot.value = ReactDOM.createRoot(document.getElementById(containerId))
    miradorStore = createPluggableStore(config.value)
    reactRoot.value.render(
      React.createElement(
        Provider,
        { store: miradorStore },
        React.createElement(
          MiradorApp,
          { plugins: [] }
        )
      )
    )
  }

  onUnmounted(() => {
    if (reactRoot.value !== null) {
      console.log('mirador unmount in onUnmounted')
      reactRoot.value.unmount()
    }
  })

  const dispatchAction = function (action) {
    if (miradorStore === null) {
      initialize()
    }
    miradorStore.dispatch(action)
  }

  const setManifestUrl = function (newUrl) {
    console.log('setManifestUrl', newUrl)
    manifestUrl.value = newUrl
    const action = Mirador.actions.updateWindow(_windowId, {
      manifestId: manifestUrl.value
    })
    dispatchAction(action)
  }

  const setCanvasId = function (canvasId) {
    console.log('setCanvasId', canvasId)
    const action = Mirador.actions.setCanvas(_windowId, canvasId)
    dispatchAction(action)
  }

  return {
    manifestUrl: readonly(manifestUrl),
    initialize,
    setManifestUrl,
    setCanvasId,
    dispatchAction,
    config: readonly(config)
  }
}
