const { response } = require('express')
const user = require('../models/userschema.js')

const insertUser = async (req, res) => {
  const userDetails = req.body
  const newUser = new user(userDetails)

  try {
    await newUser.save((err) => {
      if (err) {
        console.log('The error is ', err)
      } else {
        console.log('The information is saved sucessfully on the database')
      }
    })
    res.status(200).json(newUser)
  } catch (error) {
    res.status(400).json({ messages: 'internal Server erorr' })
  }
}

const getUser = async (req, res) => {
  try {
    // console.log(user.find().json())
    const internalUser = await user.find({})
    res.status(200).json(internalUser)
  } catch (err) {
    res.status(404).json({ messages: 'something went wron while fetching' })
  }
}

module.exports = {
  insertUser: insertUser,
  getUser: getUser,
}
