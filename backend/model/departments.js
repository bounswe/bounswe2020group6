module.exports = (sequelize, Seq) => {
    return sequelize.define('department', {
        department: {
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