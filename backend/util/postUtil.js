const {ProjectTag, Project, User , ProjectCollaborator, ProjectFile, ProjectMilestone} = require("../model/db")



const projectInfo = [
    {
        model : User,
        attributes : ['name','surname','profile_picture_url','university','department'],
	required : true
    },
    {	 
      	model: ProjectCollaborator,
	attributes : ['user_id'],
      	required: false,
	include : [ {
      	    model: User,
	    attributes : ['name','surname','profile_picture_url','university','department'],
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
	attributes: ['file_name'],
	required : false
    },
    {
        model: ProjectMilestone,
	required : false
    }
]



var postExists = async function(projectId){
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



var tagExists = async function(tag,projectId){
    tagDb = await ProjectTag.findOne({
        where : {
	    project_id  : projectId,
            tag : tag
	}
    });
    if(tagDb){
        return tagDb
    }
    return undefined
}





module.exports = {
    postExists,
    tagExists,
    projectInfo
}
