const mailController = require("../util/mailController")
const { hashPassword, compare } = require("../util/passwordUtil")
const jwt = require('jsonwebtoken')
const { User } = require("../model/db")

login = async function(req, res){
    loggingUser = await User.findOne({
        where: {
            email: req.body.email
        }
    })
    if(loggingUser != null){
        let isSame = await compare(req.body.password, loggingUser.password)
        if(isSame){
            const token = createJwt(loggingUser.id)
            return res.status(200).send({message: "Success", accessToken: token})
        }
        return res.status(401).send({message: "Wrong password"})
    }
    return res.status(404).send({message: "User not found"})
}

createJwt = function(id) {
    return jwt.sign(id,"top_secret_key")
}

signup = async function(req,res) {

    validationCode = mailController.createValidationCode()
    password= await hashPassword(req.body.password)
    userData = {
        email: req.body.email,
        password,
        name: req.body.name,
        surname: req.body.surname,
        validation: validationCode,
        isValidated: false
    }
    try {
        userDb = await User.create(userData)
        mailController.sendValidationCode(userData.email, validationCode)
        console.log(userData)
        const token = createJwt(userDb.id)
        res.status(201).send({message: "User created", accessToken: token})
    } catch (error) {
        res.status(500).send({error: "Something went wrong."})
        console.log(error)
    }
    
}

module.exports = {
    login,
    signup,
};