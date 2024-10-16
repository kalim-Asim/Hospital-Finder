const express = require('express');
const approuter = express.Router();
const Appointment = require('../model/appointModel'); // Import the Appointment model

// Route to book an appointment for a user by their email
approuter.post('/user/:email/book', async (req, res) => {
  try {
    const { email } = req.params;
    const { name, phone, doctor, appointmentDate, appointmentTime, notes } = req.body;

    // Create a new appointment for the specified email
    const newAppointment = new Appointment({
      name,
      email,
      phone,
      doctor,
      appointmentDate,
      appointmentTime,
      notes,
    });

    await newAppointment.save(); // Save the appointment to the database
    res.status(201).json({ message: 'Appointment booked successfully', appointment: newAppointment });
  } catch (error) {
    console.error('Error booking appointment:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get all appointments for a specific user by email
approuter.get('/user/:email/appointments', async (req, res) => {
  try {
    const { email } = req.params;

    // Find all appointments for the specified email
    const appointments = await Appointment.find({ email });

    if (appointments.length === 0) {
      return res.status(404).json({ message: 'No appointments found for this user' });
    }

    res.json(appointments);
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = approuter;
