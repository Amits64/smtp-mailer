const express = require('express');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet'); // Include the 'helmet' module
const app = express();
const PORT = 3000;

app.use(express.json());

// Create an SMTP transporter
const smtpTransport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'chauhanamit76342@gmail.com', // Your email address
    pass: 'Amit_s64' // Your email password (use environment variables for better security)
  }
});

// Set up EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Use the 'helmet' middleware to hide the x-powered-by header
app.use(helmet.hidePoweredBy());

// Define a route for sending emails
app.post('/send', async (req, res) => {
  // ... (unchanged code for sending emails)
});

// Serve a simple HTML form for sending emails
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
