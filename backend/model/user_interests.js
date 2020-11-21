module.exports = (sequelize, Seq) => {
    return sequelize.define('user_interest', {
        user_id: {
          type: Seq.INTEGER,
          allowNull: false,
          primaryKey: true,
        },
        interest: {
            type: Seq.STRING,
            allowNull: false,
            primaryKey: true,
        }
    }, 
    {
        timestamps : true
    }
    )
}