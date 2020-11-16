const { User } = require("../model/db")

validate = async function(req, res) {
    code = req.body.code
    user = await User.findOne({
        where: {
            id: Number(req.userId)
        }
    })
    if(user != null && code == user.validation) {
        try {
            user.isValidated = true
            user.save()
            return res.status(200).send({message: "Validation is successful"})

        }
        catch(e) {
            return res.status(400).send({message: "Something went wrong"})

        }
    }
    else {
        return res.status(400).send({message: "Validation code is wrong"})
    }
}

module.exports = {
    validate
}