const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth.middleware");
const {seekerPayForService, showTransactionData, showAllTransactionData, refundMoneyData} = require("../controllers/escrow.controller")

router.put("/seekerPayForService/:projectID", [authMiddleware], seekerPayForService);
router.get("/showTransactionData", [authMiddleware], showTransactionData);
router.get("/showAllTransactionData", [authMiddleware], showAllTransactionData);
router.put("/refundMoneyData/:projectID/:transactionID", [authMiddleware], refundMoneyData);
module.exports = router;
