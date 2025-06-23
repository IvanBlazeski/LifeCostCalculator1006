const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS 
  }
});

const sendWelcomeEmail = async (to, name) => {
  await transporter.sendMail({
    from: `"Life Cost App" <${process.env.EMAIL_USER}>`,
    to,
    subject: 'Добредојде!',
    html: `<h3>Здраво, ${name}!</h3><p>Твојата регистрација е успешна.</p>`
  });
};

module.exports = { sendWelcomeEmail };
