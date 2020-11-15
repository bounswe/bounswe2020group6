module.exports = (sequelize, Seq) => {
	return sequelize.define('post', {
		id : {
			type : Seq.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId : Seq.INTEGER,
		topic : Seq.STRING,
		summary : Seq.STRING,
		publicationType : Seq.STRING,
		deadline : Seq.STRING,
		requirements : Seq.STRING,
		isFunded : Seq.TINYINT,
		privacy : Seq.TINYINT }, {
		
		timestamps : false
	})
}
