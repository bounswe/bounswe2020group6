module.exports = (sequelize, Seq) => {
    return sequelize.define('project', {
        id: {
          type: Seq.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        owner_user_id: {
            type: Seq.INTEGER,
            allowNull: false,
        },
        topic:{
            type: Seq.STRING,
            allowNull: false,
        },
        abstract:{
            type: Seq.STRING,
            allowNull: false,
        },
        content:{
            type: Seq.STRING,
        },
        isPublic: {
            type: Seq.BOOLEAN,
            allowNull: false,
        },
        status: {
            type: Seq.INTEGER,
            allowNull: false,
        },
        deadline: {
            type: Seq.DATE,
            allowNull: false,
        }
    }, 
    {   
        timestamps : true
    }
    )
}