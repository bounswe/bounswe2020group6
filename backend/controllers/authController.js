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
            const token = jwt.sign({
                    username: loggingUser.username,
                    userId: loggingUser.id,
                    email: loggingUser.email,
                },
                "top_secret_key"
            )
            return res.send(200,{message: 'Success', accessToken: token})
        }
        return res.send(401,{message:"Wrong password"});
    }
    return res.send(404,{message:"User not found"});
}

signup = async function(req,res) {

    validationCode = mailController.createValidationCode()
    password= await hashPassword(req.body.password)
    userData = {
        email: req.body.email,
        password,
        name: req.body.name,
        surname: req.body.surname,
        validation: validationCode
    }
    try {
        userDb = await User.create(userData)
        mailController.sendValidationCode(userData.email, validationCode)
        console.log(userData)
        res.send(201,{"message": "User created", "id": userDb.id});
    } catch (error) {
        res.send(500, {"error": error})
        console.log(error)
    }
    
}

module.exports = {
    login,
    signup,
};