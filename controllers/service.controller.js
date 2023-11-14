const FindServiceList = require("../models/findServiceList.model");
const ProvideServiceList = require("../models/provideServiceList.model");
const User = require("../models/user.model");
const Project = require("../models/project.model");

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
    })
      .populate({
        path: "owner",
        select: "first_name last_name portfolios",
      })
      .populate({
        path: "candidates.user",
        select: "first_name last_name",
      });
    const isOwner = serviceData.owner._id.toString() === userID;

    const userData = await User.findOne({ _id: userID }).select("role");
    if (
      userData.role !== "admin" &&
      serviceData.status === "pending" &&
      !isOwner
    ) {
      return { success: false };
    }
    const relatedPortfolioIDs = serviceData.related_portfolios;
    const userPortfolios = serviceData.owner.portfolios;
    const retrivePortfolioData = userPortfolios.filter((item) =>
      relatedPortfolioIDs.includes(item._id)
    );
    const requestInfo = serviceData.candidates.find(
      (item) => item.user._id.toString() === userID
    );
    const transformData = {
      ...serviceData.toObject(),
      related_portfolios: retrivePortfolioData,
      requestInfo: requestInfo ? requestInfo : null,
      isOwner,
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
    })
      .populate({
        path: "owner",
        select: "first_name last_name portfolios",
      })
      .populate({
        path: "candidates.user",
        select: "first_name last_name",
      });
    const requestInfo = serviceData.candidates.find(
      (item) => item.user._id.toString() === userID
    );
    const isOwner = serviceData.owner._id.toString() === userID;

    const data = {
      ...serviceData.toObject(),
      requestInfo: requestInfo ? requestInfo : null,
      isOwner,
    };

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
  const userID = req.user.id;
  try {
    const provideServiceLists = await ProvideServiceList.find({
      status: { $nin: ["pending", "reject", "close"] },
      owner: { $ne: userID },
    }).populate({
      path: "owner",
      select: "first_name last_name",
    });
    const findServiceList = await FindServiceList.find({
      owner: { $ne: userID },
      status: { $nin: ["reject", "close"] },
    }).populate({
      path: "owner",
      select: "first_name last_name",
    });
    res.status(200).json({
      provideServiceLists: provideServiceLists,
      findServiceList: findServiceList,
    });
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
  const { description, date } = data;
  try {
    let serviceType = "";
    if (postType === "provideService") {
      await ProvideServiceList.updateOne(
        { _id: postID },
        {
          $push: {
            candidates: { date, description: description, user: userID },
          },
        }
      );
      serviceType = "requestProvideService";
    } else {
      await FindServiceList.updateOne(
        { _id: postID },
        {
          $push: {
            candidates: { date, description: description, user: userID },
          },
        }
      );
      serviceType = "requestFindService";
    }
    await User.updateOne({ _id: userID }, { $push: { [serviceType]: postID } });
    res.status(200).send("Send a request success");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server sending a request is error ");
  }
};

const showMyServiceLists = async (req, res) => {
  const userID = req.user.id;
  try {
    const provideServiceLists = await ProvideServiceList.find({
      owner: userID,
    }).populate({
      path: "owner",
      select: "first_name last_name",
    });
    const findServiceList = await FindServiceList.find({
      owner: userID,
    }).populate({
      path: "owner",
      select: "first_name last_name",
    });
    const userData = await User.findOne({ _id: userID })
      .populate({
        path: "requestProvideService",
        populate: [
          { path: "owner", select: "first_name last_name" },
          { path: "candidates.user", select: "first_name last_name" },
        ],
      })
      .populate({
        path: "requestFindService",
        populate: [
          { path: "owner", select: "first_name last_name" },
          { path: "candidates", select: "" },
          { path: "candidates.user", select: "first_name last_name" },
        ],
      });

    const provideRequestList = userData.requestProvideService;
    const findRequestList = userData.requestFindService;

    let requestProvideIndo = [];
    let requestFindInfo = [];

    if (provideRequestList && provideRequestList.length > 0) {
      requestProvideIndo = provideRequestList.flatMap((item) =>
        item.candidates
          .filter((candidate) => candidate.user._id == userID)
          .map((candidate) => {
            return {
              ...item.toObject(),
              candidateStatus: candidate.status,
              serviceType: "provideService",
            };
          })
      );
    }
    if (findRequestList && findRequestList.length > 0) {
      requestFindInfo = findRequestList.flatMap((item) =>
        item.candidates
          .filter((candidate) => candidate.user._id == userID)
          .map((candidate) => {
            return {
              ...item.toObject(),
              candidateStatus: candidate.status,
              serviceType: "findService",
            };
          })
      );
    }
    res.status(200).json({
      provideServiceLists: provideServiceLists,
      findServiceList: findServiceList,
      requestList: [...requestProvideIndo, ...requestFindInfo],
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server showPostServicePending is error ");
  }
};

const approveCandidate = async (req, res) => {
  const userID = req.user.id;
  const postID = req.params.postID;
  const postType = req.params.type;
  const data = req.body;
  const { status, candidateID, candidateUserID, postTitle } = data;
  let freelancer;
  let seeker;
  try {
    const isApprove = status === "approve";
    if (postType === "provideService") {
      await ProvideServiceList.updateOne(
        { _id: postID, "candidates._id": candidateID },
        {
          $set: {
            "candidates.$.status": status,
            status: isApprove ? "close" : "active",
          },
        }
      );

      freelancer = userID;
      seeker = candidateUserID;
    } else {
      await FindServiceList.updateOne(
        { _id: postID, "candidates._id": candidateID },
        {
          $set: {
            "candidates.$.status": status,
            status: isApprove ? "close" : "active",
          },
        }
      );
      freelancer = userID;
      seeker = candidateUserID;
    }
    const projectData = {
      freelancer,
      seeker,
      relatedService: { id: postID, type: postType, title: postTitle },
    };
    newProject = new Project(projectData);
    newProject.save();
    res.status(200).send("Approve candidate success");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server approve candidate is error ");
  }
};

module.exports = {
  addProvideService,
  addfindService,
  seePostServiceDetail,
  showPostServiceLists,
  sendServiceRequest,
  showMyServiceLists,
  approveCandidate,
};
