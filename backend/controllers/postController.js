const {Project, UserProject, ProjectTag, ProjectCollaborator, ProjectFile} = require('../model/db')
const {tokenDecoder} = require('../util/tokenDecoder')
const multer = require('multer')
const path = require('path');
const storage = multer.diskStorage({
	destination: './uploads/',
	filename: function(req, file, cb){
		cb(null, file.originalname);
  }
});

var upload = multer({storage : storage});

addPost = async function(req,res) {
	const obj = JSON.parse(JSON.stringify(req.body));
	//req.userId = 4;
	postData = {
		userId : req.userId,
		topic : obj.topic,
		abstract : obj.abstract,
		privacy : obj.privacy,
		status : obj.status,
		publicationType : obj.publicationType,
		deadline : obj.deadline,
		requirements : obj.requirements
	}
	collaborators = obj.collaborators
	tags = obj.tags
	file = req.files
	try {
		postDb = await Project.create(postData)
		userProject = await UserProject.create({ user_id : req.userId, project_id : postDb.id, is_finished : 0 })
		for(var key in tags){
			currentTag = tags[key]
			projectTag = await ProjectTag.create({ project_id : userProject.project_id, tag : currentTag})
		}
		for(var key in collaborators){
			currentCollaborator = collaborators[key]
			projectCollaborator = await ProjectCollaborator.create({project_id : userProject.project_id, collaborator_id : currentCollaborator})
		}
		if(file != undefined){
			for(var i = 0; i < file.length; i++){
				currentFile = file[i]
				projectFile = await ProjectFile.create({project_id : userProject.project_id, file_name : currentFile.originalname, file_path : currentFile.path})
			}
		}
		res.send(201,{"message" : "Post is created", "id" : postDb.id})
	}catch (error){
		res.send(500,{"error": error})
		console.log(error)
	}
}

updatePost = async function (req,res){
	postData = {
		topic : req.body.topic,
		abstract : req.body.abstract,
		privacy : req.body.privacy,
		status : req.body.status,
		publicationType : req.body.publicationType,
		deadline : req.body.deadline,
		requirements : req.body.requirements
	}
	try {
		await Project.update(postData, {
		where : {
			id : req.body.id
			}
		});
		res.send(201,{"message" : "Post is updated"})		
	}catch(error) {
		res.send(500,{"error": error})
		console.log(error)
	}
}

deletePost = async function (req,res){
	try {
		await Project.destroy({
			where : {
				id : req.body.id
			}
		});
		res.send(201,{"message" : "Post is deleted"})
	}catch(error) {
		res.send(500,{"error": error})
		console.log(error)
	}				 
}

getPosts = async function(req,res){
	try {
		userId = req.body.userId
		if(userId == null){
			posts = await Project.findAll({
				where : {
					privacy : 1
				},
				include : [
    				{	 
      				model: ProjectCollaborator, 
      				required: false,
      				},
      				{
      				model: ProjectTag,
      				required: false,
      				},
  				]
			});
		}else{
			posts = await Project.findAll({
				where: {
					userId: userId
				},
				include : [
    				{	 
      				model: ProjectCollaborator, 
      				required: false,
      				},
      				{
      				model: ProjectTag,
      				required: false,
      				},
  				]
			});		
		}
		res.send(201,posts)
	}catch(error) {
		res.send(500,{"error": error})
		console.log(error)
	}
}


module.exports = {
	addPost,
	updatePost,
	deletePost,
	getPosts,
	upload
}
