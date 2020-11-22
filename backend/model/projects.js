module.exports = (sequelize, Seq) => {
	return sequelize.define('project', {
		id : {
			type : Seq.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId : Seq.INTEGER,
		title: Seq.STRING,
		abstract : Seq.STRING,
		content : Seq.STRING,
		privacy : Seq.TINYINT,
		status : Seq.TINYINT,
		deadline : Seq.STRING,
		requirements : Seq.STRING }, {
		
		timestamps : true
	})
}
