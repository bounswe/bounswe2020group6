module.exports = (sequelize, Seq) => {
    return sequelize.define('user_project', {
        user_id: {
          type: Seq.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        project_id: {
            type: Seq.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        isFinished: {
            type: Seq.BOOLEAN,
            allowNull: false,
            primaryKey: true,
        },

    }, 
    {
        timestamps : true
    }
    )
}