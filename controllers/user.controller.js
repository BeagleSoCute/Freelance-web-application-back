const User = require("../models/user.model");

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
  const userId = req.params.user.id;
  const data = req.body;
  try {
    await User.updateOne({ _id: userId },data);
    res.status(200).json({ msg: "Update Success" });
  } catch (error) {
    res.status(500).send("Server updateUser is error ");
  }
};

module.exports = {
  getUserData,
  getAllUsersData,
  getUserDetails,
  updateUser
};
