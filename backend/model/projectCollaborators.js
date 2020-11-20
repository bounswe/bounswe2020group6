module.exports = (sequelize, Seq) => {
	return sequelize.define('projectCollaborator', {
		collaborator_id : Seq.INTEGER}, {
		
		timestamps : false
	})
}
