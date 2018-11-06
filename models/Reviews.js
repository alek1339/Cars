const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creat News Schema
const NewsSchema = new Schema({
  header: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  imgUrl: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Review = mongoose.model('review', NewsSchema)
