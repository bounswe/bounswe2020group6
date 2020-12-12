const { User, UserInterest, UserAffiliation } = require('../model/db');
const { v1: uuidv1 } = require('uuid');
const { getCitations } = require('../util/userUtil');
const url = require('url');

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
        if(user_affiliation){
            await User.update(user_affiliation, {
                where: {
                    id: req.userId
                }
            })
        } 
        res.status(200).send({message: "Successful"})
    } catch (error) {
        res.status(500).send(error)
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
                    "last5Year_hIndex"
                ],
            include: [
                {
                    model: UserInterest,
                    attributes: ["interest"]
                }
            ]
        })
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
        let vPath = "/static/avatars/" + filename
        
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
            let citations = await getCitations(gUrl)
            citations.scholar_profile_url = gUrl
            await User.update(citations, {
                where: {
                    id: req.userId
                }
            })
            res.status(200).send({message: "Successful"})
        } catch (error) {
            res.status(500).send(error)
        }
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
    addScholar
}