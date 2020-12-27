const postUtil = require('../util/postUtil')
const userUtil = require('../util/userUtil')


getHomePosts = async function(req,res){
    userId = req.userId
    try{
		var byFollowings = await postUtil.postsByFollowings(userId)
		var byUserTags = await postUtil.postsByUserTags(userId)
		res.status(200).send({byFollowings, byUserTags})
    }catch(error){
        res.status(500).send({error: error})
    }
}

getUserRecommendations = async function(req, res) {
    userId = req.userId
    try{
		var users = await userUtil.usersByUserTags(userId)
		res.status(200).send(users)
    }catch(error){
        res.status(500).send({error: error.message})
    }
}

module.exports = {
    getHomePosts,
    getUserRecommendations,
}