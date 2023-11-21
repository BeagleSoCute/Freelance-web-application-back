const User = require("../models/user.model");
const Project = require("../models/project.model");
const { updateOne } = require("../models/provideServiceList.model");

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

const showProjectDetails = async (req, res) => {
  const userID = req.user.id;
  const projectID = req.params.projectID;
  try {
    const userInfo = await User.findOne({ _id: userID });
    const projectDetails = await Project.findOne({
      _id: projectID,
    })
      .populate({
        path: "negotiation.user",
        select: "first_name last_name profile_picture",
      })
      .populate({
        path: "comment.user",
        select: "first_name last_name profile_picture",
      })
      .populate({
        path: "freelancer",
        select: "first_name last_name _id",
      })
      .populate({
        path: "seeker",
        select: "first_name last_name _id",
      });
    const freelancerID = projectDetails.freelancer._id.toString();
    const seekerID = projectDetails.seeker._id.toString();
    const isFreelancer = userID === freelancerID;
    const isSeeker = userID === seekerID;
    let myRole;
    if (isFreelancer || isSeeker || userInfo.role === "admin") {
      if (isFreelancer) {
        myRole = "freelancer";
      } else if (isSeeker) {
        myRole = "seeker";
      } else {
        myRole = "admin";
      }
      res.status(200).json({
        projectDetails,
        myRole,
      });
    } else {
      res
        .status(403)
        .send("You are not authorized to access this information ");
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server showPorjectDetails is error ");
  }
};

const updateProjectRequirement = async (req, res) => {
  const userID = req.user.id;
  const data = req.body;
  const projectID = req.params.projectID;
  const {
    startDate,
    endDate,
    requirement,
    expectation,
    scope,
    budget,
    date,
    isEdit,
  } = data;
  try {
    const projectData = await Project.findOne({ _id: projectID });
    const seekerID = projectData.seeker.toString();
    const isSeeker = userID === seekerID;
    if (!isSeeker) {
      res
        .status(403)
        .send("You do not have a permission to update the requirement ");
      return;
    }
    const transformData = {
      startDate,
      endDate,
      requirement,
      expectation,
      scope,
      budget,
      status: "negotiation",
    };
    await Project.updateOne({ _id: projectID }, transformData);
    if (isEdit) {
      await Project.updateOne(
        { _id: projectID },
        {
          $push: {
            negotiation: {
              user: userID,
              comment: "I have updated the requirement",
              date,
              status: "EditRequirement",
            },
          },
        }
      );
    }
    res.status(200).send("Update project requirement success");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server updateProjectRequirement is error ");
  }
};

const updateNegotiationComment = async (req, res) => {
  const userID = req.user.id;
  const { comment, date, status } = req.body;
  const projectID = req.params.projectID;
  try {
    await Project.updateOne(
      { _id: projectID },
      { $push: { negotiation: { user: userID, comment, date, status } } }
    );
    res.status(200).send("Update comment on negotiation success");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server updateNegotiationComment is error ");
  }
};

const freelancerApproveProjectRequirement = async (req, res) => {
  const userID = req.user.id;
  const projectID = req.params.projectID;
  try {
    const projectDetails = await Project.findOne({
      _id: projectID,
    });

    const freelancerID = projectDetails.freelancer.toString();
    if (userID !== freelancerID) {
      res
        .status(403)
        .send("You do not have a permission to approve the requirement ");
      return;
    }
    await Project.updateOne(
      {
        _id: projectID,
      },
      {
        $set: { status: "approve" },
      }
    );
    res.status(200).send("Freelancer approves the project requirement success");
  } catch (error) {
    console.log("error", error);
    res
      .status(500)
      .send("Server freelancerApproveProjectRequirement is error ");
  }
};

const addTask = async (req, res) => {
  const userID = req.user.id;
  const projectID = req.params.projectID;
  const data = req.body;
  try {
    const projectData = await Project.findOne({ _id: projectID });
    const seekerID = projectData.seeker.toString();
    const freelancerID = projectData.freelancer.toString();
    const isSeeker = userID === seekerID;
    const isFreelancer = userID === freelancerID;
    1;
    if (!isSeeker && !isFreelancer) {
      res
        .status(403)
        .send("You do not have a permission to add a task in this project");
      return;
    }
    await Project.updateOne({ _id: projectID }, { $push: { task: data } });
    res.status(200).send("Add task success");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server updateTask is error ");
  }
};

const updateTask = async (req, res) => {
  const userID = req.user.id;
  const projectID = req.params.projectID;
  const data = req.body;
  try {
    const projectData = await Project.findOne({ _id: projectID });
    const seekerID = projectData.seeker.toString();
    const freelancerID = projectData.freelancer.toString();
    const isSeeker = userID === seekerID;
    const isFreelancer = userID === freelancerID;
    1;
    if (!isSeeker && !isFreelancer) {
      res
        .status(403)
        .send("You do not have a permission to update a task in this project ");
      return;
    }
    await Project.updateOne(
      { _id: projectID, "task._id": data?.id },
      { $set: { "task.$": data } }
    );
    res.status(200).send("Update task success");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server updateTask is error ");
  }
};

const addComment = async (req, res) => {
  const userID = req.user.id;
  const projectID = req.params.projectID;
  const data = req.body;
  try {
    const projectData = await Project.findOne({ _id: projectID });
    const seekerID = projectData.seeker.toString();
    const freelancerID = projectData.freelancer.toString();
    const isSeeker = userID === seekerID;
    const isFreelancer = userID === freelancerID;
    if (!isSeeker && !isFreelancer) {
      res
        .status(403)
        .send("You do not have a permission to add a comment on this project ");
      return;
    }
    const commentData = {
      ...data,
      user: userID,
    };
    await Project.updateOne(
      { _id: projectID },
      { $push: { comment: commentData } }
    );
    res.status(200).send("Add comment success");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server addComment is error ");
  }
};

const completeProject = async (req, res) => {
  const userID = req.user.id;
  const projectID = req.params.projectID;
  const { isComplete } = req.body;

  try {
    const projectData = await Project.findOne({ _id: projectID });
    const seekerID = projectData.seeker.toString();
    const freelancerID = projectData.freelancer.toString();
    const isSeeker = userID === seekerID;
    const isFreelancer = userID === freelancerID;
    if (!isSeeker && !isFreelancer) {
      res
        .status(403)
        .send("You do not have a permission to add a comment on this project ");
      return;
    }
    const updateFields = {};

    if (isSeeker) {
      updateFields["isComplete.seeker"] = isComplete;
    } else if (isFreelancer) {
      updateFields["isComplete.freelancer"] = isComplete;
    }
    await Project.updateOne({ _id: projectID }, { $set: updateFields });
    res.status(200).send("Update project status success");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server completeProject is error ");
  }
};

const requestRejectProject = async (req, res) => {
  const userID = req.user.id;
  const projectID = req.params.projectID;
  try {
    const projectData = await Project.findOne({ _id: projectID });
    const seekerID = projectData.seeker.toString();
    const freelancerID = projectData.freelancer.toString();
    const isSeeker = userID === seekerID;
    const isFreelancer = userID === freelancerID;
    if (!isSeeker && !isFreelancer) {
      res
        .status(403)
        .send("You do not have a permission to add a comment on this project ");
      return;
    }

    await Project.updateOne({ _id: projectID }, { status: "requestReject" });
    res.status(200).send("Request reject the project status success");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server requestRejectProject is error ");
  }
};

module.exports = {
  showMyProjectLists,
  showProjectDetails,
  updateProjectRequirement,
  updateNegotiationComment,
  freelancerApproveProjectRequirement,
  addTask,
  updateTask,
  addComment,
  completeProject,
  requestRejectProject,
};
