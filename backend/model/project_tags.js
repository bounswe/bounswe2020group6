module.exports = (sequelize, Seq) => {
	return sequelize.define('project_tag', {
		tag : Seq.STRING}, {
		timestamps : false
	})
}
