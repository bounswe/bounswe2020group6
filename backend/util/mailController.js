const nodemailer = require("nodemailer")

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "academise.help@gmail.com",
        pass: "Academise_1"
    }
})

var mailOptions = {
    from: "academise.help@gmail.com",
    to: "isiktashamza@gmail.com",
    subject: "Academise - Validation Code",
    text: "123"
}

var sendValidationCode = function(email) {
    mailOptions.to = email
    mailOptions.text = "123123"
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
    sendValidationCode
}