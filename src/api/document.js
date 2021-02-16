
async function getDocumentFromApi(id) {
    const response = await fetch(`http://localhost:5050/nautilus/dts/document?id=${id}&xslt`, {mode: 'cors'})
    const document = await response.text()
    return document
}

export {
    getDocumentFromApi
}