const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth.middleware");
const {seekerPayForService} = require("../controllers/escrow.controller")

router.put("/seekerPayForService/:projectID", [authMiddleware], seekerPayForService);

module.exports = router;
