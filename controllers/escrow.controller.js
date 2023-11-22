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
    res.status(500).send("Server seekerPayForService is error ");
  }
};

module.exports = {
  seekerPayForService,
  showTransactionData,
};
