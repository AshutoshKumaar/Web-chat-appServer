const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const makeConnection = async () => {
  const url =
    'mongodb+srv://AshutoshKumar:bhulgaya@cluster0.9fm9zse.mongodb.net/?retryWrites=true&w=majority'
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log('Database Connection Sucessfully')
  } catch (error) {
    console.log('While conneting, We are getting an error...', error)
  }
}

module.exports = makeConnection
