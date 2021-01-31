const nodemailer = require("nodemailer")
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')

// this is for creating a transporter given credentials for our help account.
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: "academise.help@gmail.com",
        pass: "Academise_1"
    }
})

// create a random 6-digit validation code
var createValidationCode = function() {
    return Math.floor(Math.random() * (1000000 - 0)).toString().padStart(6,"0")
}

// send the validation code with the given email template.
var sendValidationCode = function(purpose, email, code) {

    const filePath = path.join(__dirname, './email.html'); // email template
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const isSignup = purpose  // flag indicating what kind of template 
    const replacements = {
        isSignup,
        code,
        email,
    };
    const htmlToSend = template(replacements); // mail body

    var mailOptions = { // mail options
        from: "Akademise Registration",
        to: email,
        subject: isSignup ? "Akademise - Validation Code" : "Akademise - Password Recovery Code",
        html: htmlToSend
    }

    // send the email.
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