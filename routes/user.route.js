const express = require("express");
const router = express.Router();
const {
  getUserData,
  getAllUsersData,
  getUserDetails,
  updateUser,
} = require("../controllers/user.controller");
const { authMiddleware } = require("../middleware/auth.middleware");
// const  upload  = require("../middleware/multer.middleware");
var multer = require('multer');
// var upload = multer({dest: './uploads/'})
var upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 } // 5 MB limit
});
// const multer  = require('multer')
// const upload = multer({ dest: '../middleware/' })


router.get("/myData", [authMiddleware], getUserData);
router.get("/allUsers", [authMiddleware], getAllUsersData);
router.get("/details/:userId", getUserDetails);
router.put("/updateProfile", [authMiddleware,upload.single("image")], updateUser);

module.exports = router;
