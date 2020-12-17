const mailController = require("../util/mailController")
const { hashPassword, compare } = require("../util/passwordUtil")
const { createJwt } = require("../util/authCheck")
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
            const isValidated = (loggingUser.isValidated == false) ? false : true
            const token = createJwt(loggingUser.id, isValidated)
            return res.status(200).send({message: "Success", accessToken: token, id: loggingUser.id})
        }
        return res.status(401).send({message: "Wrong password"})
    }
    return res.status(404).send({message: "User not found"})
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
        const token = createJwt(userDb.id, false)
        res.status(201).send({message: "User created", accessToken: token, id: userDb.id})
    } catch (error) {
        console.log(error.message)
        if(error.message.includes('Validation')){
            return res.status(400).send({error: "This mail address is already used"})
        }
        else {
            res.status(400).send({error: "Something went wrong."})
        }
    }
    
}

jwtValidation = async function(req, res) {
    token = req.body.token
    try {
        jwt.verify(token, "top_secret_key",
        (err, id) => {
            if(err){
                return res.status(400).send({message: "Token has expired"})
            }
            return res.status(200).send({message: "Token is valid", accessToken: token})
        })
    }
    catch(e){
        return res.status(400).send("Token is invalid.")
    }
}

module.exports = {
    login,
    signup,
    jwtValidation,
};