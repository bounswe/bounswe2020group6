const {elasticClient} = require('../elastic')


var addPostToElastic = function(data){
    bulkBody = []

    bulkBody.push({
        index: {
            _index: "library",
            _type: "post",
            _id: data.id
        }
    })
    bulkBody.push(data)

    elasticClient.bulk({body: bulkBody}).then(response => {
        console.log("bulked")
    }).catch(err => {
        console.log("error")
    })
}

var updatePostInElastic = function(data){

}

var searchPost = function(query){
    return elasticClient.get({_index: 'library', _type: "post", _id: 12}).then(resp => console.log(resp)).catch(err => console.log(err))
}

var indices = function(){
    return elasticClient.cat.indices({v: true}).then(console.log).catch(err => console.log(err))
}

module.exports = {
    addPostToElastic,
    searchPost,
    indices,
}