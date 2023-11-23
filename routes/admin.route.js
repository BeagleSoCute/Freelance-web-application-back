const express = require("express");
const router = express.Router();
const { showPostServicePending, updatePostServiceStatus, retriveRequestRejectProject, approveRejectProject } = require("../controllers/admin.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.get("/showPostServicePending", [authMiddleware], showPostServicePending);
router.put("/updatePostServiceStatus/:postID", [authMiddleware], updatePostServiceStatus);
router.get("/retriveRequestRejectProject", [authMiddleware], retriveRequestRejectProject);
router.put("/approveRejectProject/:projectID", [authMiddleware], approveRejectProject);

module.exports = router;
