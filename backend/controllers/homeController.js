const postUtil = require('../util/postUtil')
const userUtil = require('../util/userUtil')
const { User } = require("../model/db")


// return a list of recommended projects based on the requesting user's data. 
getHomePosts = async function(req,res){
    userId = req.userId
    try{
		let { posts: byFollowings, ids: byFollowingsIDs} = await postUtil.postsByFollowings(userId) // posts of the users whom the requesting user follows
        let { posts: byUserTags, ids: byUserTagsIDs}  = await postUtil.postsByUserTags(userId) // posts that have the tags which are interested tags of the requesting user.
        
        // remove duplicates
        byUserTags = byUserTags.filter( p => byUserTagsIDs.filter(x => !byFollowingsIDs.includes(x)).includes(p.id))
        
        res.status(200).send({byFollowings, byUserTags})
    }catch(error){
        res.status(500).send({error: error})
    }
}

// return a list of recommended users based on the requesting user's data. 
getUserRecommendations = async function(req, res) {
    userId = req.userId
    try{
        let [similarInterests, sameUniversity, sameDepartment, alreadyFolloweds] = 
            await Promise.all([
                userUtil.usersByUserTags(userId), // users that have similar interested tags.
                userUtil.usersSharingSimilarity("university", userId), // users that have the same university.
                userUtil.usersSharingSimilarity("department", userId), // users that have the same department
                userUtil.getFollowersIDs(userId) // users that follow.
            ])

        // filter results and remove duplicates.
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

// delete the requesting user.
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