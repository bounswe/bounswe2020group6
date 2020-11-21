module.exports = (sequelize, Seq) => {
	return sequelize.define('project', {
		id : {
			type : Seq.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId : Seq.INTEGER,
		topic: Seq.STRING,
		abstract : Seq.STRING,
		content : Seq.STRING,
		privacy : Seq.TINYINT,
		status : Seq.TINYINT,
		publicationType : Seq.STRING,
		deadline : Seq.STRING,
		requirements : Seq.STRING }, {
		
		timestamps : true
	})
}
