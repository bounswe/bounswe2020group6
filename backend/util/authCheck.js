const jwt = require('jsonwebtoken')

module.exports = {
    authCheckMiddleware: (req,res,next) => {
        const bearerHeader = req.headers['authorization']
        if(!bearerHeader){
            return res.status(403).send()
        }

        const bearer = bearerHeader.split(' ')
        const accessToken = bearer[1]

        if(accessToken == null){
            return res.status(403).send()
        }

        jwt.verify(accessToken, process.env.TOKEN_SECRET, 
        (err, json) => {
            if(err){
                return res.status(403).send(err.message)
            }
            req.userId = json.id
            req.isValidated = json.isValidated
            if(json.code) req.code = true
            next()
        })
        
    },

    validationCheckMiddleware: (req,res,next) => {
        if(!req.isValidated) {
            return res.status(403).send({message: "User is not validated"})
        }
        else next()
    },

    createJwt: (id, ifValidated) => {
        return jwt.sign({id: id, isValidated: ifValidated}, process.env.TOKEN_SECRET)
    },

    createJwtWithCode: (id, ifValidated) => {
        return jwt.sign({id: id, isValidated: ifValidated, code: true}, process.env.TOKEN_SECRET)
    },
}