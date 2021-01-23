const { map } = require('async')
const {elasticClient} = require('../elastic/elastic_client')


var add = async function(post){
    return await elasticClient.index({
        index: "posts",
        type: "post_mapping",
        id: post.id,
        body: post
    })
}

var search = async function(query_word){
    titleResult =  await elasticClient.search({
        index: "posts",
        type: "post_mapping",
        body: {
            query: {
                match: {
                    'title': query_word
                }
            }
        }
    })

    titleResult = titleResult.hits.hits.map(hit => {
        const s = {
            data: hit._source, 
            score: hit._score
        }
        return s
    })

    summaryResult =  await elasticClient.search({
        index: "posts",
        type: "post_mapping",
        body: {
            query: {
                match: {
                    'summary': query_word
                }
            }
        }
    })
    
    summaryResult = summaryResult.hits.hits.map(hit => {
        const s = {
            data: hit._source, 
            score: hit._score
        }
        return s
    })

    return {titleResult, summaryResult}
}

module.exports = {
    add,
    search,
}