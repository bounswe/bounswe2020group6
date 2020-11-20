const Sequelize = require('sequelize')
const UserModel = require('./users')
const ProjectModel = require('./projects')
const UserProjectModel = require('./userProjects')
const ProjectTagModel = require('./projectTags')
const ProjectCollaboratorModel = require('./projectCollaborators')
const ProjectFileModel = require('./projectFiles')

const sequelize = new Sequelize('akademise', 'root', 'password', {
  host: 'ec2-54-173-244-46.compute-1.amazonaws.com',
  dialect: 'mysql',
})


const User = UserModel(sequelize, Sequelize)
const Project = ProjectModel(sequelize, Sequelize)
const UserProject = UserProjectModel(sequelize,Sequelize)
const ProjectTag = ProjectTagModel(sequelize, Sequelize)
const ProjectCollaborator = ProjectCollaboratorModel(sequelize, Sequelize)
const ProjectFile = ProjectFileModel(sequelize, Sequelize)

Project.hasMany(ProjectTag, {foreignKey : 'project_id' , onDelete: 'CASCADE' })
Project.hasMany(ProjectCollaborator, {foreignKey : 'project_id' , onDelete: 'CASCADE' })
UserProject.belongsTo(Project, {foreignKey : 'project_id', onDelete: 'CASCADE'})
ProjectCollaborator.belongsTo(User, {foreignKey: 'user_id'})
/*ProjectFile.belongsTo(Project, {foreignKey : 'project_id' , onDelete: 'CASCADE' })
Project.hasMany(ProjectFile)*/


sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
  Project,
  UserProject,
  ProjectTag,
  ProjectCollaborator,
  ProjectFile
}
