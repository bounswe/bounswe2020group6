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

        try {
            jwt.verify(accessToken, "top_secret_key", 
            (err, id) => {
                if(err){
                    return res.status(401).send()
                } 
                req.userId = id
                next()
            })
        }
        catch(e){
            console.log("catch " + e)
            return res.status(403).send()
        }
    }
}