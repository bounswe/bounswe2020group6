module.exports = (sequelize, Seq) => {
    return sequelize.define('project_milestone', {
        project_id: {
          type: Seq.INTEGER,
          primaryKey: true,
        },
        milestone_no: {
          type: Seq.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        milestone_date: {
          type: Seq.DATE,
        },
        milestone_title: {
          type: Seq.STRING,
        },
        milestone_description: {
          type: Seq.TEXT,
        },
        milestone_type: {
          type: Seq.STRING,
        }
    }, 
    {   
        timestamps : true
    }
    )
}