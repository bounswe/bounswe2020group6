const { Op } = require("sequelize");
const {Project, User, UserProject, ProjectTag, ProjectCollaborator, ProjectFile} = require('../model/db')
const multer = require('multer')
const path = require('path');
//modifies storage path and file name
const storage = multer.diskStorage({
	destination: './uploads/',
	filename: function(req, file, cb){
		cb(null, file.originalname);
  }
});

var upload = multer({storage : storage});

//Adds new posts to database also adds uploaded files to filesystem
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
			projectCollaborator = await ProjectCollaborator.create({project_id : userProject.project_id, user_id : currentCollaborator})
		}
		if(file != undefined){
			for(var i = 0; i < file.length; i++){
				currentFile = file[i]
				projectFile = await ProjectFile.create({project_id : userProject.project_id, file_name : currentFile.originalname, file_path : currentFile.path})
			}
		}
		res.status(201).send({message: "Post is created", id: postDb.id})
	}catch (error){
		res.status(500).send({error: error})
		console.log(error)
	}
}

//updates posts specifications with respect to post id
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

//deletes posts with respect to their post id
deletePost = async function (req,res){
	try {
		await Project.destroy({
			where : {
				id : req.body.id
			}
		});
		res.status(201).send({message: "Post is deleted"})
	}catch(error) {
		res.status(500).send({error: error})
		console.log(error)
	}				 
}

//gathers posts from database according to parameters
//function can extend according to frontend wishes
getPosts = async function(req,res){
	user_id = req.userId
	userParameter = req.param('userId')
	try {
		if(userParameter != userId){
			posts = await Project.findAll({
				where : {
					userId : userParameter,
					[Op.or] : [
						{'$project_collaborators.user_id$' : {[Op.eq]: user_id}},
						{'$project.privacy' : {[Op.eq]: 1}}
					]
				},
				include : [
    				{	 
      				model: ProjectCollaborator,
				attributes : ['user_id'],
      				required: false,
				include : [ {
      					model: User,
					attributes : ['name','surname'],
      					required: false,
      				}]
      				},
      				{
      				model: ProjectTag,
				attributes : ['tag'],
      				required: false,
      				},
  				]
			});
		}else{
			posts = await Project.findAll({
				where: {
					userId: user_id
				},
				include : [
    				{	 
      				model: ProjectCollaborator,
				attributes : ['user_id'],
      				required: false,
      				include : [ {
      					model: User,
					attributes : ['name','surname'],
      					required: false,
      				}]
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
