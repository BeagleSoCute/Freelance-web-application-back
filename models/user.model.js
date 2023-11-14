const mongoose = require("mongoose");

const feedbackModel = {
  positive: {
    type: Number,
    default: 0,
  },
  negative: {
    type: Number,
    default: 0,
  },
  neutral: {
    type: Number,
    default: 0,
  },
  review: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
      },
      feedback: { type: String },
      date: { type: String },
      comment: { type: String },
    },
  ],
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
    select: false
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
  seeker_feedbacks: feedbackModel,
  provider_feedbacks: feedbackModel,
  // posts: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "post",
  //   },
  // ],
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

module.exports = User = mongoose.model("user", userSchema);
