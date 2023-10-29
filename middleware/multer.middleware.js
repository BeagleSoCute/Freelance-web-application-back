const multer = require("multer");

const uploadMiddleware = multer({
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
});

module.exports = uploadMiddleware;
