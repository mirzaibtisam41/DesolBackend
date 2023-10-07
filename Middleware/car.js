const { check } = require('express-validator');
const multer = require('multer');

// image uploader
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

module.exports = {
    validateCar: [
        upload.fields([{ name: 'image' }]),
        check('model', 'Model is required').not().isEmpty(),
        check('price', 'Price is required').not().isEmpty(),
        check('phone', 'Phone is required').not().isEmpty(),
        check('city', 'City is required').not().isEmpty(),
        check('no_of_images', 'Total number of images is required').not().isEmpty(),
    ]
};