//model for project collaborators
module.exports = (sequelize, Seq) => {
	return sequelize.define('project_collaborator', {
			id: {
				type: Seq.INTEGER,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			project_id: {
				type: Seq.INTEGER,
			},
			user_id: {
				type: Seq.INTEGER,
			}
		},
		{
			timestamps : false
		}
	)
}
