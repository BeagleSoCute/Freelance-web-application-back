const ProvideServiceList = require("../models/provideServiceList.model");

const showPostServicePending = async (req, res) => {
  const postID = req.params.postID;
  try {
    const data = await ProvideServiceList.findOne({ _id: postID });
    res.status(200).json(data);
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server showPostServicePending is error ");
  }
};

const updatePostServiceStatus = async (req, res) => {
  const postID = req.params.postID;
  const data = req.body;
  try {
    await ProvideServiceList.updateOne(
      { _id: postID },
      { $set: { status: data } }
    );
    res.status(200).send("Update a post status success");
  } catch (error) {
    console.log("error", error);
    res.status(500).send("Server updatePostServiceStatus is error ");
  }
};

module.exports = { showPostServicePending, updatePostServiceStatus };
