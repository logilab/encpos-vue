const _baseApiURL = `${process.env.VUE_APP_ELASTICSEARCH_URL}`;


async function searchDocument(query, sorts, ranges, pageNum=1, pageSize=200) {
    //TODO: implement 'group by' parameter
    let rangesArg = ''
    for (let range of ranges){
        rangesArg += `&range[${range.field}]=${range.ops}`
    }
    console.log("range", rangesArg)

    let sortArg = ''
    if (sorts) {
        sortArg = '&sort=' + sorts
    }
    const response = await fetch(`${_baseApiURL}/search?query=${query}${sortArg}${rangesArg}&page[number]=${pageNum || 1}&page[size]=${pageSize}`, {mode: 'cors'})
    return await response.json()
}


export {
    searchDocument
}