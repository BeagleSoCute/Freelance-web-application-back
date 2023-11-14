const FindServiceList = require("../models/findServiceList.model");
const ProvideServiceList = require("../models/provideServiceList.model");
const User = require("../models/user.model");
const Project = require("../models/project.model");

const showMyProjectLists = async (req, res) => {
  const userID = req.user.id;
  try {
    const projectLists = await Project.find({
      $or: [{ freelancer: userID }, { seeker: userID }],
    })
      .populate({
        path: "freelancer",
        select: "first_name last_name",
      })
      .populate({
        path: "seeker",
        select: "first_name last_name",
      });
    res.status(200).json({
      projectLists,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server showMyProjectLists is error ");
  }
};

module.exports = {
  showMyProjectLists,
};
