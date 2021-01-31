const { User, Follow, UserUp, UserInterest } = require("../model/db")
const { Op, Sequelize } = require("sequelize");
const got = require('got');


/**
 * checks whether user with given id exists
 * @param {number} userId
 * @returns {boolean} 
 */
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

/**
 * checks if a user follows another one
 * @param {number} userId the main user
 * @param {number} followedUserId the one that's whether followed or not
 * @returns {boolean} whether follows or not
 */
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

/**
 * whether user has upvoted another user or not
 * @param {number} userId 
 * @param {number} uppedUserId 
 * @returns {boolean}
 */
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

/**
 * returns number of upvotes user has
 * @param {number} userId
 * @returns {number} 
 */
var getUpCounts = async function(userId){
    upCount = await UserUp.count({
        where: {
            upped_user_id: userId
        }
    })

    return upCount
}

/**
 * returns number of accounts this user is following
 * @param {number} userId 
 * @returns {number}
 */
var getFollowingCounts = async function(userId){
    followingCount = await Follow.count({
        where: {
            follower_user_id: userId
        }
    })

    return followingCount
}

/**
 * returns number of accounts this user is followed by
 * @param {number} userId 
 * @returns {number}
 */
var getFollowedCounts = async function(userId){
    followedCount = await Follow.count({
        where: {
            followed_user_id: userId
        }
    })

    return followedCount
}

/**
 * returns google scholar data of a user
 * @param {string} username user's id in google scholar
 * @returns {object}
 */
var getCitations = async function(username) {
    
    let url = "http://cse.bth.se/~fer/googlescholar-api/googlescholar.php?user="+username
    const response = await got(url);  
  
    return JSON.parse(response.body);
}

/**
 * returns accounts followed by the user given in parameter
 * @param {number} userId 
 * @returns {object[]}
 */
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

/**
 * returns accounts' ids followed by the user given in parameter
 * @param {number} userId 
 * @returns {number[]}
 */
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

/**
 * returns accounts following the user given in parameter
 * @param {number} userId 
 * @returns {object[]}
 */
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

/**
 * returns accounts' ids following the user given in parameter
 * @param {number} userId 
 * @returns {number[]}
 */
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

/**
 * retuns users that have interests in given areas
 * @param {string[]} tags 
 * @returns {object[]}
 */
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

/**
 * first gets a user's interested tags, then finds other users interested
 * in those tags, then returns those users
 * @param {number} userId 
 * @returns {object[]}
 */
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

/**
 * returns users having common values in a given field
 * with the given user
 * @param {string} field the field name, we are looking to find common values
 * @param {number} userId given user's id
 * @returns {object[]}
 */
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
        attributes : ['id', 'name','surname','university','department', 'title', 'profile_picture_url'],
    });

    return users
}

/**
 * finds users such that their name starts with the given query
 * @param {string} query 
 * @returns {object[]}
 */
var fullnameStartsWith = async function(query){
    users = User.findAll({
        where: Sequelize.where(Sequelize.fn('concat', Sequelize.col("name"), " ", Sequelize.col("surname")), {
            [Sequelize.Op.iLike]: query + "%"
        }),
        attributes : ['id', 'name','surname','university','department', 'title', 'profile_picture_url'],
    })

    return users;
}

/**
 * finds users such that their last name starts with the given query
 * @param {string} query 
 * @returns {object[]}
 */
var lastNameStartsWith = async function(query){
    users = User.findAll({
        where: {
            surname: {
                [Sequelize.Op.iLike]: query + "%"
            }
        },
        attributes : ['id', 'name','surname','university','department', 'title', 'profile_picture_url'],
    })

    return users;
}

/**
 * finds users such that their name contains the given query
 * @param {string} query 
 * @returns {object[]}
 */
var fullnameContains = async function(query){
    users = User.findAll({
        where: Sequelize.where(Sequelize.fn('concat', Sequelize.col("name"), " ", Sequelize.col("surname")), {
            [Sequelize.Op.iLike]: "%" + query + "%"
        }),
        attributes : ['id', 'name','surname','university','department', 'title', 'profile_picture_url'],
    })

    return users;
}

/**
 * returns all users that have common university, department or title with the given user
 * filters results to make sure a user is not included twice
 * @param {number} userId
 * @returns {object[]} 
 */
var getSimilarUsersByFields = async function(userId){

    let [universityMatch, departmentMatch, titleMatch] =
        await Promise.all([
            usersSharingSimilarity("university", userId),
            usersSharingSimilarity("department", userId),
            usersSharingSimilarity("title", userId),
        ]) // retrieve users sharing the same value for the given field.
    
    // remove the user itself from the similar list.
    universityMatch = universityMatch.filter(user => user.id != userId) 
    departmentMatch = departmentMatch.filter(user => user.id != userId)
    titleMatch = titleMatch.filter(user => user.id != userId)

    // users that have three matches
    threeMatches = universityMatch.filter( user => departmentMatch.map(u => u.id).includes(user.id) && titleMatch.map(us => us.id).includes(user.id))
    
    // users that have either the same university-department or university-title
    twoMatches = universityMatch.filter( user => departmentMatch.map(u => u.id).includes(user.id) || titleMatch.map(us => us.id).includes(user.id))
    // plus users that have the same department-title pair
    twoMatches.push(...departmentMatch.filter( user => titleMatch.map(us => us.id).includes(user.id)))
    // users that have two same fields but not three.
    twoMatches = twoMatches.filter(user => !threeMatches.map(u => u.id).includes(user.id))
    // remove duplicates from two matches set.
    uniqueTwoMatchesSet = new Set(twoMatches.map(user => JSON.stringify(user)))
    twoMatchesResult = Array.from(uniqueTwoMatchesSet).map(user => JSON.parse(user))
    // users that have only one same field.
    oneMatches = universityMatch.concat(departmentMatch).concat(titleMatch).filter(user => !threeMatches.map(u => u.id).includes(user.id) && !twoMatchesResult.map(us => us.id).includes(user.id))
    // merge all matches into one list.
    similarUserResults = threeMatches.concat(twoMatchesResult).concat(oneMatches)

    return similarUserResults
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
    fullnameStartsWith,
    lastNameStartsWith,
    fullnameContains,
    getSimilarUsersByFields,
}
