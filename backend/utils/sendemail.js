const nodemailer = require("nodemailer");
const tryCatch = require("../middleware/tryCatch");

const sendEmail = tryCatch(async (details) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMPT_PASS,
    },
  });

  const mailOptions = {
    from: process.env.SMTP_USER,
    to: details.email,
    subject: details.subject,
    text: details.message,
  };

  await transporter.sendMail(mailOptions);
});

module.exports = sendEmail;
