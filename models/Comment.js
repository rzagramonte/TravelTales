const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type: String,  // This field will store the userName
  },
  body: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  likedBy: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

CommentSchema.pre('save', async function (next) {
  try {
    // Use Mongoose's populate method to fetch the corresponding user document
    const populatedUser = await this.populate('user').execPopulate();
    // Set the userName field based on the user document
    this.userName = populatedUser.user.userName;

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Comment', CommentSchema)