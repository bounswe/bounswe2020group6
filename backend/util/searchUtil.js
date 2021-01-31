const { Project, Event, ProjectTag, EventTag } = require("../model/db")
const {Op} = require('sequelize')
const userUtils = require('../util/userUtil')
const elasticUtil = require("../elastic/elasticUtil")


// return a list of user based on given query.
var userSearch = async function(query){
    let [fullnameStarts, lastNameStarts, contains] = 
                await Promise.all([
                    userUtils.fullnameStartsWith(query), // get users whose full name starts with the given query.
                    userUtils.lastNameStartsWith(query), // get users whose last name starts with the given query.
                    userUtils.fullnameContains(query), // get users whose full name contains the given query. 

                ])
            allUsers = fullnameStarts.concat(lastNameStarts).concat(contains) // concatenate all returned users.
            // remove duplicates from user list.
            uniqueSet = new Set(allUsers.map(user => JSON.stringify(user)))
            nameMatchResults = Array.from(uniqueSet).map(user => JSON.parse(user))

            if(nameMatchResults.length == 0){ // empty check
                return {message: "There are not any matches"}
            }
            else { // get users similar to the user who is the best match for the given query
                similarityResults = await userUtils.getSimilarUsersByFields(nameMatchResults[0].id)
                return {nameMatchedResults: nameMatchResults, sharingSimilaritiesResults: similarityResults}
            }
}

// return a list of projects based on given query.
var projectSearch = async function(query, requestingUserId, tags){
    elastic = [] // holds elastic search results
    normalSearch = [] // holds non-elastic search results
    isElasticFetched = false // error flag for elastic search
    isNormalFetched = false // error flag for non-elastic search
    try {
        elasticRes =  await elasticUtil.searchPost(query) // get elastic search results
        // filter elastic search results based on privacy. 
        elasticRes = elasticRes.filter(t => t.privacy == true || (t.privacy == false && t.userId == requestingUserId))
        elastic = elastic.concat(elasticRes)
        isElasticFetched = true
    }
    catch(err){
        console.log(err)
    }
    
    try {
        normalSearchRes = await nonSemanticProjectSearch(query, requestingUserId) // get non-elastic search results
        normalSearch = normalSearch.concat(normalSearchRes)
        isNormalFetched = true
    }
    catch(err){
        console.log(err)
    }

    // concatenate results and remove duplicates. 
    if(isElasticFetched && isNormalFetched){
        uniqueSet = new Set(elastic.concat(normalSearch).map(s => JSON.stringify(s)))
        resultingList =  Array.from(uniqueSet).map(s => JSON.parse(s))
        return filterProjectByTag(resultingList, tags)            

    }
    else if(isElasticFetched){
        return filterProjectByTag(elastic, tags)            
    }
    else if(isNormalFetched){
        return filterProjectByTag(normalSearch, tags)            
    }
    else {
        return []
    }
}

// filters the given projects based on whether they are tagged with at least one of the tags given. 
var filterProjectByTag = async function(projects, tags) {
    if(tags.length == 0) return projects 
    projectIdsWithGivenTags = await ProjectTag.findAll({
        where: {
            tag: tags
        },
        attributes: ["project_id"],
        raw: true

    })
    projectIdsWithGivenTags = projectIdsWithGivenTags.map(a => a.project_id)
    return projects.filter(pr => projectIdsWithGivenTags.includes(pr.id))

}

// return a list of projects based on non-semantic search for the query given. The results 
// returned based on whether the title or the summary of the project contains the query.
var nonSemanticProjectSearch = async function(query, requestingUserId) {
    projects = await Project.findAll({
        where: {
            [Op.or]: [
                {
                    title: {
                        [Op.iLike]: "%" + query + "%"
                    },
                    [Op.or]: [
                        {
                            privacy: true
                        },
                        {
                            userId: requestingUserId
                        }
                    ]
                },
                {
                    summary: {
                        [Op.iLike]: "%" + query + "%"
                    },
                    [Op.or]: [
                        {
                            privacy: true
                        },
                        {
                            userId: requestingUserId
                        }
                    ]
                },
            ]
            
        }
    })    

    return projects
}

// return a list of events based on given query.
var eventSearch = async function(query, requestingUserId, tags) {
    elastic = [] // holds elastic search results
    normalSearch = [] // holds non-elastic search results
    isElasticFetched = false // error flag for elastic search
    isNormalFetched = false // error flag for non-elastic search

    try {
        elasticRes =  await elasticUtil.searchEvent(query) // get elastic search results
        // filter elastic search results based on privacy. 
        elasticRes = elasticRes.filter(t => t.isPublic == true || (t.isPublic == false && t.userId == requestingUserId))
        elastic = elastic.concat(elasticRes)
        isElasticFetched = true
    }
    catch(err){
        console.log(err)
    }
    
    try {
        normalSearchRes = await nonSemanticEventSearch(query, requestingUserId)
        normalSearch = normalSearch.concat(normalSearchRes)
        isNormalFetched = true
    }
    catch(err){
        console.log(err)
    }

    // concatenate results and remove duplicates. 
    if(isElasticFetched && isNormalFetched){
        elastic.forEach(e => {
            x =  e.updatedAt
            delete e.updatedAt
            e.updatedAt = x
        })
        normalSearch = normalSearch.map(s => s.dataValues)
        uniqueSet = new Set(elastic.concat(normalSearch).map(s => JSON.stringify(s)))
        resultingList =  Array.from(uniqueSet).map(s => JSON.parse(s))  
        return filterEventsByTag(resultingList, tags)            

    }
    else if(isElasticFetched){
        return filterEventsByTag(elastic, tags)
    }
    else if(isNormalFetched){
        return filterEventsByTag(normalSearch, tags)
    }
    else {
        return []
    }
}

// filters the given projects based on whether they are tagged with at least one of the tags given. 
var filterEventsByTag = async function(events, tags) {
    if(tags.length == 0) return events
    eventsIdsWithGivenTags = await EventTag.findAll({
        where: {
            tag: tags
        },
        attributes: ["id"],
        raw: true
    })
    eventsIdsWithGivenTags = eventsIdsWithGivenTags.map(a => a.id)
    return events.filter(ev => eventsIdsWithGivenTags.includes(ev.id))
}

// return a list of projects based on non-semantic search for the query given. The results 
// returned based on whether the title or the summary of the project contains the query.
var nonSemanticEventSearch = async function(query, requestingUserId){
    events = await Event.findAll({
        where: {
            [Op.or]: [
                {
                    title: {
                        [Op.iLike]: "%" + query + "%"
                    },
                    [Op.or]: [
                        {
                            isPublic: true
                        },
                        {
                            userId: requestingUserId
                        }
                    ]
                },
                {
                    body: {
                        [Op.iLike]: "%" + query + "%"
                    },
                    [Op.or]: [
                        {
                            isPublic: true
                        },
                        {
                            userId: requestingUserId
                        }
                    ]
                },
            ]
            
        }
    })    
    return events
}

module.exports = {
    userSearch,
    projectSearch,
    eventSearch,
}