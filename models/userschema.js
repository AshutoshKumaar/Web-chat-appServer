const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  Name: {
    type: String,
    require: true,
  },
  UserID: {
    type: String,
    require: true,
  },
  Email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
})

const user = mongoose.model('usersData', userSchema)

module.exports = user
