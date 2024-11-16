const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Sign-in (registration) route
router.post("/register", async (req, res) => {
  console.log(req.body.data);
  try {
    const { name, email, phoneNo, password, domain, profilePicture } = req.body;

    // Create a new user object
    const newUser = new User({
      name,
      email,
      phoneNo,
      password,
      domain,
      profilePicture, // Save the Firebase URL directly
    });

    // Save user to the database
    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(400).json({ message: error.message });
  }
});

// Profile route to fetch user by ID
router.get('/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" }); // Corrected "Status" to "status"
    }

    res.status(200).json(user); // Corrected "Status" to "status"
  } catch (error) {
    res.status(500).json({ message: error.message }); // Corrected "Status" to "status"
  }
});

// Login route to authenticate user by email and password
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user by email and password (ensure hashing is handled if used)
    const user = await User.findOne({ email, password });
    console.log(user, "this is user");
    if (!user) {
      return res.status(404).json({ message: "Invalid email or password" });
    }
    
    res.status(200).json(user); // Respond with user data on successful login
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
