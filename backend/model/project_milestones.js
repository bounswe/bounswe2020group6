module.exports = (sequelize, Seq) => {
    return sequelize.define('project_milestone', {
        project_id: {
          type: Seq.INTEGER,
          primaryKey: true,
        },
        milestone_no: {
          type: Seq.INTEGER,
          primaryKey: true,
        },
        milestone_date: {
          type: Seq.DATE,
        }
    }, 
    {   
        timestamps : true
    }
    )
}