const {elasticClient} = require('./elastic_client')


var addPost = async function(post){
    return await elasticClient.index({
        index: "posts",
        type: "post_mapping",
        id: post.id,
        body: post
    })
}

var addEvent = async function(event){
    return await elasticClient.index({
        index: "events",
        type: "event_mapping",
        id: event.id,
        body: event
    })
}


var updatePost = async function(post){
    await deletePost(post.id)
    await addPost(post)
   
}

var updateEvent = async function(event){
    await deleteEvent(event.id)
    await addEvent(event)
   
}

var deletePost = async function(postId){
    return await elasticClient.delete({
        index: "posts",
        type: "post_mapping",
        id: String(postId)
    })
}

var deleteEvent = async function(eventId){
    return await elasticClient.delete({
        index: "events",
        type: "event_mapping",
        id: String(eventId)
    })
}


var searchPost = async function(query_word){
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

var searchEvent = async function(query_word){
    titleResult =  await elasticClient.search({
        index: "events",
        type: "event_mapping",
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

    bodyResult =  await elasticClient.search({
        index: "events",
        type: "event_mapping",
        body: {
            query: {
                match: {
                    'body': query_word
                }
            }
        }
    })
    
    bodyResult = bodyResult.hits.hits.map(hit => {
        const s = {
            data: hit._source, 
            score: hit._score
        }
        return s
    })

    return {titleResult, bodyResult}
}

module.exports = {
    addPost,
    addEvent,
    searchPost,
    searchEvent,
    deletePost,
    deleteEvent,
    updatePost,
    updateEvent,

}