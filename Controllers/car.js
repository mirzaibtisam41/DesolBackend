const CarModel = require('../Models/car');
const { validationResult } = require('express-validator');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'dbyeoja4c',
    api_key: '163755181845641',
    api_secret: 'c06zcdxq6CehoptZdKiPZmMlhtg'
});

class Car {

    async createCar(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        let match = req.files.image.length == req.body.no_of_images;
        if (!match) {
            return res.status(400).json({ status: false, message: "Images length should be equal to no_of_images" });
        }
        else {
            let urls = [];
            for (const file of req.files.image) {
                const { path } = file;
                const result = await cloudinary.uploader.upload(path)
                urls.push({ image: result.secure_url });
            }
            req.body.model=req.body.model[0];
            req.body.user_id = req.user;
            req.body.image = urls;
            console.log(req.body);
            CarModel.create(req.body)
                .then(car => {
                    return res.status(200).json({ success: true, message: 'Car Added Successfully', car })
                })
                .catch(err => {
                    return res.status(200).json({ success: false, message: err });
                });
        }
    }
}

const car = new Car();
module.exports = car;