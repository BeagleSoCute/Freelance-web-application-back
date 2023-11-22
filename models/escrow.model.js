const mongoose = require("mongoose");
const Project = require("../models/project.model"); // Import the User model

const escrowSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Project,
  },
  amount: {
    type: Number,
    default: 0,
  },
  isPaidBySeeker: {
    type: Boolean,
    default: false,
  },
  isPaidToFreelancer: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "pending", // pending, done, cancel
  },
  date: {
    type: String,
  },
  paidToFreelancerDate:{
    type:String
  }
});

module.exports = Escrow = mongoose.model("escrowSchema", escrowSchema);
