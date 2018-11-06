const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const path = require('path')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const news = require('./routes/api/news')
const cars = require('./routes/api/cars')
const reviews = require('./routes/api/reviews')

const app = express()

// Bodyparse middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// DB Config
const db = require('./config/keys').mongoURI

// Connect to Mongodb
mongoose
  .connect(db)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err))

// Passport middleware
app.use(passport.initialize())

// Passport Config
require('./config/passport')(passport)

// Use Routes
app.use('/api/cars', cars)
app.use('/api/news', news)
app.use('/api/users', users)
app.use('/api/profile', profile)
app.use('/api/reviews', reviews)

// Server static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set Static folder
  app.user(express.static('client/build'))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running on port ${port}`))
