const FindServiceList = require("../models/findServiceList.model");
const ProvideServiceList = require("../models/provideServiceList.model");
const User = require("../models/user.model");

const addProvideService = async (req, res) => {
  const userID = req.user.id;
  const data = req.body;
  const transformData = {
    ...data,
    owner: userID,
  };
  try {
    newServicePost = new ProvideServiceList(transformData);
    newServicePost.save();
    res.status(200).send("Add a post success");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server addProvideService is error ");
  }
};

const addfindService = async (req, res) => {
  const userID = req.user.id;
  const data = req.body;
  const transformData = {
    ...data,
    owner: userID,
  };
  try {
    newFindServicePost = new FindServiceList(transformData);
    newFindServicePost.save();
    res.status(200).send("Add a post success");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server addfindService is error ");
  }
};

const seePostServiceDetail = async (req, res) => {
  const postID = req.params.postID;
  const userID = req.user.id;
  try {
    const serviceData = await ProvideServiceList.findOne({
      _id: postID,
    }).populate({
      path: "owner",
      select: "first_name last_name portfolios",
    });
    const userData = await User.findOne({ _id: userID }).select("role");
    if (userData.role !== "admin" && serviceData.status === "pending") {
      return res.status(403).send("Permission denied. You are not an admin.");
    }
    const relatedPortfolioIDs = serviceData.related_portfolios;
    const userPortfolios = serviceData.owner.portfolios;
    const retrivePortfolioData = userPortfolios.filter((item) =>
      relatedPortfolioIDs.includes(item._id)
    );
    const transformData = {
      ...serviceData.toObject(),
      related_portfolios: retrivePortfolioData,
    };
    res.status(200).json(transformData);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server seePostServiceDetail is error ");
  }
};

const showPostServiceLists = async (req, res) => {
  try {
    const provideServiceLists = await ProvideServiceList.find({
      status: { $ne: "pending" },
    });
    const findServiceList = await FindServiceList.find();
    res.status(200).json({ provideServiceLists, findServiceList });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server showPostServicePending is error ");
  }
};

module.exports = {
  addProvideService,
  addfindService,
  seePostServiceDetail,
  showPostServiceLists,
};
