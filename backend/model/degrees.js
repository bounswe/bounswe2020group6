module.exports = (sequelize, Seq) => {
    return sequelize.define('degree', {
        degree: {
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