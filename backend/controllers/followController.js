const { Follow, User } = require('../model/db')
const userUtils = require('../util/userUtil')
const {addNotification} = require('../util/notificationUtil')

// create follow. follower id is fetched from authorization token. followed id comes from the request parameter.
addFollow = async function(req, res){
    follower_user_id = Number(req.userId) 
    followed_user_id = req.body.userId 
    try{
        userExistence = await userUtils.isUserExist(followed_user_id) // user existence check
        if(!userExistence){
            return res.status(400).send({message: "User not found"})
        }
        followExistence = await userUtils.isFollowing(follower_user_id, followed_user_id) // follow existence check
        if(followExistence){
            return res.status(400).send({message: "You are already following this user."})
        }
        
        followData = {
            follower_user_id,
            followed_user_id
        }
        followDb = await Follow.create(followData)
        
        // create notification
        body = "User " + follower_user_id + " followed " + "user " + followed_user_id
        addNotification(1,5,follower_user_id,follower_user_id,followed_user_id,body)
        res.status(200).send({message: "Successful"}) 
    }catch(error){
        res.status(500).send({error: "Something is wrong"})

    }
    
}

// delete follow. follower id is fetched from authorization token. followed id comes from the request parameter.
removeFollow = async function(req, res){
    follower_user_id = Number(req.userId)
    followed_user_id = req.body.userId
    try {

        userExistence = await userUtils.isUserExist(followed_user_id) // user existence check
        if(!userExistence){
            return res.status(400).send({message: "User not found"})
        }

        followExistence = await userUtils.isFollowing(follower_user_id, followed_user_id) // follow existence check
        if(!followExistence){
            return res.status(400).send({message: "You are not following this user."})
        }

        followDb = await Follow.destroy({
            where: {
                follower_user_id: follower_user_id,
                followed_user_id: followed_user_id
            }
        })

        res.status(200).send({message: "Successful"})
    } catch(error){
        res.status(500).send({error: "Something is wrong"})
    }
}

// return a list of users whom the requesting user follows
getFollowings = async function(req, res) {
    follower_user_id = Number(req.userId)
    try{
        followings = await userUtils.getFollowings(follower_user_id)
        res.status(200).send({message: "Successful", data: followings})
    }
    catch(error){
        res.status(500).send({error: "Something is wrong"})
    }
}

// return a list of users who follow the requesting user 
getFollowers = async function(req, res) {
    followed_user_id = Number(req.userId)
    try{
        followers = await userUtils.getFollowers(followed_user_id)
        res.status(200).send({message: "Successful", data: followers})
    }
    catch(error){
        res.status(500).send({error: "Something is wrong"})
    }
}

module.exports = {
    addFollow,
    removeFollow,
    getFollowings,
    getFollowers
}
