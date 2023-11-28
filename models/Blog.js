const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  blogText: {
    type: String,
    required: true,
  },
  liked: {
    type: Boolean,
    required: false,
  },
  userId: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('Blog', BlogSchema)
