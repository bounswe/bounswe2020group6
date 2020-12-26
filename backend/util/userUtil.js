const { User, Follow, UserUp } = require("../model/db")
const { Op } = require("sequelize");
const cheerio = require('cheerio');
const got = require('got');


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

var isUpped = async function(userId, uppedUserId) {
    up = await UserUp.findOne({
        where: {
            [Op.and] : {
                upper_user_id: userId,
                upped_user_id: uppedUserId
        
            }
        }
    })

    if(up){
        return true
    }
    return false
}

var getUpCounts = async function(userId){
    upCount = await UserUp.count({
        where: {
            upped_user_id: userId
        }
    })

    return upCount
}

var getFollowingCounts = async function(userId){
    followingCount = await Follow.count({
        where: {
            follower_user_id: userId
        }
    })

    return followingCount
}

var getFollowedCounts = async function(userId){
    followedCount = await Follow.count({
        where: {
            followed_user_id: userId
        }
    })

    return followedCount
}

var getCitations = async function(username) {
    
    let url = "http://cse.bth.se/~fer/googlescholar-api/googlescholar.php?user="+username
    const response = await got(url);  
  
    return JSON.parse(response.body);
}

module.exports = {
    isUserExist,
    isFollowing,
    getCitations,
    isUpped,
    getUpCounts,
    getFollowedCounts,
    getFollowingCounts
}
