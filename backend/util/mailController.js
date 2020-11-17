const nodemailer = require("nodemailer")

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "academise.help@gmail.com",
        pass: "Academise_1"
    }
})

var createValidationCode = function() {
    return Math.floor(Math.random() * (1000000 - 0)).toString().padStart(6,"0")
}

var sendValidationCode = function(email, code) {
    var mailOptions = {
        from: "Akademise Registration",
        to: email,
        subject: "Akademise - Validation Code",
        text: code
    }
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        }
        else {
            console.log('email sent: ' + info.response)
        }
    })
}

module.exports = {
    sendValidationCode,
    createValidationCode,
}