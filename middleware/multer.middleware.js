const multer = require("multer");

const uploadMiddleware = multer({
  limits: { fileSize: 0.25 * 1024 * 1024 }, // 250 kb  limit
});

module.exports = uploadMiddleware;
