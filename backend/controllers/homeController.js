const postUtil = require('../util/postUtil')
const userUtil = require('../util/userUtil')


getHomePosts = async function(req,res){
    userId = req.userId
    try{
		let byFollowings = await postUtil.postsByFollowings(userId)
		let byUserTags = await postUtil.postsByUserTags(userId)
		res.status(200).send({byFollowings, byUserTags})
    }catch(error){
        res.status(500).send({error: error})
    }
}

getUserRecommendations = async function(req, res) {
    userId = req.userId
    try{
        let users = await userUtil.usersByUserTags(userId)
        let alreadyFolloweds = (await userUtil.getFollowings(userId)).map( u => u.following.id)

        users = users.filter( user => !(alreadyFolloweds.includes(user.id)))

		res.status(200).send(users)
    }catch(error){
        res.status(500).send({error: error.message})
    }
}

module.exports = {
    getHomePosts,
    getUserRecommendations,
}