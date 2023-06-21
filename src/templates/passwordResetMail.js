const emailSender = require("../helpers/emailSender");

const passwordResetMail = async (user, resetPasswordLink) => {
  const fromEmail = process.env.GMAIL_ID;
  const toEmail = user.email;
  const subject = "Password reset link on CS app";
  const body = `
    <html>
      <body>
        <p>Hello ${user.name},</p>
        <p>You have raised request to reset password on <b>Customer Support Application.</b></p>
        <p><a href="${resetPasswordLink}">Click here</a> to reset your password. This link will be valid for only 1 hour.</p>
        ${resetPasswordLink}
        <p>We are happy to help you.</p>
        <p>Thanks</p>
      </body>
    </html>
  `;

  await emailSender(fromEmail, toEmail, subject, body);
};

module.exports = passwordResetMail;
