const  bcrypt = require('bcrypt');

async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    
    return hash
}

async function compare(password, hpassword){ 
    return await bcrypt.compare(password, hpassword) 
}

module.exports = {hashPassword, compare}