const User = require("../models/user.model");
const uploadImage = require("../helpers/upload")
const getUserData = async (req, res) => {
  const id = req.user.id;
  try {
    const user = await User.findOne({ _id: id }, { password: 0 });
    res.json(user);
  } catch (err) {
    res.status(500).send("Server getUserData is error ");
  }
};

const getAllUsersData = async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 });
    res.json(users);
  } catch (err) {
    res.status(500).send("Server getAllUsers is error ");
  }
};

const getUserDetails = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findOne({ _id: userId }, { password: 0 });
    if (!user) {
      res.status(400).json({ error: { msg: "This email is not exist!" } });
    }
    res.json(user);
  } catch (err) {
    res.status(500).send("Server getUserDetails is error ");
  }
};

const updateUser = async (req, res) => {
  const userId = req.user.id;
  const data = req.body;
  const image = req.file;
  const userData = JSON.parse(data.userData);
  try {
    const imageUrl = await uploadImage(image);
    console.log("imageUrl", imageUrl);
    await User.updateOne({ _id: userId }, userData);
    res.status(200).json({ msg: "Update Success" });
  } catch (error) {
    console.log('error in updateUser',error)
    res.status(500).send("Server updateUser is error ");
  }
};

module.exports = {
  getUserData,
  getAllUsersData,
  getUserDetails,
  updateUser,
};
