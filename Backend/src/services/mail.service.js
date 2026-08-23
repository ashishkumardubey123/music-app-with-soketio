import dotenv from 'dotenv'
// const nodemailer = require('nodemailer');
import nodemailer from 'nodemailer';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.GOOGLE_USER,
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_secret,
    refreshToken: process.env.GOOGLE_REFFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// 

export async function sendeamil ({to, subject, html, }){
  const mailOptions = {
    from: process.env.GOOGLE_USER,
    to: to,
    subject: subject,
    html: html,
  };
  try {
    const details = await transporter.sendMail(mailOptions);
    console.log('Email sent:', details.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

