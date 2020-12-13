const { Op } = require("sequelize");
const {moveFile} = require('../util/uploadUtil')  
const {deleteFolder} = require('./fileController')
const {Project, User, UserProject, ProjectTag, ProjectCollaborator, ProjectFile} = require('../model/db')
const {tagExists} = require('../util/postUtil')


//Adds new posts to database also adds uploaded files to filesystem
addPost = async function(req,res) {
    const obj = JSON.parse(JSON.stringify(req.body));
    postData = {
	userId : req.userId,
	title : obj.title,
	summary : obj.summary,
	description : obj.description,
	privacy : obj.privacy,
	status : obj.status,
	requirements : obj.requirements
    }
    //collaborators = obj.collaborators
    tags = obj.tags
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
    var tagDb = await tagExists(tags, project_id)
    if(tagDb == undefined){
	try{
	    for(var key in tags){
		currentTag = tags[key]
		tag = await ProjectTag.create({ project_id : project_id, tag : currentTag})
	    }
	    res.status(201).send({message : "Tags are added"})
	}catch(err){
	    res.status(500).send({error: err})
	}
    }else{
	res.status(500).send({message : "You've already added this tag", tag : tagDb })
    }
}


deleteTag = async function(req,res){
    tags = req.query.tag
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
	res.status(201).send({"message" : "Tags are deleted kankaa"})
    }catch(err){
	res.status(500).send({"error": err})
	console.log(err)
    }
}


//updates posts specifications with respect to post id
updatePost = async function (req,res){
    var fieldsToUpdate = {};
    for(var field of Object.keys(req.body)){
	fieldsToUpdate[field] = req.body[field]
    }	
    try {
	await Project.update(fieldsToUpdate, {
	    where : {
	        id : req.params.id
	    }
	});
	res.status(201).send({message : "Post is updated"})
    }catch(error) {
	res.status(500).send({"error": error})
	console.log(error)
    }
}


//deletes posts with respect to their post id
deletePost = async function (req,res,next){
    try {
	await Project.destroy({
	    where : {
	        id : req.params.id
	    }
	});
	deleteFolder(req.params.id)
	res.status(201).send({message : "Post is deleted"})
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
		    include : [
			{
			    model : User,
			    attributes : ['name','surname'],
			    required : true
			},
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
			{
			    model: ProjectFile,
			    attributes: ['file_name','file_path'],
			    required : false
			}
  		    ]
		});
	    }else{
		posts = await Project.findAll({
		    where: {
			[Op.or] : [
			    {userId : user_id},
			    {'$project_collaborators.user_id$' : {[Op.eq] : user_id}}
			]
		    },
		    include : [
			{
			    model : User,
			    attributes : ['name','surname'],
			    required : true
			},
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
			{
			    model: ProjectFile,
			    attributes: ['file_name','file_path'],
			    required : false
			}
  		    ]
		});	
	    }
	    res.status(201).send(posts)
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
		include : [
		    {
			model : User,
			attributes : ['name','surname'],
			required : true
		    },
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
		    {
			model: ProjectFile,
			attributes: ['file_name','file_path'],
			required : false
		    }
  		]
	    });	
	    res.status(201).send(posts)
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
    deleteTag
}
