module.exports = (sequelize, Seq) => {
    return sequelize.define('tag', {
        tag: {
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