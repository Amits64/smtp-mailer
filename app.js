require('dotenv').config();
require('newrelic');
const express = require('express');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const helmet = require('helmet');
const { body, validationResult } = require('express-validator');
const logger = require('./logger');
const config = require('./config/config.js');

const app = express();
const PORT = config.app.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(helmet()); // Use Helmet for security
app.use(helmet.hidePoweredBy()); // Hide the X-Powered-By header

// Create an SMTP transporter
const smtpTransport = nodemailer.createTransport({
  service: config.smtp.service,
  auth: {
    user: config.smtp.user,
    pass: config.smtp.pass
  }
});

// Set up EJS as the template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve a form page
app.get('/', (req, res) => {
  res.render('form'); // Renders the EJS form template
});

// Define a route for sending emails
app.post('/send', [
  body('to').isEmail().withMessage('Invalid email address'),
  body('subject').notEmpty().withMessage('Subject is required'),
  body('text').notEmpty().withMessage('Text is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { to, subject, text } = req.body;
  const mailOptions = {
    from: config.smtp.user,
    to,
    subject,
    text
  };

  try {
    await smtpTransport.sendMail(mailOptions);
    res.status(200).send('Email sent successfully');
  } catch (error) {
    logger.error(`Error sending email: ${error.message}`);
    res.status(500).send('Error sending email');
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error(`Unhandled error: ${err.message}`);
  logger.error(err.stack); // Log stack trace for debugging
  res.status(500).send('Something went wrong');
});

// Start the server
app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
