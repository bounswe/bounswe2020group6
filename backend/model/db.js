const Sequelize = require('sequelize')

//Prototype models
const UserModel = require('./users')
const ProjectModel = require('./projects')
const UserProjectModel = require('./userProjects')
const ProjectTagModel = require('./projectTags')
const ProjectCollaboratorModel = require('./projectCollaborators')
const ProjectFileModel = require('./projectFiles')

//New models
//User models:
const UserModel_New = require('./users_new')
const InterestModel = require('./interests')
const UserInterestModel = require('./user_interests')
const UserAffiliationModel = require('./user_affiliations')
const UserUpModel = require('./user_ups')

//Project models:
const ProjectMilestoneModel = require('./project_milestones')
const TagModel = require('./tags')



//Connection to server database
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

Project.hasMany(ProjectTag, {foreignKey : 'project_id' , onDelete: 'CASCADE',constraints: false })
Project.hasMany(ProjectCollaborator, {foreignKey : 'project_id' , onDelete: 'CASCADE', constraints: false })
UserProject.belongsTo(Project, {foreignKey : 'project_id', onDelete: 'CASCADE',constraints: false})
ProjectCollaborator.belongsTo(User, {foreignKey: 'user_id',constraints: false})
/*ProjectFile.belongsTo(Project, {foreignKey : 'project_id' , onDelete: 'CASCADE' })
Project.hasMany(ProjectFile)*/


//Yeni db modelleri:
const Interest = InterestModel(sequelize, Sequelize)
const User_new = UserModel_New(sequelize, Sequelize)
const UserInterest = UserInterestModel(sequelize, Sequelize)
const UserAffiliation = UserAffiliationModel(sequelize, Sequelize)
const UserUp = UserUpModel(sequelize, Sequelize)

const ProjectMilestone = ProjectMilestoneModel(sequelize, Sequelize)
const Tag = TagModel(sequelize, Sequelize)




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
  ProjectFile,
  Interest,
  User_new,
  UserInterest,
  UserAffiliation,
  UserProject,
  UserUp,
  Project,
  ProjectTag,
  ProjectCollaborator,
  ProjectMilestone,
  ProjectFile,
  Tag
}
