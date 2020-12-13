const {ProjectTag, Project, User , ProjectCollaborator, ProjectTag, ProjectFile} = require("../model/db")



const projectInfo = [
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



var postExists = async function(projectId){
    console.log("eyvah")
    postDb = await Project.findOne({
        where : {
	    id  : projectId
	}
    });
    if(postDb){
	return true
    }
    return false
}



var tagExists = async function(tags,projectId){
    for(tag of tags){
	tagDb = await ProjectTag.findOne({
	    where : {
		project_id  : projectId,
		tag : tag
	    }
	});
	if(tagDb){
	    return tagDb
	}
    }
    return undefined
}





module.exports = {
    postExists,
    tagExists,
    projectInfo
}
