const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth.middleware");
const {showMyProjectLists, showProjectDetails, updateProjectRequirement, updateNegotiationComment, 
    freelancerApproveProjectRequirement, addTask,updateTask} = require("../controllers/project.controller")


router.get("/showMyProjectLists", [authMiddleware], showMyProjectLists);
router.get("/showProjectDetails/:projectID", [authMiddleware], showProjectDetails);
router.put("/updateProjectRequirement/:projectID", [authMiddleware], updateProjectRequirement);
router.put("/updateNegotiationComment/:projectID", [authMiddleware], updateNegotiationComment);
router.put("/freelancerApproveProjectRequirement/:projectID", [authMiddleware], freelancerApproveProjectRequirement);
router.put("/addTask/:projectID", [authMiddleware], addTask);
router.put("/updateTask/:projectID", [authMiddleware], updateTask);

module.exports = router;

