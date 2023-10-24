const express = require("express");
const router = express.Router();
const {
  getUserData,
  getAllUsersData,
  getUserDetails,
  updateUser,
} = require("../controllers/user.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.get("/myData", [authMiddleware], getUserData);
router.get("/allUsers", [authMiddleware], getAllUsersData);
router.get("/details/:userId", getUserDetails);
router.put("/updateProfile", [authMiddleware], updateUser);

module.exports = router;
