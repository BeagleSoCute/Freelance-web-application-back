const express = require("express");
const router = express.Router();
const { showPostServicePending, updatePostServiceStatus } = require("../controllers/admin.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.get("/showPostServicePending", [authMiddleware], showPostServicePending);
router.put("/updatePostServiceStatus/:postID", [authMiddleware], updatePostServiceStatus);

module.exports = router;
