module.exports = {
    authCheckMiddleware: (req,res,next) => {
        if(!req.user){
            //res.redirect('/login')
            res.send('oopsie not logged in')
            next()
        }
        else{
            next()
        }
    }
}