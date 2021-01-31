const {moveFile} = require('../util/uploadUtil')  
const {deleteFolder} = require('./fileController')
const {Project, ProjectTag, ProjectFile, ProjectMilestone, ProjectElastic} = require('../model/db')
const postUtil = require("../util/postUtil")
const { Op } = require("sequelize");
const elasticUtil = require("../elastic/elasticUtil")


/*
* this function adds a post(project) to database
* @param req : request
* @param res : response
*/
addPost = async function(req,res) {
    //post info
    postData = {
		userId : req.userId,
		title : req.body.title,
		summary : req.body.summary,
		description : req.body.description,
		privacy : req.body.privacy,
		status : req.body.status,
		requirements : req.body.requirements
    }
    tags = req.body.tags
    file = req.files
    try {
		postDb = await Project.create(postData)
		//adds tags of projects into database
		for(var key in tags){
			currentTag = tags[key]
			projectTag = await ProjectTag.create({ project_id : postDb.id, tag : currentTag})
		}
		//checks if file is uploaded with project
		if(file != undefined){
			for(var i = 0; i < file.length; i++){
			currentFile = file[i]
			oldPath = `./uploads/${currentFile.filename}`
			newPath = `./uploads/${postDb.id}`
			moveFile(currentFile.filename, oldPath, newPath)
			projectFile = await ProjectFile.create({project_id : postDb.id, file_name : currentFile.originalname, file_type : currentFile.mimetype})
			}
		}
		try{
			//adds post to elastic
			elastic = await elasticUtil.addPost(postDb)
			console.log(elastic)
		}
		finally{
			res.status(201).send({message: "Post is created", id: postDb.id})
		}
		
    }catch (error){
		res.status(500).send({error: error})
		console.log(error)
    }
}



/*
* this function adds project tags to database
* @param req : request
* @param res : response
*/
addTag = async function(req,res){
    tags = req.body.tags
    project_id = req.body.projectId
    tagsAddedBefore = []
    try{
        for(var tag of tags){
    	    var tagDb = await postUtil.tagExists(tag, project_id)		//checks if tag is added before
    	    if(tagDb == undefined){
    		tagCreated = await ProjectTag.create({ project_id : project_id, tag : tag})		//if not added before adds them
    	    }else{
    		tagsAddedBefore.push(tagDb.tag)
    	    }
        }
	res.status(201).send({message : "Available tags are added", tagsAddedBefore : tagsAddedBefore })
    }catch(error){
	res.status(500).send({error: error})
    }
}


/*
* this function deletes project tags from database
* @param req : request
* @param res : response
*/
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



/*
* this function adds project milestones into database
* @param req : request
* @param res : response
*/
addMilestone = async function(req,res){
    try{
    //milestone info
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


/*
* this function is for updating project milestones
* @param req : request
* @param res : response
*/
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


/*
* this function deletes project milestone from database
* @param req : request
* @param res : response
*/
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



/*
* this function is for updating project informations.
* @param req : request
* @param res : response
*/
updatePost = async function (req,res){
    fieldsToUpdate = req.body
    try {
	await Project.update(fieldsToUpdate, {
	    where : {
	        id : req.params.id
		},
		returning: true
	});
	postToUpdate = await Project.findOne({
		where: {
			id: req.params.id
		}
	})
	try{
		elasticUtil.updatePost(postToUpdate)			//also it updates project information in elastic
	}
	finally {
		res.status(200).send({message : "Post is updated"})

	}
    }catch(error) {
	res.status(500).send({"error": error})
	console.log(error)
    }
}


/*
* this function deletes post from database
* @param req : request
* @param res : response
*/
deletePost = async function (req,res){
    try {
	await Project.destroy({
	    where : {
	        id : req.params.id
	    }
	});
	deleteFolder(req.params.id)
	try{
		elasticUtil.deletePost(req.params.id)			//it also deletes it from elastic
	}
	finally {
		res.status(204).send({message : "Post is deleted"})
	}
    }catch(error) {
	res.status(500).send({error: error})
	console.log(error)
    }				 
}


/*
* this function gets specific posts from database with given parameters
* @param req : request
* @param res : response
*/
getPosts = async function(req,res){
    user_id = req.userId								//id of user who is making get posts request
    type = req.params.type								//type of search in database
    if(type == 0){										//if type is 0, its get request with user id
	userParameter = req.params.id
	try {
	    if(userParameter != user_id){					//if user who is making this get request is not same with userParameter, only public projects are returned
		posts = await Project.findAll({				
		    where : {
			[Op.or] : [
			    {'$project_collaborators.user_id$' : {[Op.eq] : userParameter},
			    [Op.or] : [
			        {'$project.userId$' : {[Op.eq] : user_id}},
				{'$project.privacy$' : {[Op.eq] : true}}
			    ]},
			    {userId : userParameter,
			    [Op.or] : [
				{'$project_collaborators.user_id$' : {[Op.eq]: user_id}},
				{'$project.privacy$' : {[Op.eq]: true}}
			    ]}
			]
		    },
		    include : postUtil.projectInfo
		});
	    }else{										 	//if it's same with userParameter, that means user want to see his/her own projects. All projects are returned
		posts = await Project.findAll({
		    where: {
			[Op.or] : [
			    {userId : user_id},
			    {'$project_collaborators.user_id$' : {[Op.eq] : user_id}}
			]
		    },
		    include : postUtil.projectInfo
		});	
	    }
	    res.status(200).send(posts)
	}catch(error) {
	    res.status(500).send({error: error})
	    console.log(error)
	}
    }else{
	project_id = req.params.id									// if type is 1,it's get request with project id. So it's getting a project from database with given project id
	try{
	    posts = await Project.findAll({
	        where: {
		    id : project_id
	        },
	        include : postUtil.projectInfo
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
