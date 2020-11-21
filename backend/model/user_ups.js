module.exports = (sequelize, Seq) => {
    return sequelize.define('user_up', {
        up_Id: {
          type: Seq.INTEGER,
          allowNull: false,
          primaryKey: true,
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