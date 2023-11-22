const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth.middleware");
const {seekerPayForService, showTransactionData} = require("../controllers/escrow.controller")

router.put("/seekerPayForService/:projectID", [authMiddleware], seekerPayForService);
router.get("/showTransactionData", [authMiddleware], showTransactionData);

module.exports = router;
