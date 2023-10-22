const express = require('express');
const nodemailer = require('nodemailer');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
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

// Define a route for sending emails
app.post('/send', async (req, res) => {
  const { to, subject, text, html } = req.body;

  // Read the email template from an EJS file
  const templatePath = path.join(__dirname, 'views', 'email-template.ejs');
  const template = fs.readFileSync(templatePath, 'utf-8');

  // Compile the email template with dynamic data
  const compiledTemplate = ejs.render(template, { subject, text, html });

  const mailOptions = {
    from: 'chauhanamit76342@gmail.com',
    to: to,
    subject: subject,
    text: text,
    html: compiledTemplate,
    attachments: [
      {
        filename: 'attachment.txt',
        content: 'This is an attachment content.'
      }
    ]
  };

  try {
    // Send the email
    const info = await smtpTransport.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Email sending failed' });
  }
});

// Serve a simple HTML form for sending emails
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'form.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

