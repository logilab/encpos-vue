const _baseApiURL = `${import.meta.env.VUE_APP_API_URL}`

async function getMetadataFromApi (id, options = {}) {
  const response_metadata = await fetch(`${_baseApiURL}/collections?id=${id}`, { mode: 'cors', ...options })
  const metadata = await response_metadata.json()
  return metadata
}

async function getDocumentFromApi (id, options = {}) {
  const response = await fetch(`${_baseApiURL}/document?id=${id}&format=html`, { mode: 'cors', ...options })
  const document = await response.text()
  return document
}

async function getPositionAnneeFromApi (id, withSupplement = false, options = {}) {
  const response = await fetch(`${_baseApiURL}/collections?id=ENCPOS_${id}`, { mode: 'cors', ...options })
  let responseSupplement = {}
  if (withSupplement) {
    responseSupplement = await fetch(`${_baseApiURL}/collections?id=ENCPOS_${id}b`, { mode: 'cors', ...options })
  }
  const document = await response.json()
  let documentSupplement = {}
  if (responseSupplement && responseSupplement.ok) {
    documentSupplement = await responseSupplement.json()
  }
  return [document, documentSupplement]
}

async function getMetadataENCPOSFromApi (options = {}) {
  const response = await fetch(`${_baseApiURL}/collections?id=ENCPOS`, { mode: 'cors', ...options })
  const document = await response.json()
  return document
}

export {
  getDocumentFromApi,
  getMetadataFromApi,
  getPositionAnneeFromApi,
  getMetadataENCPOSFromApi
}
