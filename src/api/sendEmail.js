const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.json());
app.use(cors());

app.post('/send-email', (req, res) => {
  const { name, email, contactNumber, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'your-email@gmail.com',
      pass: 'your-email-password',
    },
  });

  const mailOptions = {
    from: email,
    to: 'demo@gmail.com',
    subject: 'New Contact Form Submission',
    html: `
      <h3>New Contact Form Submission</h3>
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Contact Number: ${contactNumber}</p>
      <p>Message: ${message}</p>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Failed to send email:', error);
      res.status(500).json({ success: false, error: 'Failed to send email' });
    } else {
      console.log('Email sent successfully!');
      res.json({ success: true, message: 'Email sent successfully' });
    }
  });
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});