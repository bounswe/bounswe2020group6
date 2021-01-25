const { User } = require("../model/db")
const { createJwt } = require("../util/authCheck")
const { hashPassword, compare } = require("../util/passwordUtil")


validate = async function(req, res) {
    code = req.body.code
    user = await User.findOne({
        where: {
            id: Number(req.userId)
        }
    })
    if(user != null && code == user.validation) {
        try {
            user.isValidated = true
            user.save()
            return res.status(200).send({message: "Validation is successful", token: createJwt(req.userId, true)})

        }
        catch(e) {
            return res.status(400).send({message: "Something went wrong"})

        }
    }
    else {
        return res.status(400).send({message: "Validation code is wrong"})
    }
}

passwordForgotten = async function(req, res) {
    if (!req.code) return res.status(401).send({message: "Invalid token, you need a token with code parameter!"})

    try {
        const userId = req.userId
        const newPassword = await hashPassword(req.body.password)

        let user = await User.findOne({
            where: {
                id: Number(userId)
            }
        })
        user.password = newPassword
        await user.save()

        res.status(200).send({message: "Password successfuly changed."})
    } catch (error) {
        res.status(500).send(error.message)
    }
    
}

passwordReset = async function(req, res) {

    try {
        const userId = req.userId
        const newPassword = await hashPassword(req.body.newPassword)

        let user = await User.findOne({
            where: {
                id: Number(userId)
            }
        })

        let isSame = await compare(req.body.oldPassword, user.password)
        if(!isSame) return res.status(403).send({message: "Old password is incorrect!"})

        user.password = newPassword
        await user.save()

        res.status(200).send({message: "Password successfuly changed."})
    } catch (error) {
        res.status(500).send(error.message)
    }
    
}

module.exports = {
    validate,
    passwordForgotten,
    passwordReset,
}