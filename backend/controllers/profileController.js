const { User, UserInterest, UserAffiliation, UserUp } = require('../model/db');
const { v1: uuidv1 } = require('uuid');
const userUtil = require('../util/userUtil');
const url = require('url');
const userUtils = require('../util/userUtil')
const fixUtf8 = require('fix-utf8')


addProfile = async function (req, res) {
    user_interests = req.body.researchAreas
    user_affiliation = req.body.affiliation

    try {
        user_interests.forEach( async interest => {
            await UserInterest.create({
                user_id: req.userId,
                interest
            })
        })
    
        await User.update(user_affiliation, {
            where: {
                id: req.userId
            }
        })
        
        res.status(200).send({message: "Successful"})
    } catch (error) {
        res.status(500).send(error)
    }    
}

updateProfile = async function (req, res) {
    user_interests = req.body.researchAreas
    user_affiliation = req.body.affiliation
    biography = req.body.biography
    update = {}
    
    try {
        if(user_interests){
            await UserInterest.destroy({
                where: {
                    user_id: req.userId
                }
            })
            user_interests.forEach( async interest => {
                await UserInterest.create({
                    user_id: req.userId,
                    interest
                })    
            })
        }
        if(user_affiliation || biography){
            if(user_affiliation) update = {...user_affiliation}
            if(biography) update.bio = biography
            await User.update( update, {
                where: {
                    id: req.userId
                }
            })
        } 
        res.status(200).send({message: "Successful"})
    } catch (error) {
        res.status(500).send(error.message)
    }

}

getProfile = async function (req, res) {

    try {
        user_profile = await User.findOne({
            where: {
                id: parseInt(req.params.userId)
            },
            attributes: 
                [
                    "id",
                    "name",
                    "surname",
                    "email",
                    "profile_picture_url",
                    "scholar_profile_url",
                    "university",
                    "isValidated",
                    "university",
                    "department",
                    "title",
                    "bio",
                    "citations",
                    "iIndex",
                    "hIndex",
                    "last5Year_citations",
                    "last5Year_iIndex",
                    "last5Year_hIndex",
                    "projects"
                ],
            include: [
                {
                    model: UserInterest,
                    attributes: ["interest"]
                }
            ]
        })

        if(user_profile == null) return res.status(404).send({error: "Not Found"})

        let [upCounts, isUpped, followerCount, followingCount, canFollow] = 
            await Promise.all([
                userUtil.getUpCounts(req.params.userId),
                userUtil.isUpped(req.userId, req.params.userId),
                userUtil.getFollowedCounts(req.params.userId),
                userUtil.getFollowingCounts(req.params.userId),
                userUtil.isFollowing(req.userId, req.params.userId)
            ])

        user_profile = {
            ...user_profile.dataValues,
            upCounts,
            isUpped,
            followerCount,
            followingCount,
            canFollow: !canFollow
        }
        res.status(200).send(user_profile)
    } catch (error) {
        res.status(500).send(error)
    }
}

changeBio = async function (req, res) {
    biography = {bio: req.body.bio}

    try {
        await User.update(biography, {
            where: {
                id: req.userId
            }
        })
        
        res.status(200).send({message: "Successful"})
    } catch (error) {
        res.status(500).send(error)
    }    
}

changeProfilePicture = async function (req, res) {
    if(!req.files) {
        res.status(400).send({
            status: false,
            message: 'No file uploaded'
        })
    } else {
        let avatar = req.files.avatar
        let filename = uuidv1() + "_" + avatar.name
        let path = './uploads/avatars/' + filename
        let vPath = "http://ec2-52-91-31-85.compute-1.amazonaws.com:3000/static/avatars/" + filename
        
        avatar.mv(path)

        await User.update({profile_picture_url: vPath}, {
            where: {
                id: req.userId
            }
        })

        res.status(200).send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: avatar.name,
                mimetype: avatar.mimetype,
                size: avatar.size,
                path: vPath
            }
        })
    }
}

addScholar = async function (req, res) {
    let gUrl = addhttp(req.body.url)
    if(url.parse(gUrl).hostname !== 'scholar.google.com'){
        res.status(400).send({message: "url is invalid"})
    }
    else {
        try {
            let username = require('url').parse(gUrl,true).query.user;
            let _citations = await userUtil.getCitations(username)
            let update = {}
            update.citations = _citations.total_citations
            update.scholar_profile_url = gUrl

            let last5Year_citations = Object.keys(_citations.citations_per_year).sort().reverse().slice(0,5);
            let total = last5Year_citations.reduce((a,b) => a+_citations.citations_per_year[b] , 0);
            
            update.last5Year_citations = total
            update.projects = fixUtf8(JSON.stringify(_citations.publications))
            await User.update(update, {
                where: {
                    id: req.userId
                }
            })
            res.status(200).send({message: "Successful", ..._citations, last_5_years_total: total})
        } catch (error) {
            res.status(500).send(error.message)
        }
    }
}

addUp = async function(req, res){
    upper_user_id = Number(req.userId)
    upped_user_id = req.body.userId

    try{
        userExistence = await userUtils.isUserExist(upped_user_id)
        if(!userExistence){
            return res.status(400).send({message: "User not found"})
        }

        upExistence = await userUtils.isUpped(upper_user_id, upped_user_id)
        if(upExistence){
            return res.status(400).send({message: "You already upped this user."})
        }

        upData = {
            upper_user_id,
            upped_user_id
        }

        upDb = await UserUp.create(upData)
        res.status(200).send({message: "Successful"})
    }
    catch(error){
        res.status(500).send({error: "Something is wrong"})
    }
}

removeUp = async function(req, res){
    upper_user_id = Number(req.userId)
    upped_user_id = req.body.userId
    try{
        userExistence = await userUtils.isUserExist(upped_user_id)
        if(!userExistence){
            return res.status(400).send({message: "User not found"})
        }

        upExistence = await userUtils.isUpped(upper_user_id, upped_user_id)
        if(!upExistence){
            return res.status(400).send({message: "You have not upped this user."})
        }

        upDb = await UserUp.destroy({
            where: {
                upper_user_id: upper_user_id,
                upped_user_id: upped_user_id
            }
        })
        res.status(200).send({message: "Successful"})
    }
    catch(error){
        res.status(500).send({error: "Something is wrong"})
    }
}

function addhttp(url) {
    if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
        url = "https://" + url;
    }
    return url;
}

module.exports = {
    addProfile,
    updateProfile,
    getProfile,
    changeBio,
    changeProfilePicture,
    addScholar,
    addUp,
    removeUp
}
