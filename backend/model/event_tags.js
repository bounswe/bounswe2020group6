module.exports = (sequelize, Seq) => {
	return sequelize.define('event_tag', {
		id : {
			type : Seq.INTEGER,
			primaryKey: true,
 		},
		tag : {
			type : Seq.STRING,
			primaryKey: true,
 		}
	}, 
	{
		timestamps : true
	})
}
