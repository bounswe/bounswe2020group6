const {storage, moveFile} = require('../util/uploadUtil')
const {ProjectFile} = require('../model/db')
var fs = require('fs'), async = require('async');
const path = require('path')
var multer  = require('multer')


upload = multer({storage : storage});

addFile = async function(req, res){
    const obj = JSON.parse(JSON.stringify(req.body));
    projectId = obj.projectId
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



getFiles = async function(req,res){
    projectId = req.params.projectId
    var dirPath = `./uploads/${projectId}/`;
    files = []
    contentTypes = []
    fs.readdir(dirPath, function (err, filesPath) {
    	if (err) throw err;
    	filesPath = filesPath.map(function(filePath){
	    files.push(filePath)
            return dirPath + filePath;
    	});
	async.map(filesPath, function(filePath, cb){ 
            fs.readFile(filePath, 'utf8', cb);
    	}, async function(err, results) {
    	    for(file of files){
    		fileDb = await ProjectFile.findAll({
		    where : {
		        file_name : file,
		        project_id : projectId
		    },
		    attributes : ['file_type'],
		    raw : true
		});
		contentTypes.push(fileDb[0].file_type)
    	    }
            res.setHeader('Content-Type', contentTypes)
            res.setHeader('Content-Name', files)
	    res.status(201).send(results)
    	});
    });
}





module.exports = {
    addFile,
    deleteFile,
    deleteFolder,
    getFiles,
    upload
}
