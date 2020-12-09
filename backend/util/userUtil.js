const { User, Follow } = require("../model/db")
const { Op } = require("sequelize");


var isUserExist = async function(userId) {
    user = await User.findOne({
        where: {
            id: userId
        }
    })
    console.log(user)
    if(user){
        return true
    }
    return false
}

var isFollowing = async function(userId, followedUserId){
    follow = await Follow.findOne({
        where: {
            [Op.and] : {
                follower_user_id: userId,
                followed_user_id: followedUserId
        
            }
        }
    })

    if(follow) {
        return true
    }

    return false
}

module.exports = {
    isUserExist,
    isFollowing
}