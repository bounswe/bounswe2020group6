const {ProjectTag, Project, User , ProjectCollaborator, ProjectFile, ProjectMilestone, UserInterest} = require("../model/db")
const { Op } = require("sequelize");
const userUtil = require("./userUtil");


//constant projectInfo is all information about project. Its owner,collaborators,tags,milestones etc.
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
	required : false,
        separate : true,
        order: [['date', 'asc']]
    }
]


/*
* this function checks if certain post exists in database. If exists it returns true else false
* @param projectId : id of project
*/
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


/*
* this function checks if certain tag is defined with project.
* @param projectId : id of project
* @param projectId : project tag
*/
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


/*
* this function finds all projects which has tags as project tags in database, except projects thats owner is userId 
* @param tags : project tags
* @param userId : user id
*/
var postsByTag = async function(tags,userId){
    projects = await Project.findAll({
        where : {
            privacy : true,
	    [Op.not] : [{userId : userId}]
        },
        attributes : ['id', 'title','description','summary', 'status', 'createdAt'],
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
                attributes : ['id', 'name','surname','university','department', 'profile_picture_url']
            },
	        {
    	        model: ProjectCollaborator,
    	        where : {
    		    [Op.not] : [{user_id : userId}]
    	        },
    	        required : false
    	    }
        ]
    });

    const array = projects
    const resultObjects = [];
    const resultIDs = [];
    const map = new Map();
    //puts project ids and projects into array
    for (const item of array) {
        if(!map.has(item.id)){
            map.set(item.id, true);
            resultObjects.push(item);
            resultIDs.push(item.id);
        }
    }

    return {posts: resultObjects, ids: resultIDs}
}


/*
* this function finds all projects of users that userId follows and all projects of users who is collaborating with userId and returns all of them
* @param userId : id of user
*/
var postsByFollowings = async function(userId){
    followings = await userUtil.getFollowings(userId)
    userIds = followings.map(x => x.following.id)
    projects = await Project.findAll({
        where: {
            userId : {
                [Op.in] : userIds
            },
            privacy: true
        },
        attributes: ['id', "title", "summary", "description", 'status', 'createdAt'],
        include: {
            model : User,
            attributes : ['id', 'name','surname','university','department', 'profile_picture_url']
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
                        privacy: true
                    },
                    attributes: ['id', 'title', 'summary', "description", 'status', 'createdAt'],
                    include: {
                        model : User,
                        attributes : ['id', 'name','surname','university','department', 'profile_picture_url']
                    }
                },
            ]
    })

    const array = projects.concat(projectsByCollaborators.map(x => x.project))
    const resultObjects = [];
    const resultIDs = [];
    const map = new Map();
    //puts posts and post ids into array 
    for (const item of array) {
        if(!map.has(item.id)){
            map.set(item.id, true);
            resultObjects.push(item);
            resultIDs.push(item.id);
        }
    }

    return {posts: resultObjects, ids: resultIDs}

}

/*
* this function finds all projects that have tags which user is interested in and returns them
* @param userId : id of user
*/
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
    byTags = await postsByTag(interest_array,userId)
    return byTags
}

module.exports = {
    postExists,
    tagExists,
    projectInfo,
    postsByFollowings,
    postsByUserTags,
}
