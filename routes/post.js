const mongoose = require("mongoose");

// Define the post schema
mongoose.connect("mongodb://127.0.0.1:27017/newcollection");
const postSchema = new mongoose.Schema({
  imageText: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: {
    type: Number,
    default: 0,
  },
});

// Create the post model
const Post = mongoose.model("Post", postSchema);

// Export the model
module.exports = Post;
