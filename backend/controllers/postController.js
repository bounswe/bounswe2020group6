const { Op } = require("sequelize");
const {moveFile} = require('../util/uploadUtil')  
const {deleteFolder} = require('./fileController')
const {Project, User, UserProject, ProjectTag, ProjectCollaborator, ProjectFile, ProjectMilestone} = require('../model/db')
const {tagExists,projectInfo} = require('../util/postUtil')


//Adds new posts to database also adds uploaded files to filesystem
addPost = async function(req,res) {
    postData = {
	userId : req.userId,
	title : req.body.title,
	summary : req.body.summary,
	description : req.body.description,
	privacy : req.body.privacy,
	status : req.body.status,
	requirements : req.body.requirements
    }
    //collaborators = obj.collaborators
    tags = req.body.tags
    file = req.files
    try {
	postDb = await Project.create(postData)
	userProject = await UserProject.create({ user_id : req.userId, project_id : postDb.id})
	for(var key in tags){
	    currentTag = tags[key]
	    projectTag = await ProjectTag.create({ project_id : postDb.id, tag : currentTag})
	}
	/*for(var key in collaborators){
	    currentCollaborator = collaborators[key]
	    projectCollaborator = await ProjectCollaborator.create({project_id : postDb.id, user_id : currentCollaborator})
	}*/
	if(file != undefined){
	    for(var i = 0; i < file.length; i++){
		currentFile = file[i]
		oldPath = `./uploads/${currentFile.filename}`
		newPath = `./uploads/${postDb.id}`
		moveFile(currentFile.filename, oldPath, newPath)
		projectFile = await ProjectFile.create({project_id : postDb.id, file_name : currentFile.originalname, file_type : currentFile.mimetype})
	    }
	}
	res.status(201).send({message: "Post is created", id: postDb.id})
    }catch (error){
	res.status(500).send({error: error})
	console.log(error)
    }
}


addTag = async function(req,res){
    tags = req.body.tags
    project_id = req.body.projectId
    tagsAddedBefore = []
    try{
        for(var tag of tags){
    	    var tagDb = await tagExists(tag, project_id)
    	    if(tagDb == undefined){
    		tagCreated = await ProjectTag.create({ project_id : project_id, tag : tag})
    	    }else{
    		tagsAddedBefore.push(tagDb.tag)
    	    }
        }
	res.status(201).send({message : "Available tags are added", tagsAddedBefore : tagsAddedBefore })
    }catch(error){
	res.status(500).send({error: error})
    }
}


deleteTag = async function(req,res){
    tags = req.query.tags
    id = req.query.projectId
    try{
	for(var key in tags){
	    currentTag = tags[key]
	    await ProjectTag.destroy({
		where : {
		    project_id : id,
		    tag : currentTag
		}
	    });
	}
	res.status(204).send({"message" : "Tags are deleted kankaa"})
    }catch(err){
	res.status(500).send({"error": err})
	console.log(err)
    }
}


addMilestone = async function(req,res){
    try{
	milestone = {
	    project_id : req.body.projectId,
	    date : req.body.date,
	    title : req.body.title,
	    description : req.body.description,
	    type : req.body.type
	}
	milestoneDb = await ProjectMilestone.create(milestone)
	res.status(201).send({message : "Milestone is added"})
	}catch(error){
	    res.status(500).send({"error": error})
	}
}


updateMilestone = async function(req,res){
    fieldsToUpdate = req.body
    try {
	await ProjectMilestone.update(fieldsToUpdate, {
	    where : {
	        id : req.params.id
	    }
	});
	res.status(200).send({message : "Milestone is updated"})
    }catch(error) {
	res.status(500).send({"error": error})
    }	
}


deleteMilestone = async function(req,res){
    try {
	await ProjectMilestone.destroy({
	    where : {
		id : req.params.id
	    }
	});
	res.status(204).send({message : "Milestone is deleted"})
    }catch(error) {
	res.status(500).send({error: error})
    }				 
}





//updates posts specifications with respect to post id
updatePost = async function (req,res){
    fieldsToUpdate = req.body
    try {
	await Project.update(fieldsToUpdate, {
	    where : {
	        id : req.params.id
	    }
	});
	res.status(200).send({message : "Post is updated"})
    }catch(error) {
	res.status(500).send({"error": error})
	console.log(error)
    }
}


//deletes posts with respect to their post id
deletePost = async function (req,res){
    try {
	await Project.destroy({
	    where : {
	        id : req.params.id
	    }
	});
	deleteFolder(req.params.id)
	res.status(204).send({message : "Post is deleted"})
    }catch(error) {
	res.status(500).send({error: error})
	console.log(error)
    }				 
}


//gathers posts from database according to parameters
//function can extend according to frontend wishes
getPosts = async function(req,res){
    user_id = req.userId
    type = req.params.type
    if(type == 0){
	userParameter = req.params.id
	try {
	    if(userParameter != user_id){
		posts = await Project.findAll({
		    where : {
			[Op.or] : [
			    {'$project_collaborators.user_id$' : {[Op.eq] : userParameter},
			    '$project.privacy$' : {[Op.eq] : 1}
			    },
			    {userId : userParameter,
			    [Op.or] : [
				{'$project_collaborators.user_id$' : {[Op.eq]: user_id}},
				{'$project.privacy$' : {[Op.eq]: 1}}
			    ]}
			]
		    },
		    include : projectInfo
		});
	    }else{
		posts = await Project.findAll({
		    where: {
			[Op.or] : [
			    {userId : user_id},
			    {'$project_collaborators.user_id$' : {[Op.eq] : user_id}}
			]
		    },
		    include : projectInfo
		});	
	    }
	    res.status(200).send(posts)
	}catch(error) {
	    res.status(500).send({error: error})
	    console.log(error)
	}
    }else{
	project_id = req.params.id
	try{
	    posts = await Project.findAll({
	        where: {
		    id : project_id
	        },
	        include : projectInfo
	    });	
	    res.status(200).send(posts)
	}catch(error){
	    res.status(500).send({error: error})
	}
    }
}


module.exports = {
    addPost,
    updatePost,
    deletePost,
    getPosts,
    addTag,
    deleteTag,
    addMilestone,
    updateMilestone,
    deleteMilestone
}
