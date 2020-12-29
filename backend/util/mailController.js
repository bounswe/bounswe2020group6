const nodemailer = require("nodemailer")
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')

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

    const filePath = path.join(__dirname, './email.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
        code,
        email
    };
    const htmlToSend = template(replacements);

    var mailOptions = {
        from: "Akademise Registration",
        to: email,
        subject: "Akademise - Validation Code",
        html: htmlToSend
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