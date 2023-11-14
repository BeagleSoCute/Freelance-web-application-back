const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth.middleware");

const {showMyProjectLists} = require("../controllers/project.controller")




router.get("/showMyProjectLists", [authMiddleware], showMyProjectLists);


module.exports = router;
