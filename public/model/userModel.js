const mongoose = require("mongoose");
require('dotenv').config();

const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    // optional fields
    bloodGroup: {
        type: String,  // Example: "A+", "O-", etc.
        required: false
    },
    height: {
        type: Number,  // Example: Height in cm
        required: false
    },
    weight: {
        type: Number,  // Example: Weight in kg
        required: false
    },
    age: {
        type: Number,  // Example: Age in years
        required: false
    },
    generalHealth: {
        type: Number,  // Example: Health as a percentage (0-100)
        required: false
    },
    waterBalance: {
        type: Number,  // Example: Water balance as a percentage (0-100)
        required: false
    }
});

const User = new mongoose.model("User", LoginSchema);

module.exports = User;
