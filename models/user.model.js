const mongoose = require("mongoose");


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 6,
    required: true,
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
    required: true,
  },
  description: {
    type: String,
  },
  contract: {
    type: String,
  },
  skills: [],
 
  coin: {
    type: Number,
  },
  portfolio: {
    id:{
      type:String
    },
    img: {
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
      type:String
    }
  },
  posts:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'post'
  }]
});

module.exports = User = mongoose.model("user", userSchema);
