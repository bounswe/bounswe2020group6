const  bcrypt = require('bcrypt');

/*
* hashes the given password
*/
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    
    return hash
}

/*
* compares an unhashed password with hashed password, returns true if they are the same,
* false if they are not the same
*/
async function compare(password, hpassword){ 
    return await bcrypt.compare(password, hpassword) 
}

module.exports = {hashPassword, compare}
