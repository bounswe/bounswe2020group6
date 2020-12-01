module.exports = (sequelize, Seq) => {
	return sequelize.define('project', {
		id : {
			type : Seq.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId : Seq.INTEGER,
		title: Seq.STRING,
		summary : Seq.TEXT,
		description : Seq.TEXT,
		privacy : Seq.TINYINT,
		status : Seq.TINYINT,
		requirements : Seq.TEXT
	}, 
	{
		
		timestamps : true
	})
}
