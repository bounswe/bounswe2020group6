module.exports = (sequelize, Seq) => {
	return sequelize.define('user_project', {
		user_id : Seq.INTEGER}, {
		
		timestamps : false
	})
}
