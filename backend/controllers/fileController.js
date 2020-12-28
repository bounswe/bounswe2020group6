const {storage, moveFile} = require('../util/uploadUtil')
const {ProjectFile} = require('../model/db')
var fs = require('fs'), async = require('async');
const path = require('path')
var multer  = require('multer')


upload = multer({storage : storage});

addFile = async function(req, res){
    projectId = req.body.projectId
    file = req.files
    try{
        for(var i = 0; i < file.length; i++){
            currentFile = file[i]
            oldPath = `./uploads/${currentFile.filename}`
            newPath = `./uploads/${projectId}`
            moveFile(currentFile.filename,oldPath, newPath)
            projectFile = await ProjectFile.create({project_id : projectId, file_name : currentFile.originalname, file_type : currentFile.mimetype})
        }
        res.status(201).send({message: "File is added", id: projectFile.id})
    }catch(error){
	    res.status(500).send({error: error})
    }
}



deleteFile = async function(req, res){
    filePath = `./uploads/${req.params.projectId}/${req.params.filename}`
    try {
        fs.unlinkSync(filePath)
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



deleteFolder = function(id) {
    folderPath = path.join(`./uploads`, id)
    if (fs.existsSync(folderPath)) {
	    fs.rmdirSync(folderPath, { recursive: true });
    }
    return
}



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
