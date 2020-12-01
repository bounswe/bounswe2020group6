module.exports = (sequelize, Seq) => {
    return sequelize.define('university', {
        university: {
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