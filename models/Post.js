const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  comments: {
    type: Number,
    required: true,
  },
  likes: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  userName: {
    type: String,  // This field will store the userName
  },
  likedBy: [{ type: String }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

PostSchema.pre('save', async function (next) {
  try {
    // Use Mongoose's populate method to fetch the corresponding user document
    const populatedPost = await this.populate('user').execPopulate();

    // Set the userName field based on the user document
    this.userName = populatedPost.user.userName;

    next();
  } catch (error) {
    next(error);
  }
});

module.exports = mongoose.model('Post', PostSchema)
