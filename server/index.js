const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(express.json()); // Parse incoming JSON requests

// Routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes); // Use the user routes for handling requests

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

// Test route
app.get('/', (req, res) => {
  res.send('Hello, MongoDB!');
});

// Start the server
const port = process.env.PORT || 3000; // Use environment variable PORT or default to 3000
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
