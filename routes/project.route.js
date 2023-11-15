const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth.middleware");
const {showMyProjectLists, showProjectDetails, updateProjectRequirement} = require("../controllers/project.controller")


router.get("/showMyProjectLists", [authMiddleware], showMyProjectLists);
router.get("/showProjectDetails/:projectID", [authMiddleware], showProjectDetails);
router.put("/updateProjectRequirement/:projectID", [authMiddleware], updateProjectRequirement);


module.exports = router;
