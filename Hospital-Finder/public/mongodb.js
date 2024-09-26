const mongoose = require("mongoose");

// MongoDB connection
mongoose.connect("")
    .then(() => {
        console.log("Mongodb Connected");
    })
    .catch((err) => {
        console.log("Failed to connect to MongoDB", err);
    });

// Define the schema with updated fields
const LoginSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },
    // New optional fields
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

// Create the collection model
const collection = new mongoose.model("collections", LoginSchema);

// Export the model
module.exports = collection;
