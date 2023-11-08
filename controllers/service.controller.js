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

module.exports = { addProvideService, addfindService };
