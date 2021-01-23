const elastic = require('elasticsearch')
const {Project} = require('../model/db')


const elasticClient = new elastic.Client({
    host: 'localhost:9200',
    log: 'trace'
})


const createPostIndex = async function(){
    postIndex =  await client.indices.create({
        index: "posts"
    })

    client.indices.putMapping({
        index: "posts",
        type: "post_mapping",
        body: Project
    })
    
    return postIndex
}



module.exports = {
    elasticClient,
    createPostIndex,
}