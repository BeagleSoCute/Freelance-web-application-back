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
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  dueDate: {
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
      dueDate: {
        type: String,
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
