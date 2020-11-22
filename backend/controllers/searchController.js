const { User, Project } = require("../model/db")
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
                    topic: {
                        [Sequelize.Op.like]: "%" + query + "%"
                    }
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

module.exports = {
    search
}
