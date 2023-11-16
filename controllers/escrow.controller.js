
const Escrow = require("../models/escrow.model");
const User = require("../models/user.model");
const Project = require("../models/project.model");

const seekerPayForService = async (req, res) => {
    const projectID = req.params.projectID;
    const { amount, date } = req.body;
    const transformData = {
      project: projectID,
      amount,
      date,
      isPaidBySeeker: true,
    };
    try {
      newEscrowRecord = new Escrow(transformData);
      newEscrowRecord.save();
      res.status(200).send("Pay for the service success");
    } catch (error) {
      console.log("error", error);
      res.status(500).send("Server seekerPayForService is error ");
    }
  };


  
module.exports = {
    seekerPayForService,
  };
  