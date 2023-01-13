const express = require('express')
const http = require('http')
const dotenv = require('dotenv')
const makeConnection = require('./database/db.js')
const cors = require('cors')
const socketIo = require('socket.io')
const bodyParser = require('body-parser')

const routes = require('./Routes/routes.js')
const { Socket } = require('dgram')
const user = require('./models/userschema.js')

const app = express()
dotenv.config()

const Name = process.env.Name
const Pass = process.env.pass

const PORT = process.env.PORT || 8000

// Router Connection
app.use(bodyParser.json({ extended: true }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/', routes)

//calling DataBase

makeConnection(Name, Pass)

const users = {}

const Server = http.createServer(app)
const io = socketIo(Server)

io.on('connection', (socket) => {
  console.log('New Connection')
  socket.on('joined', (user) => {
    users[socket.id] = user
    console.log(`${user} has joined`)
    socket.broadcast.emit('userJoined', {
      useer: 'Hey',
      mesaages: `${users[socket.id]} Online`,
    })
    socket.emit('welcome', {
      useer: 'Admin',
      mesaages: `Hey !! ${users[socket.id]} Welcome to the Chat `,
    })
  })
  socket.on('message', ({ msg, id }) => {
    io.emit('sendMessage', { user: users[id], msg, id })
  })
  socket.on('disconnect', () => {
    console.log(`User Left`)
  })
})

Server.listen(PORT, (err) => {
  if (err) {
    console.log('Enternal Server error', err)
  } else {
    console.log('The Server is running on port no', PORT)
  }
})

// mongodb+srv://AshutoshKumar:bhulgaya@Players.9fm9zse.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://AshutoshKumar:bhulgaya@cluster0.mongodb.net/chatWebApp?retryWrites=true&w=majority
// mongodb+srv://AshutoshKumar:<password>@cluster0.9fm9zse.mongodb.net/?retryWrites=true&w=majority
