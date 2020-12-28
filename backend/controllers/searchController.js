const { User, Project, ProjectTag } = require("../model/db")
const Sequelize = require('sequelize')

search = async function(req, res) {
    const query = req.query.query.toLowerCase()
    const type = req.query.type
    try{
        if(type == 0){
            
            users = await User.findAll({
                where: Sequelize.where(Sequelize.fn('concat', Sequelize.col("name"), " ", Sequelize.col("surname")), {
                    [Sequelize.Op.like]: "%" + query + "%"
                })
            })
           

            return res.status(200).send({users: users})
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
    
            return res.status(200).send({projects: projects})
        }
    }
    catch(error){
        console.log(error)
        return res.status(500).send({error: error})
    }
      
}

searchProjectsIdsByTags = async function(req, res) {
    const tags = req.body.tags
    try{
        projects= Project.findAll({
            include: [{
                model: ProjectTag,
                where: {tag: tags[0]}
            }]
            })
            return res.status(200).send({projects: projects})
        }
    
    catch(error){
        console.log(error)
        return res.status(500).send({error: error})
    }
      
}

module.exports = {
    search,
    searchProjectsIdsByTags
}
