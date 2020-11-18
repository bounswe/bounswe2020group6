module.exports = (sequelize, Seq) => {
    return sequelize.define('project_tag', {
        project_id: {
          type: Seq.INTEGER,
          primaryKey: true,
        },
        tag: {
          type: Seq.STRING,
          primaryKey: true,
        }
    }, 
    {   
        timestamps : true
    }
    )
}