const mongoose = require("mongoose");

const feedbackModel = {
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: function () {
      return require("../models/project.model");
    },
  },
  rating: { type: String },
  date: { type: String },
  comment: { type: String },
};
const userSchema = new mongoose.Schema({
  profile_picture: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
    select: false,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  phone_number: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "user",
  },
  description: {
    type: String,
  },
  skills: [String],
  coin: {
    type: Number,
  },
  portfolios: [
    {
      id: {
        type: String,
      },
      portfolio_picture: {
        type: String,
      },
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      skills: [String],
      customer: {
        type: String,
      },
    },
  ],
  seeker_feedbacks: [
    feedbackModel
  ],
  freelancer_feedbacks: [
    feedbackModel
  ],
  requestProvideService: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: function () {
        return require("../models/provideServiceList.model");
      },
    },
  ],
  requestFindService: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: function () {
        return require("../models/findServiceList.model");
      },
    },
  ],
});

module.exports = User = mongoose.model("User", userSchema);
