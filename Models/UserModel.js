const Mongoose = require("mongoose");

// create schema

const userScehma = new Mongoose.Schema({
  name: {
    type: String,
    required: true,
    uppercase: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },

  password: {
    type: String,
    required: false,
  },
});

//create 1 model using schema

const User = Mongoose.model("user", userScehma); // user will be users in mongo...it is document name

//export model as 1 user

module.exports = User;
