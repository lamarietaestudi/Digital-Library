const cloudinary = require('cloudinary').v2;

const deleteCloudinaryImage = async (urlImage) => {
  try {
    const cloudinaryId = urlImage.split('/').slice(-2).join('/').split('.')[0];
    if (cloudinaryId) {
      await cloudinary.uploader.destroy(cloudinaryId);
      return;
    }
  } catch (error) {
    console.error('Error deleting image from Cloudinary:', error);
  }
};

module.exports = deleteCloudinaryImage;
