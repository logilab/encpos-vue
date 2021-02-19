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


export {
    getDocumentFromApi,
    getMetadataFromApi
}