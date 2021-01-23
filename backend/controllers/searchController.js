const { User, Project } = require("../model/db")
const Sequelize = require('sequelize')
const userUtils = require('../util/userUtil')
const elasticUtil = require("../util/elasticUtil")


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
        else {
            projects = await Project.findAll({
                where: {
                    title: {
                        [Sequelize.Op.like]: "%" + query + "%"
                    },
                    privacy: 1
                }
            })
            
            try {
                elastic =  await elasticUtil.search(query)
                return res.status(200).send({projects: elastic})
            }
            catch(err){
               return res.status(200).send({projects: projects})
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
