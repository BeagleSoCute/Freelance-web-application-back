const mongoose = require("mongoose");
const User = require('../models/user.model'); // Import the User model

const provideServiceListSchema = new mongoose.Schema({
  owner: {
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
  reason:{
    type:String
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
  related_portfolios: [
    {
      type: String,
    },
  ],
  date: {
    type: String,
  },
  candidates: [
    {
      id: { type: String },
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      details: { type: String },
      status: { type: String },
    },
  ],
});

module.exports = ProvideServiceList = mongoose.model(
  "provideServiceListSchema",
  provideServiceListSchema
);
