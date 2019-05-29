const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: 'chloe',
  api_key: '765683488725744',
  api_secret: 'dUjPDOs75D7C7R4bvtUKIHwPzEg'
});

const storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'demo',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, 'my-file-name');
  }
});

const parser = multer({ storage: storage });

module.exports = parser;
