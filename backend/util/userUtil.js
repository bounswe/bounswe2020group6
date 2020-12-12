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

var getCitations = async function(url) {
    const response = await got(url);
    const $ = cheerio.load(response.body);
  
    a = $('td.gsc_rsb_std')
  
    var array = []
  
    Object.keys(a).filter(key => !isNaN(parseInt(key))).map( key => array.push(a[key].firstChild.data));
  
    const citations = {
        citations: array[0],
        hIndex: array[2],
        iIndex: array[4],
        last5Year_citations: array[1],
        last5Year_hIndex: array[3],
        last5Year_iIndex: array[5],
    }
  
    return citations
}

module.exports = {
    isUserExist,
    isFollowing,
    getCitations,
    isUpped,
    getUpCounts
}