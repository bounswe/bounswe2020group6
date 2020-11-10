const mailController = require("../util/mailController")


register = function(req, res){
    res.send("This will be at /boo/zoo");
}

signup = function(req,res) {
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    const surname = req.body.surname
    mailController.sendValidationCode(email)
    res.send(email + password + name + surname)
}

module.exports = {
    register,
    signup,
};