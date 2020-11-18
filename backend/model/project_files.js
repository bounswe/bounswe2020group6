module.exports = (sequelize, Seq) => {
    return sequelize.define('project_file', {
        id: {
          type: Seq.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        owner_project_id: {
            type: Seq.INTEGER,
            allowNull: false,
        },
        file_name:{
            type: Seq.STRING,
            allowNull: false,
        },
        file_path:{
            type: Seq.STRING,
            allowNull: false,
        },
        file_type:{
            type: Seq.STRING,
            allowNull: false,
        }
    }, 
    {   
        timestamps : true
    }
    )
}