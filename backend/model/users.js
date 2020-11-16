module.exports = (sequelize, Seq) => {
    return sequelize.define('user', {
        id: {
          type: Seq.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        email: {
            type: Seq.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: Seq.STRING,
            allowNull: false,
        },
        surname:{
            type: Seq.STRING,
            allowNull: false,
        },
        password: {
            type: Seq.STRING,
            allowNull: false,
        },
        validation: Seq.STRING,
        isValidated: Seq.BOOLEAN,
        createdAt: Seq.DATE,
    })
}