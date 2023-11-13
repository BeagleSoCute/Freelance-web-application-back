const ProvideServiceList = require("../models/provideServiceList.model");

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
  const {status, reason, date} = data
  try {
    await ProvideServiceList.updateOne(
      { _id: postID },
      { $set: { status, reason, date } }
    );
    res.status(200).send("Update a post status success");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server updatePostServiceStatus is error ");
  }
};

module.exports = { showPostServicePending, updatePostServiceStatus };
