login = function(req, res){
    res.send("This will be at /boo/zoo");
}
signin = function(req,res) {
    res.send("This will be at /foo/zoo")
}

module.exports = {
    login,
    signin,
};