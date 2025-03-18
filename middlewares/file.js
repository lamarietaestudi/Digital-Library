const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const folderName = req.body.folderName || 'DigitalLibrary';
    return {
      folder: folderName,
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp']
    };
  }
});

const upload = multer({ storage });

module.exports = upload;
