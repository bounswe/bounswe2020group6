module.exports = (sequelize, Seq) => {
	return sequelize.define('event_fav', {
		//id of user
		userId : {
			type : Seq.INTEGER,
			primaryKey: true,
		 },
		 //id of event
		eventId : {
			type : Seq.INTEGER,
			primaryKey: true,
 		}
	}, 
	{
		timestamps : true
	})
}