module.exports = (sequelize, Seq) => {
	return sequelize.define('userProject', {
		user_id : Seq.INTEGER}, {
		
		timestamps : false
	})
}
