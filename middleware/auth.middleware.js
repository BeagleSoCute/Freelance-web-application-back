const jwt = require("jsonwebtoken");
const config = require("config");

const authMiddleware = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: "No token, authorization denined!" });
  }
  try {
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid, Please login again!" });
  }
};

module.exports = {
  authMiddleware,
};
