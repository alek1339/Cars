const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creat Schema
const CommentsSchema = new Schema({
  newsId: {
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
  authorId: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = Comments = mongoose.model('comments', CommentsSchema)
