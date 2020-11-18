module.exports = (sequelize, Seq) => {
    return sequelize.define('user_affiliation', {
        id: {
          type: Seq.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        university: {
            type: Seq.STRING,
            allowNull: false,
        },
        department:{
            type: Seq.STRING,
            allowNull: false,
        },
        degree:{
            type: Seq.STRING,
            allowNull: false,
        }
    }, 
    {   
        timestamps : true
    }
    )
}