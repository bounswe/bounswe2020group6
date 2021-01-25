const postUtil = require('../util/postUtil')
const userUtil = require('../util/userUtil')
const { User } = require("../model/db")


getHomePosts = async function(req,res){
    userId = req.userId
    try{
		let { posts: byFollowings, ids: byFollowingsIDs} = await postUtil.postsByFollowings(userId)
        let { posts: byUserTags, ids: byUserTagsIDs}  = await postUtil.postsByUserTags(userId)
        
        byUserTags = byUserTags.filter( p => byUserTagsIDs.filter(x => !byFollowingsIDs.includes(x)).includes(p.id))
        
        res.status(200).send({byFollowings, byUserTags})
    }catch(error){
        res.status(500).send({error: error})
    }
}

getUserRecommendations = async function(req, res) {
    userId = req.userId
    try{
        let [similarInterests, sameUniversity, sameDepartment, alreadyFolloweds] = 
            await Promise.all([
                userUtil.usersByUserTags(userId),
                userUtil.usersSharingSimilarity("university", userId),
                userUtil.usersSharingSimilarity("department", userId),
                userUtil.getFollowersIDs(userId)
            ])

        similarInterests = similarInterests.filter( user => !(alreadyFolloweds.includes(user.id)))
        
        sameUniversity = sameUniversity.filter( user => !(alreadyFolloweds.includes(user.id)))
        sameUniversity = sameUniversity.filter( user => !(similarInterests.map(u => u.id).includes(user.id)))
        
        sameDepartment = sameDepartment.filter( user => !(alreadyFolloweds.includes(user.id)))
        sameDepartment = sameDepartment.filter( user => !(similarInterests.map(u => u.id).includes(user.id)))
        sameDepartment = sameDepartment.filter( user => !(sameUniversity.map(u => u.id).includes(user.id)))

		res.status(200).send({similarInterests, sameUniversity, sameDepartment})
    }catch(error){
        res.status(500).send({error: error.message})
    }
}

deleteAccount = async function(req, res) {
    id_to_delete = Number(req.userId)
    try {
        userDb = await User.destroy({
            where: {
                id: id_to_delete
            }
        })
        res.status(200).send({message: "Successful"})

    }
    catch(error){
        res.status(500).send({error: "Something went wrong"})
    }
    
}

module.exports = {
    getHomePosts,
    getUserRecommendations,
    deleteAccount
}