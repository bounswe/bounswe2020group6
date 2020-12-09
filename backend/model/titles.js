module.exports = (sequelize, Seq) => {
    return sequelize.define('title', {
        title: {
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