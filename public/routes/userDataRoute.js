const express = require('express');
const router = express.Router();
const User = require('../model/userModel'); // Import the User model

// Route to get user data by email
router.get('/user/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to update user data by email
router.put('/user/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const updatedData = req.body; // Get the data to update from the request body

    const user = await User.findOneAndUpdate({
       email: email 
      }, 
      updatedData, {
         new: true 
      });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
