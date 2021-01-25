const { Project, Event, ProjectTag, EventTag } = require("../model/db")
const {Op} = require('sequelize')
const userUtils = require('../util/userUtil')
const elasticUtil = require("../elastic/elasticUtil")


var userSearch = async function(query){
    let [fullnameStarts, lastNameStarts, contains] = 
                await Promise.all([
                    userUtils.fullnameStartsWith(query),
                    userUtils.lastNameStartsWith(query),
                    userUtils.fullnameContains(query),

                ])
            allUsers = fullnameStarts.concat(lastNameStarts).concat(contains)
            uniqueSet = new Set(allUsers.map(user => JSON.stringify(user)))
            nameMatchResults = Array.from(uniqueSet).map(user => JSON.parse(user))
            if(nameMatchResults.length == 0){
                return {message: "There are not any matches"}
            }
            else {
                similarityResults = await userUtils.getSimilarUsersByFields(nameMatchResults[0].id)
                return {nameMatchedResults: nameMatchResults, sharingSimilaritiesResults: similarityResults}
            }
}

var projectSearch = async function(query, requestingUserId, tags){
    elastic = []
    normalSearch = []
    isElasticFetched = false
    isNormalFetched = false
    try {
        elasticRes =  await elasticUtil.searchPost(query)
        elasticRes = elasticRes.filter(t => t.privacy == true || (t.privacy == false && t.userId == requestingUserId))
        elastic = elastic.concat(elasticRes)
        isElasticFetched = true
    }
    catch(err){
        console.log(err)
    }
    
    try {
        normalSearchRes = await nonSemanticProjectSearch(query, requestingUserId)
        normalSearch = normalSearch.concat(normalSearchRes)
        isNormalFetched = true
    }
    catch(err){
        console.log(err)
    }

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

var eventSearch = async function(query, requestingUserId, tags) {
    elastic = []
    normalSearch = []
    isElasticFetched = false
    isNormalFetched = false

    try {
        elasticRes =  await elasticUtil.searchEvent(query)
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