const {elasticClient} = require('./elastic_client')


// add given post to post schmea in elastic client
var addPost = async function(post){
    return await elasticClient.index({
        index: "posts",
        type: "post_mapping",
        id: post.id,
        body: post
    })
}

// add given event to event schmea in elastic client
var addEvent = async function(event){
    return await elasticClient.index({
        index: "events",
        type: "event_mapping",
        id: event.id,
        body: event
    })
}

// update given post in the post schema in elastic client,  first delete it, then add it again
var updatePost = async function(post){
    await deletePost(post.id) 
    await addPost(post)
   
}

// update given event in the event schema in elastic client,  first delete it, then add it again
var updateEvent = async function(event){
    await deleteEvent(event.id)
    await addEvent(event)
   
}

// delete given post from the post schema in elastic client,
var deletePost = async function(postId){
    return await elasticClient.delete({
        index: "posts",
        type: "post_mapping",
        id: String(postId)
    })
}

// delete given event from the event schema in elastic client,
var deleteEvent = async function(eventId){
    return await elasticClient.delete({
        index: "events",
        type: "event_mapping",
        id: String(eventId)
    })
}

// search for the post schema in elastic client based on the query
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

    titleResult = titleResult.hits.hits.map(hit => hit._source)

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
    
    // concatenate title and summary based results and remove duplicates from the concatenated version.
    concatVersion = summaryResult.hits.hits.map(hit => hit._source).concat(titleResult)
    uniqueSet = new Set(concatVersion.map(res => JSON.stringify(res)))
    result = Array.from(uniqueSet).map(res => JSON.parse(res))
    return result
}

// search for the event schema in elastic client based on the query
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

    titleResult = titleResult.hits.hits.map(hit => hit._source)

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
    
    // concatenate title and summary based results and remove duplicates from the concatenated version.
    concatVersion = bodyResult.hits.hits.map(hit => hit._source).concat(titleResult)
    uniqueSet = new Set(concatVersion.map(res => JSON.stringify(res)))
    result = Array.from(uniqueSet).map(res => JSON.parse(res))
    return result
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