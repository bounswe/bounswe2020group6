const cron = require('node-cron');
const { User } = require('../model/db')
 
//will delete non-validated users older than one month, once every month
const task = cron.schedule('0 0 1 * *', async () => {
  let date = new Date()
  date.setDate( date.getDate() - 30 )
  const num = await User.destroy({
      where: {
          isValidated: false,
          createdAt: {
              [Op.lte]: date
          }
      }
  })
  console.log(`Removed ${num} users at` )

}, { scheduled: false });



module.exports = task
