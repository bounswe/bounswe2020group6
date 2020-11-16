module.exports = (sequelize, Seq) => {
	//database model for posts, timestamps is false now, if required it can be changed to true
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
		
		timestamps : true
	})
}
