const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  img: {
    type: String,
  },
  type: {
    type: String,
  },
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  skills: [String],
  status: {
    type: String,
  },
  date: {
    type: String,
  },
  requests: [
    {
      id: {type:String},
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      details:{type:String},
      status:{type:String}
    },
  ],
});

module.exports = Post = mongoose.model("portfolioSchema", postSchema);
