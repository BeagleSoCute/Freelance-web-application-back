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

const retriveProvideServiceData = async (postID, userID) => {
  try {
    const serviceData = await ProvideServiceList.findOne({
      _id: postID,
    }).populate({
      path: "owner",
      select: "first_name last_name portfolios",
    }).populate({
      path: 'candidates.user',
      select: 'first_name last_name',
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
    const isRequest = serviceData.candidates.some(item => item.user._id.toString() === userID)
    const transformData = {
      ...serviceData.toObject(),
      related_portfolios: retrivePortfolioData,
      isRequest
    };
    return { success: true, payload: transformData };
  } catch (error) {
    console.log("error", error);
    return { success: false };
  }
};

const retriveFindServiceData = async (postID, userID) => {
  try {
    const serviceData = await FindServiceList.findOne({
      _id: postID,
    }).populate({
      path: "owner",
      select: "first_name last_name portfolios",
    }).populate({
      path: 'candidates.user',
      select: 'first_name last_name',
    });
    const isRequest = serviceData.candidates.some(item => item.user._id.toString() === userID)
    const data = {
      ...serviceData.toObject(),
      isRequest
    }
    
    return { success: true, payload: data };
  } catch (error) {
    console.log("error", error);
    return { success: false };
  }
};

const seePostServiceDetail = async (req, res) => {
  const postID = req.params.postID;
  const postType = req.params.type;
  const userID = req.user.id;
  if (!postType || postType === "provideService") {
    const { success, payload } = await retriveProvideServiceData(
      postID,
      userID
    );
    if (success) {
      res.status(200).json(payload);
    } else {
      console.log("500 error in provide post detail");
      res.status(500).send("Server see provide service post is error ");
    }
  } else {
    const { success, payload } = await retriveFindServiceData(postID, userID);
    if (success) {
      res.status(200).json(payload);
    } else {
      console.log("500 error in find post detail");
      res.status(500).send("Server see find service post is error ");
    }
  }
};

const showPostServiceLists = async (req, res) => {
  try {
    const provideServiceLists = await ProvideServiceList.find({
      status: { $ne: "pending" },
    }).populate({
      path: "owner",
      select: "first_name last_name",
    });
    const findServiceList = await FindServiceList.find().populate({
      path: "owner",
      select: "first_name last_name",
    });
    res.status(200).json({ provideServiceLists, findServiceList });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server showPostServicePending is error ");
  }
};

const sendServiceRequest = async (req, res) => {
  const userID = req.user.id;
  const postID = req.params.postID;
  const postType = req.params.type;
  const data = req.body;
  const { description } = data;
  try {
    if(postType === 'provideService'){
      await ProvideServiceList.updateOne(
        { _id: postID },
        { $push: { candidates: { description:description, user: userID } } }
        
      );
    }else{
      await FindServiceList.updateOne(
        { _id: postID },
        { $push: { candidates: { description:description, user: userID } } }
        
      );
    }
    res.status(200).send("Send a request success");

  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server sending a request is error ");
  }
};

module.exports = {
  addProvideService,
  addfindService,
  seePostServiceDetail,
  showPostServiceLists,
  sendServiceRequest,
};
