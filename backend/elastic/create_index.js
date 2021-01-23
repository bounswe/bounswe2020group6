const client = require('./elastic_client')
const {Project} = require('../model/db')

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
    createPostIndex,
}