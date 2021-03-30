const _baseApiURL = `${process.env.VUE_APP_ELASTICSEARCH_URL}`;


async function searchDocument(query, ranges, pageNum, pageSize=200) {
    //TODO: implement 'group by' parameter
    let rangesArg = []
    for (let range in ranges){
        rangesArg.push(`range[${range.field}]=${range.ops}`);
    }
    const response = await fetch(`${_baseApiURL}/search?query=${query}${rangesArg.join('&')}&page[number]=${pageNum || 1}&page[size]=${pageSize}`, {mode: 'cors'})
    return await response.json()
}


export {
    searchDocument
}