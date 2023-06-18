const nodemailer = require("nodemailer");

const emailSender = async (fromMailId, toMailId, subject, body) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: fromMailId, // generated ethereal user
      pass: process.env.GMAIL_SECRET, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: fromMailId, // sender address
    to: toMailId, // list of receivers
    subject: subject, // Subject line
    html: body, // html body
  });

  console.log("Message sent: %s", info.messageId);
};

module.exports = emailSender;
