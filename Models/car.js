const { Schema, model } = require('mongoose');

const carSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    no_of_images: {
        type: Number,
        required: true,
    },
    image: [
        { image: { type: String } }
    ],
}, { timestamps: true });

module.exports = model('Car', carSchema);