module.exports = (sequelize, Seq) => {
	return sequelize.define('event_fav', {
		userId : {
			type : Seq.INTEGER,
			primaryKey: true,
 		},
		eventId : {
			type : Seq.STRING,
			primaryKey: true,
 		}
	}, 
	{
		timestamps : true
	})
}