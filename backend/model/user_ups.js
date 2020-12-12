module.exports = (sequelize, Seq) => {
    return sequelize.define('user_up', {
        id: {
          type: Seq.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
        },
        upper_user_id: {
            type: Seq.INTEGER,
            allowNull: false,
        },
        upped_user_id: {
            type: Seq.INTEGER,
            allowNull: false,
        },

    }, 
    {
        timestamps : true
    }
    )
}