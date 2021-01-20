module.exports = (sequelize, Seq) => {
	return sequelize.define('notification', {
		id : {
			type : Seq.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId : Seq.INTEGER,
		type : Seq.TEXT,
		isRead : Seq.TINYINT,
		title : Seq.TEXT,
		body : Seq.TEXT,
		link : Seq.TEXT,
		other : Seq.TEXT
	}, 
	{
		timestamps : true
	})
}
