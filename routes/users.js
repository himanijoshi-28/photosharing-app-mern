// var express = require('express');
// var router = express.Router();

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

// module.exports = router;
const mongoose = require("mongoose");

const plm = require("passport-local-mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/newcollection");

// Define the user schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  dp: {
    type: String, // Assuming a URL or file path for the profile picture
  },
  email: {
    type: String,
    required: true,
    unique: true,
    // Add a validation for email format if needed
  },
  fullname: {
    type: String,
    required: true,
  },
});

userSchema.plugin(plm);
// Create the user model
module.exports = mongoose.model("User", userSchema);
