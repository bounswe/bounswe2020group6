const Sequelize = require('sequelize')
//Project models
const UserModel = require('./users')
const ProjectModel = require('./projects')
const ProjectTagModel = require('./project_tags')
const ProjectCollaboratorModel = require('./project_collaborators')
const ProjectFileModel = require('./project_files')
const ProjectMilestoneModel = require('./project_milestones')


//User models:
const InterestModel = require('./interests')
const UserInterestModel = require('./user_interests')
const UserUpModel = require('./user_ups')
const UserProjectModel = require('./user_projects')
const FollowModel = require('./follow')

const TitleModel = require('./titles')
const TagModel = require('./tags')
const UniversityModel = require('./universities')
const DepartmentModel = require('./departments')


//Connection to server database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
})


const User = UserModel(sequelize, Sequelize)
const Project = ProjectModel(sequelize, Sequelize)
const UserProject = UserProjectModel(sequelize,Sequelize)
const ProjectTag = ProjectTagModel(sequelize, Sequelize)
const ProjectCollaborator = ProjectCollaboratorModel(sequelize, Sequelize)
const ProjectFile = ProjectFileModel(sequelize, Sequelize)
const Follow = FollowModel(sequelize, Sequelize)
//Yeni db modelleri:
const Interest = InterestModel(sequelize, Sequelize)
const UserInterest = UserInterestModel(sequelize, Sequelize)
const UserUp = UserUpModel(sequelize, Sequelize)

const ProjectMilestone = ProjectMilestoneModel(sequelize, Sequelize)
const Tag = TagModel(sequelize, Sequelize)
const University = UniversityModel(sequelize, Sequelize)
const Department = DepartmentModel(sequelize, Sequelize)
const Title = TitleModel(sequelize, Sequelize)

Project.hasMany(ProjectTag, {foreignKey : 'project_id' , onDelete: 'CASCADE',constraints: false })
Project.hasMany(ProjectCollaborator, {foreignKey : 'project_id' , onDelete: 'CASCADE', constraints: false })
UserProject.belongsTo(Project, {foreignKey : 'project_id', onDelete: 'CASCADE',constraints: false})
ProjectCollaborator.belongsTo(User, {foreignKey: 'user_id',constraints: false})
User.hasMany(UserInterest, {foreignKey: 'user_id', constraints: false})
Project.hasMany(ProjectFile,{foreignKey : 'project_id' , onDelete: 'CASCADE',constraints: false })

Project.hasMany(ProjectTag, {foreignKey : 'project_id' , onDelete: 'CASCADE',constraints: false })
Project.hasMany(ProjectCollaborator, {foreignKey : 'project_id' , onDelete: 'CASCADE', constraints: false })
UserProject.belongsTo(Project, {foreignKey : 'project_id', onDelete: 'CASCADE',constraints: false})
ProjectCollaborator.belongsTo(User, {foreignKey: 'user_id',constraints: false})
User.hasMany(UserInterest, {foreignKey: 'user_id', constraints: false})
Project.hasMany(ProjectFile,{foreignKey : 'project_id' , onDelete: 'CASCADE',constraints: false })

User.hasMany(Follow, {as: 'followed', foreignKey: 'follower_user_id', onDelete: 'CASCADE'})
Follow.belongsTo(User, {as: 'followed', foreignKey: 'follower_user_id', onDelete: 'CASCADE'})

User.hasMany(Follow, {as: 'following', foreignKey: 'followed_user_id', onDelete: 'CASCADE'})
Follow.belongsTo(User, {as: 'following', foreignKey: 'followed_user_id', onDelete: 'CASCADE'})


sequelize.query('SET FOREIGN_KEY_CHECKS = 0')
.then(function(){
    return sequelize.sync({ force: false });
})
.then(function(){
    return sequelize.query('SET FOREIGN_KEY_CHECKS = 1')
})
.then(function(){
    console.log('Database & tables are created.');
}, function(err){
    console.log(err);
});


module.exports = {
  User,
  Project,
  UserProject,
  ProjectTag,
  ProjectCollaborator,
  ProjectFile,
  Interest,
  UserInterest,
  UserProject,
  UserUp,
  Project,
  ProjectTag,
  ProjectCollaborator,
  ProjectMilestone,
  ProjectFile,
  Tag,
  University,
  Department,
  Title,
  Follow
}
