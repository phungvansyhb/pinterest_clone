const multer = require("multer");
const path = require("path");
const { CloudinaryStorage } = require('multer-storage-cloudinary')
const cloudinary = require('./cloudinary');

const getFileName = (filename) => {
  let i = filename.lastIndexOf('.');
  return filename.slice(0, i);
}

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'a1-k16/phan-loai-sau/' 
  }
})

// Multer config
module.exports = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("File type is not supported"), false);     
      return;
    }
    cb(null, true);
  },
}
);
