const FindServiceList = require("../models/findServiceList.model");
const ProvideServiceList = require("../models/provideServiceList.model");

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
  try {
    const data = await ProvideServiceList.findOne({ _id: postID }).populate({
      path: "owner",
      select: "name",
    });
    const relatedPortfolioIDs = data.related_portfolios;
    const userPortfolios = data.owner.portfolios;
    const retrivePortfolioData = userPortfolios.filter((item) =>
      relatedPortfolioIDs.includes(item.id)
    );
    const transformData = {
      ...data,
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

module.exports = { addProvideService, addfindService, seePostServiceDetail, showPostServiceLists };
