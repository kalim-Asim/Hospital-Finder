const mongoose = require("mongoose");
require('dotenv').config();


// Define the Doctor schema
const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  availableHours: {
    type: String,
    required: true,
  },
  experience: {
    type: String,
    required: true,
  },
  speciality: {
    type: String,
    required: true,
  }
});

// Define the Doctor model
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
