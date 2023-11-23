const Escrow = require("../models/escrow.model");
const User = require("../models/user.model");
const Project = require("../models/project.model");

const seekerPayForService = async (req, res) => {
  const projectID = req.params.projectID;
  const userID = req.user.id;
  const { amount, date, freelancer } = req.body;
  const transformData = {
    project: projectID,
    amount,
    date,
    isPaidBySeeker: true,
    seeker: userID,
    freelancer,
  };
  try {
    newEscrowRecord = new Escrow(transformData);
    newEscrowRecord.save();
    await Project.updateOne(
      { _id: projectID },
      { $set: { isPaid: true, status: "inProgress" } }
    );
    res.status(200).send("Pay for the service success");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server seekerPayForService is error ");
  }
};

const showTransactionData = async (req, res) => {
  const userID = req.user.id;
  try {
    const data = await Escrow.find({
      $or: [{ seeker: userID }, { freelancer: userID }],
    }).populate({
      path: "project",
      select: "title",
    });
    res.status(200).json({
      data,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server showTransactionData is error ");
  }
};

const showAllTransactionData = async (req, res) => {
  const userID = req.user.id;
  try {
    const userInfo = await User.findOne({ _id: userID });
    if (userInfo.role !== "admin") {
      res
        .status(403)
        .send("You are not authorized to access this information ");
      return;
    }
    const data = await Escrow.find().populate({
      path: "project",
      select: "title",
    });
    res.status(200).json({
      data,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server showAllTransactionData is error ");
  }
};

const refundMoneyData = async (req, res) => {
  const userID = req.user.id;
  const target = req.data;
  const transactionID = req.params.transactionID;
  const projectID = req.params.projectID;
  try {
    const userInfo = await User.findOne({ _id: userID });
    const projectData = await Project.findOne({ _id: projectID });
    const EscrowData = await Escrow.findOne({ _id: transactionID });

    if (userInfo.role !== "admin") {
      res
        .status(403)
        .send("You are not authorized to access this information ");
      return;
    }
    if (projectData.status !== "reject") {
      res
        .status(403)
        .send(
          "You can not refund money because of the project status is not match the condition "
        );
      return;
    }
    if (
      EscrowData.status === "refund to seeker" ||
      EscrowData.status === "refund to freelacner" ||
      EscrowData.status === "done"
    ) {
      res
        .status(403)
        .send(
          "You can not refund money because the transaction have been refunded to a user "
        );
      return;
    }
    let updatedObj;
    if (target === "seeker") {
      updatedObj = { status: "refund to seeker" };
    } else {
      updatedObj = { status: "refund to freelacner" };
    }
    await Escrow.updateOne({ _id: transactionID },  updatedObj );
    res.status(200).send("Refund success");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server showAllTransactionData is error ");
  }
};

module.exports = {
  seekerPayForService,
  showTransactionData,
  showAllTransactionData,
  refundMoneyData,
};
