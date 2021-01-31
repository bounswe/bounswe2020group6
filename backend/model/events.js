module.exports = (sequelize, Seq) => {
	return sequelize.define('event', {
		id : {
			type : Seq.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		//field names are self explanatory
		userId : Seq.INTEGER,
		type : Seq.TEXT,
		isPublic : Seq.BOOLEAN,
		title : Seq.TEXT,
		body : Seq.TEXT,
		link : Seq.TEXT,
		location : Seq.TEXT,
		date : Seq.DATE,
		other : Seq.TEXT
	}, 
	{
		timestamps : true
	})
}
