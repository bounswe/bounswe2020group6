const { Project, Event } = require("../model/db")
const {Op} = require('sequelize')
const elasticUtil = require("../elastic/elasticUtil")
const searchUtil = require("../util/searchUtil")


search = async function(req, res) {
    const query = req.query.query.toLowerCase()
    const type = req.query.type
    try{
        if(type == 0){
            result = await searchUtil.userSearch(query)
            return res.status(200).send(result)
        }
        else if(type == 1) {
            result = await searchUtil.projectSearch(query, req.userId)
            return res.status(200).send({projects: result})
        }
        else { 
            result = await searchUtil.eventSearch(query, req.userId)
            return res.status(200).send({events: result})
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
