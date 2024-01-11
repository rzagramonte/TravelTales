const mongoose = require('mongoose')

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true
  },
  likedBy: [{ type: String }]
})

module.exports = mongoose.model('Blog', BlogSchema)
