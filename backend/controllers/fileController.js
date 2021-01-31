const {storage, moveFile} = require('../util/uploadUtil')
const {ProjectFile} = require('../model/db')
var fs = require('fs'), async = require('async');
const path = require('path')
var multer  = require('multer')


upload = multer({storage : storage});			//multer variable


/*
* this function adds file to file system
* @param req : request
* @param res : response
*/
addFile = async function(req, res){
    projectId = req.body.projectId
    file = req.files
    try{
        for(var i = 0; i < file.length; i++){
            currentFile = file[i]
            oldPath = `./uploads/${currentFile.filename}`
            newPath = `./uploads/${projectId}`
            moveFile(currentFile.filename,oldPath, newPath)		//calls moveFile to move file from current directory to specific directory
            //creates a record in database about file
            projectFile = await ProjectFile.create({project_id : projectId, file_name : currentFile.originalname, file_type : currentFile.mimetype})
        }
        res.status(201).send({message: "File is added", id: projectFile.id})
    }catch(error){
	    res.status(500).send({error: error})
    }
}


/*
* this function deletes a file from file system
* @param req : request
* @param res : response
*/
deleteFile = async function(req, res){
    filePath = `./uploads/${req.params.projectId}/${req.params.filename}`			//path of file that being deleted
    try {
        fs.unlinkSync(filePath)
        //delete file record from database
        await ProjectFile.destroy({
            where : {
            project_id : req.params.projectId,
            file_name : req.params.filename
            }
        });
        res.status(201).send({message: "File is deleted"})
    }catch(err) {
	    res.status(500).send({error: error})
    }
}


/*
* this function is for deleting folder of project if there is no project file anymore
* @param req : request
* @param res : response
*/
deleteFolder = function(id) {
    folderPath = path.join(`./uploads`, id)
    if (fs.existsSync(folderPath)) {
	    fs.rmdirSync(folderPath, { recursive: true });
    }
    return
}



/*
* this function gets certain file from database sends response
* @param req : request
* @param res : response
*/
getFile = async function(req,res){
    projectId = req.params.projectId
    fileName = req.params.fileName
    res.sendFile(path.join(__dirname, '../uploads', projectId, fileName));
}






module.exports = {
    addFile,
    deleteFile,
    deleteFolder,
    getFile,
    upload
}
