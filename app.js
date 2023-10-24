const express = require('express');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet'); // Include the 'helmet' module
const app = express();
const PORT = 3000;

app.use(express.json());

// Use the 'helmet' middleware to hide the x-powered-by header
app.use(helmet.hidePoweredBy());

// Create an SMTP transporter
const smtpTransport = nodemailer.createTransport({
  // Use a secure email service and store sensitive information in environment variables
  service: 'Gmail', // Replace with a secure email service
  auth: {
    user: process.env.EMAIL_USER, // Use environment variables
    pass: process.env.EMAIL_PASSWORD // Use environment variables
  }
});

// Set up EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Define a route for sending emails
app.post('/send', async (req, res) => {
  // ... (unchanged code for sending emails)
});

// Serve a simple HTML form for sending emails over HTTPS
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

