const express = require("express");
const router = express.Router();
const {
  register,
  login,
  logout,
  extendAccessToken,
} = require("../controllers/auth.controller");
const { validateRegister } = require("../middleware/validators/user.validator");
router.post("/register", [validateRegister], register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/refresh_token", extendAccessToken);

module.exports = router;
