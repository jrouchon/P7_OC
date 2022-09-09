const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true, unique: true }, // 
    role: { type: String, default: process.env.ROLE_USER }
})

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema)