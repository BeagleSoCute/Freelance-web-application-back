const express = require("express");
const router = express.Router();

const { addProvideService, addfindService } = require("../controllers/service.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/addProvideService", [authMiddleware], addProvideService);
router.post("/addFindService", [authMiddleware], addfindService);


module.exports = router;
