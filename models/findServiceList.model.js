const mongoose = require("mongoose");
const User = require('../models/user.model'); // Import the User model

const findServiceListSchema = new mongoose.Schema({
  owner:{
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    default: "pending",
  },
  type: {
    type: String,
  },
  area: {
    type: String,
  },
  // category: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Category",
  // },
  category: {
    type: String,
  },
  date: {
    type: String,
  },
  candidates: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      },
      description: { type: String },
      status: { type: String, default:'pending' },
    },
  ],
});

module.exports = FindServiceList = mongoose.model(
  "findServiceListSchema",
  findServiceListSchema
);
