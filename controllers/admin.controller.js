const ProvideServiceList = require("../models/provideServiceList.model");
const Project = require("../models/project.model");

const showPostServicePending = async (req, res) => {
  try {
    const data = await ProvideServiceList.find({ status: "pending" }).populate({
      path: "owner",
      select: "first_name last_name",
    });
    res.status(200).json(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server showPostServicePending is error ");
  }
};

const updatePostServiceStatus = async (req, res) => {
  const postID = req.params.postID;
  const data = req.body;
  const { status, reason, date } = data;
  try {
    await ProvideServiceList.updateOne(
      { _id: postID },
      {
        $set: {
          status: status === "approve" ? "active" : "reject",
          reason,
          date,
        },
      }
    );
    res.status(200).send("Update a post status success");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server updatePostServiceStatus is error ");
  }
};

const retriveRequestRejectProject = async (req, res) => {
  try {
    const requestRejectList = await Project.find({
      status: "requestReject",
    }).populate({
      path: "reporter",
      select: "first_name last_name",
    });
    res.status(200).json({ requestRejectList });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server retriveRequestRejectProject is error ");
  }
};

const approveRejectProject = async (req, res) => {
  const projectID = req.params.projectID;
  const {isApprove} = req.body;
  let updateObj;
  if (isApprove) {
    updateObj = { status: "reject" };
  } else {
    updateObj = { status: "inProgress", rejectReason: "" };
  }
  try {
    await Project.updateOne({ _id: projectID }, { $set: updateObj });
    res.status(200).send("Take an action to the request success");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server approveRejectProject is error ");
  }
};

module.exports = {
  showPostServicePending,
  updatePostServiceStatus,
  retriveRequestRejectProject,
  approveRejectProject,
};
