const Sequelize = require('sequelize')

//Prototype models
const UserModel = require('./users')
const PostModel = require('./posts')

//New models
//User models:
const UserModel_New = require('./users_new')
const InterestModel = require('./interests')
const UserInterestModel = require('./user_interests')
const UserAffiliationModel = require('./user_affiliations')
const UserProjectModel = require('./user_projects')
const UserUpModel = require('./user_ups')

//Project models:
const ProjectModel = require('./projects')
const ProjectTagModel = require('./project_tags')
const ProjectCollaboratorModel = require('./project_collaborators')
const ProjectMilestoneModel = require('./project_milestones')
const ProjectFileModel= require('./project_files')
const TagModel = require('./tags')



//Connection to server database
const sequelize = new Sequelize('akademise', 'root', 'password', {
  host: 'ec2-54-173-244-46.compute-1.amazonaws.com',
  dialect: 'mysql',
})


//Prototype modeller duruyor
const User = UserModel(sequelize, Sequelize)
const Post = PostModel(sequelize, Sequelize)

//Yeni db modelleri:
const Interest = InterestModel(sequelize, Sequelize)
const User_new = UserModel_New(sequelize, Sequelize)
const UserInterest = UserInterestModel(sequelize, Sequelize)
const UserAffiliation = UserAffiliationModel(sequelize, Sequelize)
const UserProject = UserProjectModel(sequelize, Sequelize)
const UserUp = UserUpModel(sequelize, Sequelize)

const Project = ProjectModel(sequelize, Sequelize)
const ProjectTag = ProjectTagModel(sequelize, Sequelize)
const ProjectCollaborator = ProjectCollaboratorModel(sequelize, Sequelize)
const ProjectMilestone = ProjectMilestoneModel(sequelize, Sequelize)
const ProjectFile = ProjectFileModel(sequelize, Sequelize)
const Tag = TagModel(sequelize, Sequelize)




sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
  Post,
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
