async function getMetadataFromApi(id) {
    const response_metadata = await fetch(`http://localhost:5050/dts/collections?id=${id}`, {mode: 'cors'})
    const metadata = await response_metadata.json()
    return metadata
}

async function getDocumentFromApi(id) {
    const response = await fetch(`http://localhost:5050/dts/document?id=${id}&xslt`, {mode: 'cors'})
    const document = await response.text()
    return document
}

async function getPositionAnneeFromApi(id) {
    const response = await fetch(`http://localhost:5050/dts/collections?id=ENCPOS_${id}`, {mode: 'cors'})
    const document = await response.json()
    return document
}

async function getMetadataENCPOSFromApi(){
    const response = await fetch(`http://localhost:5050/dts/collections?id=ENCPOS`, {mode: 'cors'})
    const document = await response.json()
    return document
}

export {
    getDocumentFromApi,
    getMetadataFromApi,
    getPositionAnneeFromApi,
    getMetadataENCPOSFromApi
}