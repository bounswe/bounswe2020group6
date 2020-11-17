const Sequelize = require('sequelize')
const UserModel = require('./users')
const PostModel = require('./posts')

const sequelize = new Sequelize('akademise', 'root', 'password', {
  host: 'ec2-54-173-244-46.compute-1.amazonaws.com',
  dialect: 'mysql',
})

const User = UserModel(sequelize, Sequelize)
const Post = PostModel(sequelize, Sequelize)

sequelize.sync()
  .then(() => {
    console.log(`Database & tables created!`)
  })

module.exports = {
  User,
  Post
}
