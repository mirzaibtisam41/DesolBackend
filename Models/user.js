const { Schema, model } = require('mongoose');
var passwordHash = require('password-hash');

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true });

userSchema.pre('save', function (next) {
    if (this.isModified("password")) {
        this.password = passwordHash.generate(this.password);
        next();
    }
});

module.exports = model('User', userSchema);