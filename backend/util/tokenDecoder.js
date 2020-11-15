const atob = require('atob');

//decodes given token
function tokenDecoder(req) {
	const authHeader = req.headers['authorization']
	const token = authHeader.split(' ')[1]
	const decodedToken = atob(token.split('.')[1])
	return JSON.parse(decodedToken)
}

module.exports = {tokenDecoder}
