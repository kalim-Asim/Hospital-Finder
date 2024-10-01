const mongoose = require("mongoose");
require('dotenv').config();


// Define the Doctor schema
const doctorSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
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
  specialization: {
    type: String,
    required: true,
  },
  qualification: {
    type: String,
    required: true,
  },
  experienceYears: {
    type: Number,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  availableDays: {
    type: [String],  // Example: ['Monday', 'Wednesday', 'Friday']
    required: true,
  },
  availableTime: {
    from: {
      type: String,  // Example: "09:00 AM"
      required: true,
    },
    to: {
      type: String,  // Example: "05:00 PM"
      required: true,
    },
  },
  patients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',  // Linking to the Patient model
  }],
  appointments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',  // Linking to the Appointment model
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the Doctor model
const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;
