const express = require("express");
const router = express.Router();

const { addProvideService, addfindService, showPostServiceLists, seePostServiceDetail } = require("../controllers/service.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/addProvideService", [authMiddleware], addProvideService);
router.post("/addFindService", [authMiddleware], addfindService);
router.get("/showPostServiceLists", [authMiddleware], showPostServiceLists);
router.get("/showPostDetails/:type/:postID", [authMiddleware], seePostServiceDetail);

module.exports = router;
