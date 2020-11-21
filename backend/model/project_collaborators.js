module.exports = (sequelize, Seq) => {
    return sequelize.define('project_collaborator', {
        project_id: {
          type: Seq.INTEGER,
          primaryKey: true,
        },
        collaborator_user_id: {
          type: Seq.INTEGER,
          primaryKey: true,
        }
    }, 
    {   
        timestamps : true
    }
    )
}