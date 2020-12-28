const { User, Follow, UserUp, UserInterest } = require("../model/db")
const { Op, Sequelize } = require("sequelize");
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

var getFollowings = async function(userId){
    follower_user_id = userId
    followers = await Follow.findAll({
        where: {
            follower_user_id: follower_user_id
        },
        attributes: [],
        include: {
            model: User, as: 'following',
            attributes: ['id', 'name', 'surname', 'profile_picture_url']
        }
    })
    return followers
}

var getFollowingsIDs = async function(userId){
    follower_user_id = userId
    followers = await Follow.findAll({
        where: {
            follower_user_id: follower_user_id
        },
        attributes: [],
        include: {
            model: User, as: 'following',
            attributes: ['id']
        }
    })
    return followers.map( u => u.following.id )
}

var getFollowers = async function(userId){
    followed_user_id = userId
    followers = await Follow.findAll({
        where: {
            followed_user_id: followed_user_id
        },
        attributes: [],
        include: {
            model: User, as: 'followed',
            attributes: ['id', 'name', 'surname', 'profile_picture_url']
        }
    })
    return followers
}

var getFollowersIDs = async function(userId){
    followed_user_id = userId
    followers = await Follow.findAll({
        where: {
            followed_user_id: followed_user_id
        },
        attributes: [],
        include: {
            model: User, as: 'followed',
            attributes: ['id']
        }
    })
    return followers.map( u => u.followed.id )
}

var usersByTags = async function(tags) {
    users = await User.findAll({
        attributes : ['id', 'name','surname','university','department', 'profile_picture_url'],
        include : [
            {
            model : UserInterest,
            where : {  
                interest : {
                [Op.in] : tags
                }
            },
            attributes : ['user_id']
            },
        ]
    });
}

var usersByUserTags = async function(userId) {
    user_interests = await UserInterest.findAll({
        where: {
            user_id : userId
        },
        attributes : ['interest']
    });
    interest_array = []
    for(var i in user_interests)
        interest_array.push(user_interests[i].interest);    	
        
    users = await User.findAll({
        attributes : ['id', 'name','surname','university','department', 'profile_picture_url'],
        include : [
            {
            model : UserInterest,
            where : {  
                interest : {
                [Op.in] : interest_array
                }
            },
            attributes : []
            },
        ]
    });

    return users
}

var usersSharingSimilarity = async function(field, userId) {
    users = await User.findAll({
        where: {
            [field]: {
                [Op.eq]: Sequelize.literal(`(
                    SELECT ${field}
                    FROM users
                    WHERE id = ${userId}
                )`)
            }
        },
        attributes : ['id', 'name','surname','university','department', 'profile_picture_url'],
    });

    return users
}

module.exports = {
    isUserExist,
    isFollowing,
    getCitations,
    isUpped,
    getUpCounts,
    getFollowedCounts,
    getFollowingCounts,
    getFollowers,
    getFollowersIDs,
    getFollowings,
    getFollowingsIDs,
    usersByTags,
    usersByUserTags,
    usersSharingSimilarity,
}
