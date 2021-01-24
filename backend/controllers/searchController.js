const { Project, Event } = require("../model/db")
const {Op} = require('sequelize')
const userUtils = require('../util/userUtil')
const elasticUtil = require("../elastic/elasticUtil")

search = async function(req, res) {
    const query = req.query.query.toLowerCase()
    const type = req.query.type
    try{
        if(type == 0){
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
                return res.status(200).send({message: "There are not any matches"})
            }
            else {
                similarityResults = await userUtils.getSimilarUsersByFields(nameMatchResults[0].id)
                return res.status(200).send({nameMatchedResults: nameMatchResults, sharingSimilaritiesResults: similarityResults})
            }
        }
        else if(type == 1) {
            // project search
            try {
                elastic =  await elasticUtil.searchPost(query)
                elastic.titleResult = elastic.titleResult.filter(t => t.data.privacy == true || (t.data.privacy == false && t.data.userId == req.userId))
                elastic.summaryResult = elastic.summaryResult.filter(s => s.data.privacy == true || (s.data.privacy == false && s.data.userId == req.userId))
                .filter(project => !elastic.titleResult.map(t => t.data.id).includes(project.data.id))
                return res.status(200).send({projects: elastic})
            }
            catch(err){
                projects = await Project.findAll({
                    where: {
                        [Op.or]: [
                            {
                                title: {
                                    [Op.like]: "%" + query + "%"
                                },
                                [Op.or]: [
                                    {
                                        privacy: true
                                    },
                                    {
                                        userId: req.userId
                                    }
                                ]
                            },
                            {
                                summary: {
                                    [Op.like]: "%" + query + "%"
                                },
                                [Op.or]: [
                                    {
                                        privacy: true
                                    },
                                    {
                                        userId: req.userId
                                    }
                                ]
                            },
                        ]
                        
                    }
                })    
               return res.status(200).send({projects: projects})
            }
        }
        else {  // event search
            try {
                elastic =  await elasticUtil.searchEvent(query)
                return res.status(200).send({events: elastic})
            }
            catch(err){
                events = await Event.findAll({
                    where: {
                        [Op.or]: [
                            {
                                title: {
                                    [Op.like]: "%" + query + "%"
                                },
                                [Op.or]: [
                                    {
                                        isPublic: true
                                    },
                                    {
                                        userId: req.userId
                                    }
                                ]
                            },
                            {
                                body: {
                                    [Op.like]: "%" + query + "%"
                                },
                                [Op.or]: [
                                    {
                                        isPublic: true
                                    },
                                    {
                                        userId: req.userId
                                    }
                                ]
                            },
                        ]
                        
                    }
                })    
               return res.status(200).send({events: events})
            }

        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({error: error})
    }
      
}

module.exports = {
    search
}
