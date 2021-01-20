module.exports = (sequelize, Seq) => {
    return sequelize.define('follow', {
        id: {
            type: Seq.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        follower_user_id: {
            type: Seq.INTEGER,
            allowNull: false
        },
        followed_user_id: {
            type: Seq.INTEGER,
            allowNull: false
        }
    },
    {
        timestamps : true
    }
    )
}