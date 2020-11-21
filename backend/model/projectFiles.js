module.exports = (sequelize, Seq) => {
	return sequelize.define('projectFile', {
		id : {
			type : Seq.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		project_id : Seq.INTEGER,
		file_name : Seq.STRING,
		file_type : Seq.STRING,
		file_path : Seq.STRING
		}, {
		
		timestamps : true
	})
}
