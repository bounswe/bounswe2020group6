module.exports = (sequelize, Seq) => {
    return sequelize.define('project_elastic', {
        id: {
            type: Seq.INTEGER,
            primaryKey: true,
            autoIncrement : true
        },
        project_id: Seq.INTEGER,
        elastic_id: Seq.TEXT,
    }, 
    {   
        timestamps : true
    }
    )
}
