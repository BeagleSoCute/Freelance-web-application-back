const mongoose = require("mongoose");
const User = require("../models/user.model"); // Import the User model

const projectSchema = new mongoose.Schema({
  freelancer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  seeker: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
  },
  requirement: {
    type: String,
  },
  expectation: {
    type: String,
  },
  scope: {
    type: String,
  },
  startDate: {
    type: String,
  },
  endDate: {
    type: String,
  },
  budget: {
    type: Number,
  },
  status: {
    type: String,
    default: "pending",
  },
  comment: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      },
      comment: {
        type: String,
      },
      date: {
        type: String,
      },
    },
  ],
  task: [
    {
      title: {
        type: String,
      },
      description: {
        type: String,
      },
      scope: {
        type: String,
      },
      date: {
        type: String,
      },
      progress: {
        type: String,
      },
      priority: {
        type: String,
      },
      checkList: [
        {
          description: String,
          isDone: Boolean,
        },
      ],
    },
  ],
  negotiation: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
      },
      comment: {
        type: String,
      },
      date: {
        type: String,
      },
      status: {
        type: String,
      },
    },
  ],
  relatedService: {
    id: { type: String },
    type: {
      type: String,
    },
    title: {
      type: String,
    },
  },
});

module.exports = Project = mongoose.model("projectSchema", projectSchema);
