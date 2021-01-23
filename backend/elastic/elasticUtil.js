const { map } = require('async')
const {elasticClient} = require('./elastic_client')


var addPost = async function(post){
    return await elasticClient.index({
        index: "posts",
        type: "post_mapping",
        id: post.id,
        body: post
    })
}

var updatePost = async function(post){
    await deletePost(post.id)
    await addPost(post)
   
}

var deletePost = async function(postId){
    return await elasticClient.delete({
        index: "posts",
        type: "post_mapping",
        id: String(postId)
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
    addPost,
    search,
    deletePost,
    updatePost,
}