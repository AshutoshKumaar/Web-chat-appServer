const express = require('express')
const { insertUser, getUser } = require('../controller/usertConroller.js')

const routes = express.Router()

routes.post('/signup', insertUser)
routes.get('/login', getUser)

module.exports = routes
