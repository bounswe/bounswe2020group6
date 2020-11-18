module.exports = (sequelize, Seq) => {
    return sequelize.define('user', {
        id: {
          type: Seq.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
            type: Seq.STRING,
            allowNull: false,
        },
        surname:{
            type: Seq.STRING,
            allowNull: false,
        },
        email: {
            type: Seq.STRING,
            allowNull: false,
            unique: true,
        },
        validation: {
            type: Seq.STRING,
            allowNull: false,
        },
        createdAt: {
            type: Seq.DATE,
            allowNull: false,
        }
    }
    )
}