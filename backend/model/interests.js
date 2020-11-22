module.exports = (sequelize, Seq) => {
    return sequelize.define('interest', {
        interest: {
          type: Seq.STRING,
          primaryKey: true,
          unique: true,
        }
    }, 
    {   
        timestamps : true
    }
    )
}