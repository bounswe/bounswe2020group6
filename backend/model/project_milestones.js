//model for project milestone
module.exports = (sequelize, Seq) => {
    return sequelize.define('project_milestone', {
        id: {
            type: Seq.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        project_id: {
            type: Seq.INTEGER,
        },
        date: {
            type: Seq.DATE,
        },
        title: {
            type: Seq.STRING,
        },
        description: {
            type: Seq.TEXT,
        },
        type: {
            type: Seq.STRING,
        }
    }, 
    {   
        timestamps : true
    }
    )
}
