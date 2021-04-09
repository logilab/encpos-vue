const _baseApiURL = `${process.env.VUE_APP_ELASTICSEARCH_URL}`;


async function searchDocument(query, sorts, ranges, pageNum=1, pageSize=200) {
    let rangesArg = ''
    for (let range of ranges){
        rangesArg += `&range[${range.field}]=${range.ops}`
    }

    let sortArg = ''
    if (sorts) {
        sortArg = '&sort=' + sorts
    }
    const response = await fetch(`${_baseApiURL}/search?query=${query}${sortArg}${rangesArg}&page[number]=${pageNum || 1}&page[size]=${pageSize}`, {mode: 'cors'})
    return await response.json()
}

async function searchDocumentWithAgg(query, sorts, ranges, field, afterKey=null, pageSize=200) {
    let rangesArg = ''
    for (let range of ranges){
        rangesArg += `&range[${range.field}]=${range.ops}`
    }

    let sortArg = ''
    if (sorts) {
        sortArg = '&sort=' + sorts
    }
    
    let groupbyArg = `&groupby[field]=${field}`
    if (afterKey) {
        groupbyArg += `&groupby[after-page]=${afterKey}`
    }

    const response = await fetch(`${_baseApiURL}/search?query=${query}${sortArg}${rangesArg}${groupbyArg}&page[size]=${pageSize}`, {mode: 'cors'})
    return await response.json()
}

export {
    searchDocument,
    searchDocumentWithAgg
}