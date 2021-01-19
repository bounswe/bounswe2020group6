const Sequelize = require('sequelize')
const UserModel = require('./users')
const ProjectModel = require('./projects')
const ProjectTagModel = require('./project_tags')
const ProjectCollaboratorModel = require('./project_collaborators')
const ProjectFileModel = require('./project_files')
const CollabRequestModel = require('./collab_requests')
const ProjectMilestoneModel = require('./project_milestones')
const UserInterestModel = require('./user_interests')
const UserUpModel = require('./user_ups')
const FollowModel = require('./follows')
const TitleModel = require('./titles')
const TagModel = require('./tags')
const UniversityModel = require('./universities')
const DepartmentModel = require('./departments')
const NotificationModel = require('./notifications')
const EventModel = require('./events')
const EventTagModel = require('./event_tags')


//Connection to server database

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
})


const User = UserModel(sequelize, Sequelize)
const Project = ProjectModel(sequelize, Sequelize)
const ProjectTag = ProjectTagModel(sequelize, Sequelize)
const ProjectCollaborator = ProjectCollaboratorModel(sequelize, Sequelize)
const ProjectFile = ProjectFileModel(sequelize, Sequelize)
const Follow = FollowModel(sequelize, Sequelize)
const CollabRequest = CollabRequestModel(sequelize, Sequelize)
const UserInterest = UserInterestModel(sequelize, Sequelize)
const UserUp = UserUpModel(sequelize, Sequelize)
const ProjectMilestone = ProjectMilestoneModel(sequelize, Sequelize)
const Tag = TagModel(sequelize, Sequelize)
const University = UniversityModel(sequelize, Sequelize)
const Department = DepartmentModel(sequelize, Sequelize)
const Title = TitleModel(sequelize, Sequelize)
const Notification = NotificationModel(sequelize, Sequelize)
const Event = EventModel(sequelize, Sequelize)
const EventTag = EventTagModel(sequelize, Sequelize)

User.hasMany(Project, {as: "project", foreignKey: "userId", onDelete: 'CASCADE', constraints: false})
ProjectCollaborator.belongsTo(User, {foreignKey: 'user_id',constraints: false})
ProjectCollaborator.belongsTo(Project, {foreignKey: 'project_id',constraints: false})

User.hasMany(ProjectCollaborator, {foreignKey: "user_id", onDelete: 'CASCADE', constraints: false})
User.hasMany(UserInterest, {foreignKey: 'user_id', constraints: false})
Project.hasMany(ProjectFile,{foreignKey : 'project_id' , onDelete: 'CASCADE',constraints: false })
Project.hasMany(ProjectTag, {foreignKey : 'project_id' , onDelete: 'CASCADE',constraints: false })
Project.hasMany(ProjectCollaborator, {foreignKey : 'project_id' , onDelete: 'CASCADE', constraints: false })
Project.hasMany(ProjectMilestone, {foreignKey : 'project_id' , onDelete: 'CASCADE', constraints: false })
Project.belongsTo(User, {foreignKey : 'userId', onDelete : 'CASCADE',constraints : false})

CollabRequest.belongsTo(User,{foreignKey : 'requesterId', onDelete : 'CASCADE', constraints : false})
CollabRequest.belongsTo(Project,{foreignKey : 'projectId', onDelete : 'CASCADE', constraints : false})

User.hasMany(Follow, {as: 'followed', foreignKey: 'follower_user_id', onDelete: 'CASCADE'})
Follow.belongsTo(User, {as: 'followed', foreignKey: 'follower_user_id', onDelete: 'CASCADE'})
User.hasMany(Follow, {as: 'following', foreignKey: 'followed_user_id', onDelete: 'CASCADE'})
Follow.belongsTo(User, {as: 'following', foreignKey: 'followed_user_id', onDelete: 'CASCADE'})

User.hasMany(Event, {as: 'eventUser', foreignKey: 'userId', onDelete: 'CASCADE'})
Event.belongsTo(User, {as: 'eventUser', foreignKey: 'userId', onDelete: 'CASCADE'})

Tag.hasMany(EventTag, {as: 'eventTag', foreignKey: 'tag', onDelete: 'CASCADE'})
EventTag.belongsTo(Tag, {as: 'eventTag', foreignKey: 'tag', onDelete: 'CASCADE'})

Event.hasMany(EventTag, {foreignKey: 'id', onDelete: 'CASCADE'})
EventTag.belongsTo(Event, {foreignKey: 'id', onDelete: 'CASCADE'})

User.hasMany(Notification, {as: 'notificationUser', foreignKey: 'userId', onDelete: 'CASCADE'})
Notification.belongsTo(User, {as: 'notificationUser', foreignKey: 'userId', onDelete: 'CASCADE'})


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
  UserInterest,
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
  Follow,
  CollabRequest,
  Notification,
  Event,
  EventTag,
  sequelize,
}
