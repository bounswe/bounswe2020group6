module.exports = (sequelize, Seq) => {
	return sequelize.define('projectTag', {
		tag : Seq.STRING}, {
		
		timestamps : false
	})
}
