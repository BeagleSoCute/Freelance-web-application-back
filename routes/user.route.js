const express = require("express");
const router = express.Router();
const {
  getUserData,
  getAllUsersData,
  getUserDetails,
  updateUser,
  addPortfolio
} = require("../controllers/user.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
const uploadMiddleware = require("../middleware/multer.middleware");

router.get("/myData", [authMiddleware], getUserData);
router.get("/allUsers", [authMiddleware], getAllUsersData);
router.get("/details/:userId", getUserDetails);
router.put(
  "/updateProfile",
  [authMiddleware, uploadMiddleware.single("image")],
  updateUser
);
router.put(
  "/addPortfolio",
  [authMiddleware, uploadMiddleware.single("image")],
  updateUser
);

module.exports = router;
