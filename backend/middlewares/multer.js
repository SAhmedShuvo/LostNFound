const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadsDir = path.join(__dirname, "..", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname) || ".jpg";
    cb(null, `found-${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

// Use memory storage for avatar so we can upload buffer to Cloudinary (no disk path issues)
const uploadAvatar = multer({ storage: multer.memoryStorage() });

module.exports = upload;
module.exports.uploadAvatar = uploadAvatar;
