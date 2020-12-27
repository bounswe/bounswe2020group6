const {ProjectTag, Project, User , ProjectCollaborator, ProjectFile, ProjectMilestone, UserInterest} = require("../model/db")
const { Op } = require("sequelize");
const userUtil = require("./userUtil");


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

var postsByTag = async function(tags){
    projects = await Project.findAll({
        where : {
            privacy : 1
        },
        attributes : ['id', 'title','description','summary'],
        include : [
            {
                model : ProjectTag,
                where : {  
                    tag : {
                        [Op.in] : tags
                    }
                },
                attributes : []
            },
            {
                model : User,
                attributes : ['id', 'name','surname','university','department']
            }
        ]
    });
    return projects
}


var postsByFollowings = async function(userId){
    followings = await userUtil.getFollowings(userId)
    userIds = followings.map(x => x.following.id)
    projects = await Project.findAll({
        where: {
            userId : {
                [Op.in] : userIds
            },
            privacy: 1
        },
        attributes: ['id', "title", "description", "summary"],
        include: {
            model : User,
            attributes : ['id', 'name','surname','university','department']
        }
    })

    projectsByCollaborators = await ProjectCollaborator.findAll({
        where: {
            user_id : {
                [Op.in] : userIds
            }
        },
        attributes: [],
        include: 
            [
                {
                    model: Project,
                    where: {
                        privacy: 1
                    },
                    attributes: ['id', 'title', 'description', 'summary'],
                    include: {
                        model : User,
                        attributes : ['id', 'name','surname','university','department']
                    }
                },
                
            ]
        
    })

    
    return projects.concat(projectsByCollaborators.map(x => x.project))

}

//followings' post, user's tags


var postsByUserTags = async function(userId){
    user_interests = await UserInterest.findAll({
	where: {
	    user_id : userId
	},
	attributes : ['interest']
    });
    interest_array = []
    for(var i in user_interests)
        interest_array.push(user_interests[i].interest);    	
    byTags = await postsByTag(interest_array)
    return byTags

}





module.exports = {
    postExists,
    tagExists,
    projectInfo,
    postsByFollowings,
    postsByUserTags,
}
