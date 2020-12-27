const {ProjectTag, Project, User , ProjectCollaborator, ProjectFile, ProjectMilestone, UserInterest} = require("../model/db")
const { Op } = require("sequelize");


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


var homepagePosts = async function(userId){
    user_interests = await UserInterest.findAll({
	where: {
	    user_id : userId
	},
	attributes : ['interest']
    });
    interest_array = []
    for(var i in user_interests)
        interest_array.push(user_interests[i].interest);    	
    projects = await Project.findAll({
	where : {
	    privacy : 1
	},
	attributes : ['title','description','summary'],
	include : [
	    {
		model : ProjectTag,
		where : {  
		    tag : {
			[Op.in] : interest_array
		    }
		},
		attributes : ['tag']
	    }
	]
    });
    return projects	
}





module.exports = {
    postExists,
    tagExists,
    projectInfo,
    homepagePosts
}
