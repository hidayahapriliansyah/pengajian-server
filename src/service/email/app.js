import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// create transporte
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAILER_ADDRESS,
    pass: process.env.EMAILER_APP_PASSWORD,
  }
});

// testing transporter
transporter.verify((err, success) => {
  if (err) {
    console.log('err', err);
  } else {
    console.log('ready to send email');
    console.log(success);
  }
});

// try sending message