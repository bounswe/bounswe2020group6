const multer = require('multer')
const fs = require('fs');

const storage = multer.diskStorage({
	destination: './uploads/',
	filename: function(req, file, cb){
		cb(null, file.originalname);
  }
});

var moveFile = function(fileName,oldPath,newPath) { 
	if (!fs.existsSync(newPath)) {
		fs.mkdirSync(newPath);
	}
	newPath = `${newPath}/${fileName}`
	fs.rename(oldPath, newPath, function (err) {
  	if (err) throw err
 		console.log('Successfully moved')
	})
}


module.exports = {
    storage,
    moveFile
}

