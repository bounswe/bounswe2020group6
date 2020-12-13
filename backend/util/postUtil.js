const {ProjectTag, Project} = require("../model/db")



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
   tagExists
}
