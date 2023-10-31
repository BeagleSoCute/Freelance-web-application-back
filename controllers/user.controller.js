const User = require("../models/user.model");
const uploadImage = require("../helpers/upload");

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
    let savingData;
    if (!imageUrl) {
      savingData = userData;
    } else {
      savingData = {
        ...userData,
        profile_picture: imageUrl,
      };
    }
    await User.updateOne({ _id: userId }, savingData);
    const savedData = await User.findOne({ _id: userId }, { password: 0 });
    res.json(savedData);
  } catch (error) {
    console.log("error in updateUser", error);
    res.status(500).send("Server updateUser is error ");
  }
};

const addPortfolio = async (req, res) => {
  const userId = req.user.id;
  const data = req.body;
  const image = req.file;
  const portfolioData = JSON.parse(data.portfolioData);
  try {
    const imageUrl = await uploadImage(image);
    let savingData;
    if (!imageUrl) {
      savingData = portfolioData;
    } else {
      savingData = {
        ...portfolioData,
        portfolio_picture: imageUrl,
      };
    }
    await User.updateOne(
      { _id: userId },
      { $push: { portfolios: savingData } }
    );
    const savedData = await User.findOne({ _id: userId }, { password: 0 });
    res.json(savedData);
  } catch (error) {
    console.log("error in addPortfolio", error);
    res.status(500).send("Server addPortfolio is error ");
  }
};

const editPortfolio = async (req, res) => {
  const userId = req.user.id;
  const data = req.body;
  const image = req.file;
  const portfolioData = JSON.parse(data.portfolioData);
  const originalImage = data.originalImage
  try {
    const imageUrl = await uploadImage(image);
    let savingData;
   
      savingData = {
        ...portfolioData,
        portfolio_picture: imageUrl? imageUrl : originalImage,
      };
   await User.updateOne(
      { _id: userId, 'portfolios._id': portfolioData._id },
      { $set: { 'portfolios.$': savingData } }
    );
    const returnData = await User.findOne({ _id: userId }, { password: 0 });
    res.json(returnData);
  } catch (error) {
    console.log("error in editPortfolio", error);
    res.status(500).send("Server editPortfolio is error ");
  }
};

const deletePortfolio = async (req, res) => {
  const userId = req.user.id;
  const { portfolioId } = req.body;
  try {
    await User.updateOne(
      { _id: userId },
      { $pull: { portfolios: { _id: portfolioId } } }
    );
    const savedData = await User.findOne({ _id: userId }, { password: 0 });
    res.json(savedData);
  } catch (error) {
    console.log("error in deletePortfolio", error);
    res.status(500).send("Server deletePortfolio is error ");
  }
};

module.exports = {
  getUserData,
  getAllUsersData,
  getUserDetails,
  updateUser,
  addPortfolio,
  editPortfolio,
  deletePortfolio,
};
