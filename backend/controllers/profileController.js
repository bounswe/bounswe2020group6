const { User, UserInterest, UserAffiliation } = require('../model/db');

addProfile = async function (req, res) {
    user_interests = req.body.researchAreas
    user_affiliation = req.body.affiliation

    try {
        user_interests.forEach( async interest => {
            await UserInterest.create({
                user_id: req.userId,
                interest
            })
            res.status(500).send(error)
        })
    
        await UserAffiliation.create({
            id: req.userId,
            ...user_affiliation
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
        console.log(req.userId)
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
            _userAffiliation = await UserAffiliation.findOne({ where:{id: req.userId} })
            Object.keys(_userAffiliation.dataValues).map(function(a){ if(user_affiliation[a]) _userAffiliation[a]=user_affiliation[a]})
            console.log(_userAffiliation)
            await _userAffiliation.save()
        } 
        res.status(200).send({message: "Successful"})
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

}

getProfile = async function (req, res) {

    try {
        user_profile = await User.findOne({
            where: {
                id: parseInt(req.query.id)
            },
            attributes: ["id","name","surname","email","profile_picture_url","scholar_profile_url","number_of_ups"],
            include: [
                {
                    model: UserInterest,
                    attributes: ["interest"]
                },
                {
                    model: UserAffiliation,
                    attributes: ["university","department","degree"]
                }
            ]
        }) 
        res.status(200).send(user_profile)
    } catch (error) {
        res.status(500).send(error)
    }
}

module.exports = {
    addProfile,
    updateProfile,
    getProfile
}