const multer = require('multer')
const fs = require('fs');

//set uploaded file destination and file name
const storage = multer.diskStorage({
    destination: './uploads/',
    filename: function(req, file, cb){
	cb(null, file.originalname);
    }
});

/*
* this function moves file from old path to new path
* @param fileName : name of file
* @param oldPath : current directory of file
* @param newPath : file will be moved to this directory
*/
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
