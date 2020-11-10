login = function(req, res){
    res.send("This will be at /boo/zoo");
}
signin = function(req,res) {
    const email = req.body.email
    const password = req.body.password
    res.send(email + password)
}

module.exports = {
    login,
    signin,
};