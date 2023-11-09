const express = require("express");
const router = express.Router();

const { addProvideService, addfindService, showPostServiceLists } = require("../controllers/service.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/addProvideService", [authMiddleware], addProvideService);
router.post("/addFindService", [authMiddleware], addfindService);
router.post("/showPostServiceLists", [authMiddleware], showPostServiceLists);


module.exports = router;
