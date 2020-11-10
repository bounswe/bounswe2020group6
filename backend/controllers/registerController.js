const mailController = require("../util/mailController")
const db = require("../db")

register = function(req, res){
    res.send("This will be at /boo/zoo");
}

signup = function(req,res) {
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name
    const surname = req.body.surname
    db.con.query(`INSERT INTO USER values("53", "${email}" , "${name}", "${surname}")`, (err, rows) => {
        if(err) throw err;
        res.send("User created");
         mailController.sendValidationCode(email)

    })
}


module.exports = {
    register,
    signup,
};